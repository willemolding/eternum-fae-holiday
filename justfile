set dotenv-load

deploy_contracts_slot:
    cd contracts && sozo migrate --account-address=$DEPLOYER_ADDRESS --private-key=$DEPLOYER_PRIVATE_KEY
