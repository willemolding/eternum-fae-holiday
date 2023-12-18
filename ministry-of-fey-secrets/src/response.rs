use serde::Serialize;
use starknet::core::types::FieldElement;
use std::collections::HashMap;

use crate::fae_gift_event::FaeGiftEvent;

#[derive(Debug, Serialize)]
pub enum Response {
    Success { key: FieldElement },
    Failure,
}

#[derive(Debug)]
pub struct Clue {
    fae_id: FieldElement, // this fae
    resource_id: u8,      // likes this resource
}

impl Response {
    pub fn from_event(event: &FaeGiftEvent, data: &HashMap<FieldElement, (u8, u8)>) -> Self {
        // TODO: Actually generate a response based on the data and the gift event
        Response::Failure
    }
}
