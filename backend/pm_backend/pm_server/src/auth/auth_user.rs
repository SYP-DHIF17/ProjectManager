use pm_errors::APIError;
use actix_web::*;
use futures::future::{err, ok, Ready};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use crate::auth::utils::decode_token;

#[derive(Debug, PartialEq, Clone, Serialize, Deserialize)]
pub struct AuthUser {
    pub user_id: Uuid,
}

impl FromRequest for AuthUser {
    type Error = APIError;
    type Future = Ready<Result<Self, Self::Error>>;
    type Config = ();

    fn from_request(req: &HttpRequest, _payload: &mut dev::Payload) -> Self::Future {
        let headers = req.headers();
        return match headers.get("auth-header") {
            Some(val) => {
                if let Ok(val) = val.to_str() {
                    return match decode_token(&String::from(val)) {
                        Ok(user) => ok(user),
                        Err(_) => err(APIError::Unauthorized),
                    };
                }
                err(APIError::InternalServerError)
            }
            None => err(APIError::Unauthorized),
        };
    }
}
