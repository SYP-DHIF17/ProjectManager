use crate::handlers::auth_handler::*;
use crate::handlers::user_handler::*;
use actix_web::web;

pub fn auth_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/auth").service(web::resource("/login").route(web::post().to(login))));
}

pub fn user_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/user")
            .service(web::resource("").route(web::get().to(get_info)))
            .service(web::resource("/").route(web::put().to(update_password)))
            .service(web::resource("/create").route(web::post().to(create_user))),
    );
}
