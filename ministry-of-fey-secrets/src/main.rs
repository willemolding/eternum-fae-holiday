use std::{sync::Arc, collections::HashMap};

use axum::{
    extract::{Path, State},
    response::Json,
    routing::get,
    Router,
};
use shuttle_secrets::SecretStore;
use starknet::core::types::{BlockId, EmittedEvent, EventFilter, FieldElement};
use starknet::providers::{jsonrpc::HttpTransport, JsonRpcClient, Provider};

use error::AppError;
use fae_gift_event::FaeGiftEvent;
use response::Response;
use state::AppState;

mod error;
mod fae_gift_event;
mod response;
mod state;

fn process_events(events: Vec<EmittedEvent>) -> Vec<FaeGiftEvent> {
    events
        .into_iter()
        .filter_map(|event| FaeGiftEvent::try_from(event).ok())
        .collect()
}

async fn handler(
    Path((block_hash, caller_address)): Path<(String, String)>,
    State(state): State<AppState>,
) -> Result<Json<Vec<Response>>, AppError> {
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
                address: Some(state.gift_contract), // the address of our system contract
                keys: Some(vec![
                    vec![caller_address], // match to the address passed as the caller_address
                    vec![],               // other fields can be anything
                    vec![],               // ..
                    vec![],               // ..
                ]),
            },
            None,
            100,
        )
        .await?;

    println!("events: {:?}", events);

    // filter by the caller and event type. There can be multiple events in a single block
    let fae_gift_events = process_events(events.events);

    Ok(Json(
        fae_gift_events
            .iter()
            .map(|event| {
                // build the response and send it!
                Response::from_event(event, &state.fae_data)
            })
            .collect(),
    ))
}

#[shuttle_runtime::main]
async fn main(#[shuttle_secrets::Secrets] secret_store: SecretStore) -> shuttle_axum::ShuttleAxum {
    let rpc_url = url::Url::parse(&secret_store.get("STARKNET_RPC_URL").unwrap()).unwrap();
    let provider = Arc::new(JsonRpcClient::new(HttpTransport::new(rpc_url)));
    let secret_store = Arc::new(secret_store);
    let gift_contract =
        FieldElement::from_hex_be(&secret_store.get("GIFT_SYSTEM_CONTRACT_ADDRESS").unwrap())
            .unwrap();

    let state = AppState {
        provider,
        gift_contract,
        fae_data: HashMap::new(),
    };

    let router = Router::new()
        .route("/:block_hash/:caller_address", get(handler))
        .with_state(state);

    Ok(router.into())
}
