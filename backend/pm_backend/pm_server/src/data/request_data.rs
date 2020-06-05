use crate::utils::hashing_utils;
use pm_database::models::project::Project;
use pm_database::models::user::User;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateUserRequest {
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub password: String,
    pub birthdate: chrono::NaiveDate,
}

impl From<CreateUserRequest> for User {
    fn from(req: CreateUserRequest) -> Self {
        let CreateUserRequest {
            firstname,
            lastname,
            email,
            password,
            birthdate,
        } = req;

        Self {
            user_id: Uuid::new_v4(),
            created_on: chrono::Local::now().date().naive_local(),
            firstname,
            lastname,
            email,
            password: hashing_utils::hash_password(&password[..]).unwrap(),
            birthdate,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChangeUserRequest {
    #[serde(rename = "oldPassword")]
    pub old_password: String, // always required

    #[serde(rename = "newPassword")]
    pub new_password: Option<String>,
    pub firstname: Option<String>,
    pub lastname: Option<String>,
    pub email: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateProjectRequest {
    pub name: String,
    #[serde(rename = "startDate")]
    pub start_date: chrono::NaiveDate,
    #[serde(rename = "plannedEndDate")]
    pub planned_enddate: chrono::NaiveDate,
    #[serde(rename = "overallBudget")]
    pub overall_budget: i32,
}

pub struct CreateProjectWrapper(pub CreateProjectRequest, pub Uuid);

impl From<CreateProjectWrapper> for Project {
    fn from(req: CreateProjectWrapper) -> Self {
        let CreateProjectWrapper(req, leader) = req;
        let CreateProjectRequest {
            name,
            start_date,
            planned_enddate,
            overall_budget,
        } = req;
        Self {
            project_id: Uuid::new_v4(),
            name,
            start_date,
            planned_enddate,
            real_enddate: None,
            overall_budget,
            leader,
        }
    }
}
