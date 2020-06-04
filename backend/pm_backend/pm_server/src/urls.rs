use crate::handlers::auth_handler::*;
use crate::handlers::project_handler::*;
use crate::handlers::user_handler::*;
use actix_web::web;

pub fn auth_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/auth").route("/login", web::post().to(login)));
}

pub fn user_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/user")
            .route("", web::get().to(get_info))
            .route("", web::put().to(update_password))
            .route("/create", web::post().to(create_user)),
    );
}

pub fn project_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/project")
            .route("/{id}", web::get().to(get_project))
            .route("", web::post().to(create_project)),
    );
}
