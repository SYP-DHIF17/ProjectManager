use crate::APIError;
use actix_web::{HttpResponse, ResponseError};

impl ResponseError for APIError {
    fn error_response(&self) -> HttpResponse {
        match *self {
            APIError::InternalServerError => {
                HttpResponse::InternalServerError().body(format!("{}", self))
            }
        }
    }
}
