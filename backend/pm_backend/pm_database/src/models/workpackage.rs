use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
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
