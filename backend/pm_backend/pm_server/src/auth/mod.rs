pub mod auth_user;
pub mod utils;

use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, PartialEq, Clone, Serialize, Deserialize)]
pub struct AuthUser {
    pub user_id: Uuid,
}