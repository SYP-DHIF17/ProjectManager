use actix_web::web;
use crate::handlers::auth_handler::login;

pub fn auth_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/auth").service(web::resource("/login").route(web::post().to(login))));
}
