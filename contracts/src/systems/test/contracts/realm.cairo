#[dojo::contract]
mod test_realm_systems {

    use eternum::models::realm::Realm;
    use eternum::models::movable::Movable;
    use eternum::models::capacity::Capacity;
    use eternum::models::owner::{Owner, EntityOwner};
    use eternum::models::position::Position;
    use eternum::models::metadata::EntityMetadata;
    use eternum::models::combat::TownWatch;
    use eternum::models::config::{ CapacityConfig };
    use eternum::constants::{ WORLD_CONFIG_ID, SOLDIER_ENTITY_TYPE };

    use eternum::systems::test::interface::realm::IRealmSystems;

    use eternum::constants::REALM_ENTITY_TYPE;

    use eternum::alias::ID;

    use starknet::ContractAddress;

    #[external(v0)]
    impl RealmSystemsImpl of IRealmSystems<ContractState> {
        fn create(
            self: @ContractState,
            world: IWorldDispatcher,
            realm_id: u128,
            owner: ContractAddress,
            resource_types_packed: u128,
            resource_types_count: u8,
            cities: u8,
            harbors: u8,
            rivers: u8,
            regions: u8,
            wonder: u8,
            order: u8,
            order_hyperstructure_id: u128,
            position: Position
        ) -> ID {
            let entity_id = world.uuid();
            set!(world, (
                    Owner {
                        entity_id: entity_id.into(), 
                        address: owner
                    }, 
                    Realm {
                        entity_id: entity_id.into(),
                        realm_id,
                        resource_types_packed,
                        resource_types_count,
                        cities,
                        harbors,
                        rivers,
                        regions,
                        wonder,
                        order,
                        order_hyperstructure_id
                    }, 
                    Position {
                        entity_id: entity_id.into(), 
                        x: position.x, 
                        y: position.y, 
                    }, 
                    EntityMetadata {
                        entity_id: entity_id.into(), 
                        entity_type: REALM_ENTITY_TYPE, 
                    }
                )
            );


            // setup realm's town watch 
            let combat_town_watch_id = world.uuid().into();
            let combat_unit_capacity
                = get!(world, (WORLD_CONFIG_ID, SOLDIER_ENTITY_TYPE), CapacityConfig).weight_gram;
                    
            set!(world, (
                TownWatch {
                    entity_id: entity_id.into(),
                    town_watch_id: combat_town_watch_id,
                },
                Owner {
                    entity_id: combat_town_watch_id,
                    address: owner
                },
                EntityOwner {
                    entity_id: combat_town_watch_id,
                    entity_owner_id: entity_id.into()
                },
                Position {
                    entity_id: combat_town_watch_id,
                    x: position.x,
                    y: position.y
                },
                Capacity {
                    entity_id: combat_town_watch_id,
                    weight_gram: combat_unit_capacity
                },
                Movable {
                    entity_id: combat_town_watch_id, 
                    sec_per_km: 0, 
                    blocked: false,
                    round_trip: false,
                    intermediate_coord_x: 0,  
                    intermediate_coord_y: 0,  
                },
            ));
            entity_id.into()
        }

    }
    
}
