use crate::handlers::auth_handler::*;
use crate::handlers::project_handler::*;
use crate::handlers::team_handler::*;
use crate::handlers::user_handler::*;
use actix_web::web;

pub fn url_config(cfg: &mut web::ServiceConfig) {
    auth_urls_config(cfg);
    user_urls_config(cfg);
    project_urls_config(cfg);
    team_urls_config(cfg);
}

fn auth_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/auth").route("/login", web::post().to(login)));
}

fn user_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/user")
            .route("", web::get().to(get_info))
            .route("/{id}", web::get().to(get_info_for_user))
            .route("", web::put().to(update_password))
            .route("", web::post().to(create_user)),
    );
}

fn project_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/project")
            .route("", web::get().to(get_projects))
            .route("", web::post().to(create_project))
            .route("/{id}", web::put().to(update_project))
            .route("/{id}/teams", web::post().to(create_team))
            .route("/{id}/teams", web::get().to(get_teams_for_project)),
    );
}

fn team_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/team")
          .route("/{id}", web::put().to(update_team)),
    );
}
