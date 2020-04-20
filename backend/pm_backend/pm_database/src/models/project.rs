use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct Project {

    #[serde(rename = "projectID")]
    pub project_id: Uuid,

    pub name: String,

    #[serde(rename = "startDate")]
    pub start_date: chrono::NaiveDateTime,

    #[serde(rename = "plannedEndDate")]
    pub planned_enddate: chrono::NaiveDateTime,

    #[serde(rename = "realEndDate")]
    pub real_enddate: chrono::NaiveDateTime,

    #[serde(rename = "overallBudget")]
    pub overall_budget: i32,

    #[serde(rename = "createdOn")]
    pub created_on: chrono::NaiveDateTime,

    pub leader: Uuid,

    pub creator: Uuid,
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct ProjectPart {
    #[serde(rename = "projectPartID")]
    pub project_part_id: Uuid,
    pub name: String,
    #[serde(rename = "projectID")]
    pub project_id: Uuid,
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct TeamTask{
    #[serde(rename = "projectPartID")]
    pub project_part_id: Uuid,
    #[serde(rename = "teamID")]
    pub team_id: Uuid,
}
