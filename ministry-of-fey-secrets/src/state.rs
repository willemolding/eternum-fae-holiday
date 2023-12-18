use starknet::providers::{jsonrpc::HttpTransport, JsonRpcClient};
use std::sync::Arc;

#[derive(Clone)]
pub(crate) struct AppState {
    pub provider: Arc<JsonRpcClient<HttpTransport>>,
}
