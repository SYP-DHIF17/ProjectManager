use actix_web::{web, HttpResponse};

use crate::data::request_data::*;
use crate::data::response_data::*;
use crate::data::AuthUser;
use deadpool_postgres::Pool;
use itertools::Itertools;
use pm_database::db_helper::get_db_client;
use pm_database::db_helper::*;
use pm_errors::APIError;
use std::collections::HashSet;
use std::include_str;
use uuid::Uuid;

pub async fn get_project_parts_for_project(
    pool: web::Data<Pool>
) -> Result<HttpResponse, APIError> {
    todo!()
}

pub async fn create_project_part<'a>(
    pool: web::Data<Pool>,
    new_part: web::Json<CreateProjectPartRequest<'a>>,
    auth_user: AuthUser,
    ) -> Result<HttpResponse, APIError> {
    todo!()
}
