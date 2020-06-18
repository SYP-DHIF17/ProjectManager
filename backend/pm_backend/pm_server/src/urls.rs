use crate::handlers::*;
use actix_web::web;

pub fn url_config(cfg: &mut web::ServiceConfig) {
    auth_urls_config(cfg);
    user_urls_config(cfg);
    project_urls_config(cfg);
    team_urls_config(cfg);
    project_part_urls_config(cfg);
    milestones_urls_config(cfg);
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
            .route("/part", web::post().to(create_project_part))
            .route("/{id}", web::post().to(add_member_to_team))
            .route("/{id}", web::put().to(update_team))
            .route("/{id}/parts", web::get().to(get_project_parts_for_team)),
    );
}

fn project_part_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/part")
            .route("/{part_id}", web::put().to(update_project_part))
            .route("/{part_id}/milestones", web::post().to(create_milestone))
            .route("/{part_id}/milestones", web::get().to(get_milestones))
            // Careful: those with the fixed parts must be placed above
            // the one accepting a second UUID, as the /milestones would otherwise
            // be interpreted as a UUID!
            .route(
                "/{part_id}/{team_id}",
                web::post().to(add_project_part_to_team),
            ),
    );
}

fn milestones_urls_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/milestone")
            .route("/{milestone_id}", web::put().to(update_milestone))
    );
}
