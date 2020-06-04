use derive_more::{Display, From};

mod error_conversion;
mod error_response;

#[derive(Debug, Display, From)]
pub enum APIError {
    #[display(fmt = "Internal Server Error")]
    InternalServerError,
    #[display(fmt = "Unauthorized")]
    Unauthorized,
    #[display(fmt = "Database Error")]
    PGError,
    #[display(fmt = "Not Found")]
    NotFound,
}

impl std::error::Error for APIError {}
