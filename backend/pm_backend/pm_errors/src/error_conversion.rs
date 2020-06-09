use actix_web::error::BlockingError;
use std::io::Error as IOError;
use tokio_pg_mapper::Error as MapperError;
use tokio_postgres::error::Error as TokioError;
use crate::APIError;

impl From<BlockingError<APIError>> for APIError {
    fn from(error: BlockingError<APIError>) -> APIError {
        match error {
            BlockingError::Error(err) => err,
            BlockingError::Canceled => APIError::InternalServerError,
        }
    }
}

impl From<TokioError> for APIError {
    fn from(_: TokioError) -> APIError {
        APIError::InternalServerError
    }
}

impl From<IOError> for APIError {
    fn from(_: IOError) -> APIError {
        APIError::InternalServerError
    }
}

impl From<MapperError> for APIError {
    fn from(_: MapperError) -> APIError {
        APIError::InternalServerError
    }
}
