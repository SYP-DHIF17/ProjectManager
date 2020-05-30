mod config;
mod data;
mod handlers;
mod https_middleware;
mod secrets;
mod urls;
mod utils;

use actix_cors::Cors;
use actix_web::*;
use actix_web::{web, App, HttpServer};
use chrono::NaiveDateTime;
use tokio_postgres::NoTls;

use crate::https_middleware::RedirectHTTPS;
use crate::urls::{auth_urls_config, user_urls_config};

// PRODUCTION
pub static HTTP_PORT: &'static str = ":8080";
pub static HTTPS_PORT: &'static str = ":8443";

// DEVELOPMENT JUNGS
// pub static HTTP_PORT: &'static str = ":8081";
// pub static HTTPS_PORT: &'static str = ":8444";

pub type CurrentDateTimeObject = NaiveDateTime;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    std::env::set_var("RUST_LOG", "actix_web=info,actix_server=info");
    env_logger::init();

    let config = crate::config::Config::from_env().unwrap();
    let pool = config.pg.create_pool(NoTls).unwrap();

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .wrap(Cors::new().finish())
            .wrap(middleware::Compress::default())
            .wrap(middleware::Logger::default())
            /*.wrap(RedirectHTTPS::with_replacements(&[(
                HTTP_PORT.to_owned(),
                HTTPS_PORT.to_owned(),
            )]))*/
            .service(
                web::scope("/api") 
                .configure(auth_urls_config)
                .configure(user_urls_config)
            )
    })
    .bind("0.0.0.0".to_owned() + HTTP_PORT)?
    .run()
    .await
}
