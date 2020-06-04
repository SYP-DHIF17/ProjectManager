use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;
use uuid::Uuid;

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone, PostgresMapper)]
#[pg_mapper(table = "workpackages")]
pub struct WorkPackage {
    #[serde(rename = "workpackageID")]
    pub workpackage_id: Uuid,

    pub position: i32,

    pub name: String,

    #[serde(rename = "startDate")]
    pub start_date: chrono::NaiveDate,

    #[serde(rename = "plannedEndDate")]
    pub planned_enddate: chrono::NaiveDate,

    #[serde(rename = "realEndDate")]
    pub real_enddate: Option<chrono::NaiveDate>,

    #[serde(rename = "projectPartID")]
    pub project_part_id: Uuid,
}
