use std::sync::Arc;

use axum::{
    extract::{Path, State},
    routing::get,
    Router,
};
use shuttle_secrets::SecretStore;
use starknet::core::types::{BlockId, EmittedEvent, EventFilter, FieldElement};
use starknet::providers::{Provider, jsonrpc::HttpTransport, JsonRpcClient};

use error::AppError;
use state::AppState;
use fae_gift_event::FaeGiftEvent;

mod error;
mod state;
mod fae_gift_event;

fn process_events(events: Vec<EmittedEvent>) -> Vec<FaeGiftEvent> {
    events
        .into_iter()
        .filter_map(|event| FaeGiftEvent::try_from(event).ok())
        .collect()
}

async fn process_gifts(
    Path((block_hash, caller_address)): Path<(String, String)>,
    State(state): State<AppState>,
) -> Result<(), AppError> {
    // grab the events from the block
    let block_id = BlockId::Hash(FieldElement::from_hex_be(&block_hash)?);
    let caller_address = FieldElement::from_hex_be(&caller_address)?;

    let events = state
        .provider
        .as_ref()
        .get_events(
            EventFilter {
                from_block: Some(block_id),
                to_block: Some(block_id),
                address: Some(caller_address), // the address of our system contract
                keys: Some(vec![
                    vec![caller_address],
                    vec![],
                    vec![], // match to the address passed as the caller_address
                ]),
            },
            None,
            100,
        )
        .await?;

    // filter by the caller and event type
    let fae_gift_events = process_events(events.events);

    // usually this should be just 1 event but it is possible that the sender included multiple in a block

    Ok(())
}

#[shuttle_runtime::main]
async fn main(#[shuttle_secrets::Secrets] secret_store: SecretStore) -> shuttle_axum::ShuttleAxum {
    let rpc_url = url::Url::parse(&secret_store.get("STARKNET_RPC_URL").unwrap()).unwrap();
    let provider = Arc::new(JsonRpcClient::new(HttpTransport::new(rpc_url)));

    let state = AppState { provider };

    let router = Router::new()
        .route("/:block_hash/:caller_address", get(process_gifts))
        .with_state(state);

    Ok(router.into())
}
