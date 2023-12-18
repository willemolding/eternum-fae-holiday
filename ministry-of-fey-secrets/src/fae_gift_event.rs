use starknet::core::types::{EmittedEvent, EthAddress};
use crate::error::AppError;

// an occurrence of a player gifting resources to a fae
pub(crate) struct FaeGiftEvent {
    pub sender: EthAddress,
    pub fey_recipient: u8,
    pub resource_types: (u8, u8),
}

impl TryFrom<EmittedEvent> for FaeGiftEvent {
    type Error = AppError;

    fn try_from(event: EmittedEvent) -> Result<Self, Self::Error> {
        let event_data = event.data;
        let sender = event_data[0].try_into()?;
        let fey_recipient: u8 = event_data[1].try_into()?;
        let resource_types = (event_data[2].try_into()?, event_data[3].try_into()?);

        Ok(FaeGiftEvent {
            sender,
            fey_recipient,
            resource_types,
        })
    }
}
