#[dojo::contract]
mod labor_systems {
    use starknet::ContractAddress;
    
    use eternum::alias::ID;
    use eternum::systems::fae_holiday::interface::IFaeHoliday;
    
    #[external(v0)]
    impl FaeHolidayImpl of IFaeHoliday<ContractState> {
        /// Send some amount of two resources as a gift to a fae
        fn gift(
            self: @ContractState, world: IWorldDispatcher, 
            fae: ID, 
            resource_a: u8, resource_a_amount: u128,
            resource_b: u8, resource_b_amount: u128,
        ) {

        }

        /// If you have the key to a fae's heart you can befriend them!
        fn befriend(
            self: @ContractState, world: IWorldDispatcher, 
            fae: ID,
            key_to_its_heart: felt252,
        ) {

        }
    }
}
