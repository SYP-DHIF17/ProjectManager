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
            user_id: crate::utils::create_void_uuid(),
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
            project_id: crate::utils::create_void_uuid(),
            name,
            start_date,
            planned_enddate,
            real_enddate: None,
            overall_budget,
            leader,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChangeProjectRequest {
    pub name: Option<String>,

    #[serde(rename = "plannedEndDate")]
    pub planned_enddate: Option<chrono::NaiveDate>,

    #[serde(rename = "realEndDateChange")]
    pub real_enddate_change: RealEndDateChange,

    #[serde(rename = "overallBudget")]
    pub overall_budget: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RealEndDateChange {
    pub change: bool,
    pub date: Option<chrono::NaiveDate>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateTeamRequest {
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateTeamRequest {
    pub name: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateProjectPartRequest {
    pub name: Option<String>,
    pub position: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AddTeamMemberRequest {
    pub user: Uuid,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateProjectPartRequest {
    pub name: String,
    pub position: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateMileStoneRequest {
    #[serde(rename = "reachDate")]
    pub reach_date: chrono::NaiveDate,

    pub name: String,

    pub description: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateMilestoneRequest {
    #[serde(rename = "reachDate")]
    pub reach_date: Option<chrono::NaiveDate>,

    pub name: Option<String>,

    pub description: Option<String>,
}
