use derive_more::{Display, From};

mod error_response;
mod error_conversion;

#[derive(Debug, Display, From)]
pub enum APIError {
    #[display(fmt = "Internal Server Error")]
    InternalServerError,
}
