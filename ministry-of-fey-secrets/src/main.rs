use axum::{routing::get, Router};
use shuttle_secrets::SecretStore;

async fn hello_world() -> &'static str {
    "Hello, world!"
}

#[shuttle_runtime::main]
async fn main(#[shuttle_secrets::Secrets] secret_store: SecretStore) -> shuttle_axum::ShuttleAxum {

    let url = secret_store.get("KATANA_URL").unwrap();

    let router = Router::new().route("/", get(hello_world));

    Ok(router.into())
}
