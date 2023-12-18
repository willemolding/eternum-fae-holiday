use starknet::providers::{jsonrpc::HttpTransport, JsonRpcClient};
use starknet::core::types::FieldElement;
use std::collections::HashMap;
use std::sync::Arc;

#[derive(Clone)]
pub(crate) struct AppState {
    pub provider: Arc<JsonRpcClient<HttpTransport>>,
    pub gift_contract: FieldElement,
    pub fae_data: HashMap<FieldElement, (u8, u8)>
}
