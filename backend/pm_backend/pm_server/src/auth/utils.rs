use crate::auth::auth_user::AuthUser;

use biscuit::errors::Error as BQError;
use biscuit::jwa::*;
use biscuit::jws::*;
use biscuit::*;
use chrono::{DateTime, Duration, SecondsFormat, Utc};
use std::str::FromStr;
use crate::secrets::JWT_SECRET;

pub static DAYS_OFFSET: i64 = 3;

type MyCompact = biscuit::jws::Compact<biscuit::ClaimsSet<AuthUser>, biscuit::Empty>;

pub fn decode_token(token: &String) -> Result<AuthUser, BQError> {
    let signing_secret = Secret::Bytes(JWT_SECRET.to_string().into_bytes());
    let token: MyCompact = JWT::<_, biscuit::Empty>::new_encoded(&token);
    let token: MyCompact = token.into_decoded(&signing_secret, SignatureAlgorithm::HS256)?;

    let user = (token.payload()?).private.clone();
    let registered_claims = (token.payload()?).registered.clone();
    registered_claims.validate(ValidationOptions::default())?;
    Ok(user)
}

pub fn create_token(user: AuthUser) -> (String, String) {
    let signing_secret = Secret::Bytes(JWT_SECRET.to_string().into_bytes());
    let timestamp = get_new_timestamp();
    let expected_claims = ClaimsSet::<AuthUser> {
        registered: RegisteredClaims {
            issuer: Some(FromStr::from_str("localhost").unwrap()),
            subject: Some(FromStr::from_str("CMS").unwrap()),
            audience: Some(SingleOrMultiple::Single(
                FromStr::from_str("localhost").unwrap(),
            )),
            not_before: Some(1234.into()),
            expiry: Some(Timestamp::from(timestamp.clone())),
            ..Default::default()
        },
        private: user,
    };
    let expected_jwt = JWT::new_decoded(
        From::from(RegisteredHeader {
            algorithm: SignatureAlgorithm::HS256,
            ..Default::default()
        }),
        expected_claims.clone(),
    );

    let token = expected_jwt.into_encoded(&signing_secret).unwrap();
    let token = token.unwrap_encoded().to_string();
    (token, timestamp.to_rfc3339_opts(SecondsFormat::Secs, true))
}

fn get_new_timestamp() -> DateTime<Utc> {
    Utc::now() + Duration::days(DAYS_OFFSET)
}

