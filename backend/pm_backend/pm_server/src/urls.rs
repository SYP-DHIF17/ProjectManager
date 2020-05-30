use crate::handlers::auth_handler::*;
use crate::handlers::user_handler::*;
use actix_web::web;

pub fn auth_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/auth").service(web::resource("/login").route(web::post().to(login))));
}

pub fn user_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .service(web::resource("/create").route(web::post().to(create_user)))
            .service(web::resource("/update-pw").route(web::post().to(update_password))),
    );
}
