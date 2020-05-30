use crate::utils::hashing_utils;
use chrono::*;
use pm_database::models::user::User;
use ::serde::{Deserialize, Serialize};
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
            created_on: Local::now().date().naive_local(),
            is_active: true,
            left_on: None,
            firstname,
            lastname,
            email,
            password: hashing_utils::hash_password(&password[..]).unwrap(),
            birthdate,
        }
    }
}
