use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;
use uuid::Uuid;

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone, PostgresMapper)]
#[pg_mapper(table = "workpackages")]
pub struct WorkPackage {

    #[serde(rename = "workpackageID")]
    pub workpackage_id: Uuid,

    pub name: String,

    #[serde(rename = "startDate")]
    pub start_date: chrono::NaiveDateTime,

    #[serde(rename = "plannedEndDate")]
    pub planned_enddate: chrono::NaiveDateTime,

    #[serde(rename = "realEndDate")]
    pub real_enddate: chrono::NaiveDateTime,
}
