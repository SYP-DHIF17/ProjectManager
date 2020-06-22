use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;
use uuid::Uuid;

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone, PostgresMapper)]
#[pg_mapper(table = "milestones")]
pub struct MileStone {
    #[serde(rename = "milestoneID")]
    pub milestone_id: Uuid,

    #[serde(rename = "reachDate")]
    pub reach_date: chrono::NaiveDate,

    pub name: String,

    #[serde(rename = "projectPartID")]
    pub project_part_id: Uuid,

    pub description: String,
}
