set dotenv-load

local_deploy:
    #!/usr/bin/env bash
    STARKNET_RPC_URL=http://localhost:5050
    cd contracts && sozo migrate

slot_deploy:
    cd contracts && sozo migrate --account-address=$DEPLOYER_ADDRESS --private-key=$DEPLOYER_PRIVATE_KEY

slot_logs:
    slot deployments logs $DEPLOYMENT_NAME katana -f

slot_new_katana:
    slot deployments create $DEPLOYMENT_NAME katana

slot_new_torii:
    slot deployments create $DEPLOYMENT_NAME torii --world $WORLD_ADDRESS --rpc $STARKNET_RPC_URL --start-block 1

slot_torii_logs:
    slot deployments logs $DEPLOYMENT_NAME torii -f
