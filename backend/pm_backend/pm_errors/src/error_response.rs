use crate::APIError;
use actix_web::{HttpResponse, ResponseError};

impl ResponseError for APIError {
    fn error_response(&self) -> HttpResponse {
        match *self {
            APIError::InternalServerError => {
                HttpResponse::InternalServerError().body(format!("{}", self))
            }
            APIError::Unauthorized => HttpResponse::Unauthorized().body(format!("{}", self)),
            APIError::PGError => HttpResponse::InternalServerError().body(format!("{}", self)),
            APIError::NotFound => HttpResponse::NotFound().body(format!("{}", self)),
        }
    }
}
