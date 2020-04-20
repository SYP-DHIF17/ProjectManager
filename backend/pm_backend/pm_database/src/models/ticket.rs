use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct Ticket {
    #[serde(rename = "ticketID")]
    pub ticket_id: Uuid,
    pub title: String,
    pub description: String,
    #[serde(rename = "isDone")]
    pub is_done: bool,
    pub importance: i32,
    #[serde(rename = "userID")]
    pub user_id: Uuid,
    #[serde(rename = "workpackageID")]
    pub workpackage_id: Uuid,
}
