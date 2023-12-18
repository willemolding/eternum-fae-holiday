use eternum::alias::ID;

use dojo::world::IWorldDispatcher;

#[starknet::interface]
trait IFaeHoliday<TContractState> {
    /// Send some amount of two resources as a gift to a fae
    fn gift(
        self: @TContractState, world: IWorldDispatcher, 
        fae: ID, 
        resource_a: u8, resource_a_amount: u128,
        resource_b: u8, resource_b_amount: u128,
    );

    /// If you have the key to a fae's heart you can befriend them!
    fn befriend(
        self: @TContractState, world: IWorldDispatcher, 
        fae: ID,
        key_to_its_heart: felt252,
    );
}
