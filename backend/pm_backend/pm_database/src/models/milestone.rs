use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;
use uuid::Uuid;

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone, PostgresMapper)]
#[pg_mapper(table = "milestones")]
pub struct MileStone {
    #[serde(rename = "milestoneID")]
    pub milestone_id: Uuid,

    #[serde(rename = "createdOn")]
    pub created_on: chrono::NaiveDateTime,

    #[serde(rename = "createdBy")]
    pub created_by: Uuid,

    pub amount: i32,

    #[serde(rename = "reachDate")]
    pub reach_date: chrono::NaiveDateTime,

    pub name: String,

    #[serde(rename = "projectPartID")]
    pub project_part_id: Uuid,
}
