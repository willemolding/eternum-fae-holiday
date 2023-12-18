use std::sync::Arc;

use axum::{extract::Path, routing::get, Router};
use shuttle_secrets::SecretStore;
use starknet::providers::{jsonrpc::HttpTransport, JsonRpcClient};

async fn process_gifts(
    Path((block_hash, caller_address)): Path<(String, String)>,
    provider: Arc<JsonRpcClient<HttpTransport>>,
) -> &'static str {
    // grab the events from the block

    // filter by the caller and event type

    "Yep"
}

#[shuttle_runtime::main]
async fn main(#[shuttle_secrets::Secrets] secret_store: SecretStore) -> shuttle_axum::ShuttleAxum {
    let rpc_url = url::Url::parse(&secret_store.get("STARKNET_RPC_URL").unwrap()).unwrap();
    let provider = Arc::new(JsonRpcClient::new(HttpTransport::new(rpc_url)));

    let router = Router::new().route(
        "/:block_hash/:caller_address",
        get({
            let provider = Arc::clone(&provider);
            move |path| process_gifts(path, provider)
        }),
    );

    Ok(router.into())
}
