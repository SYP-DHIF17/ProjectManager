use pm_errors::APIError;

use argonautica::input::Salt;
use argonautica::{Hasher, Verifier};
use crate::secrets::PW_SECRET;

static HASH_ITERATIONS: u32 = 150;
static HASH_LEN: u32 = 32;
static SALT_LEN: u32 = 32;

pub fn verify(hash: &str, password: &str) -> Result<bool, APIError> {
    Verifier::default()
        .with_hash(hash)
        .with_password(password)
        .with_secret_key(PW_SECRET)
        .verify()
        .map_err(|_| APIError::Unauthorized)
}

pub fn hash_password(password: &str) -> Result<String, APIError> {
    Hasher::default()
        .with_password(password)
        .with_secret_key(PW_SECRET)
        .configure_hash_len(HASH_LEN)
        .configure_iterations(HASH_ITERATIONS)
        .with_salt(Salt::random(SALT_LEN))
        .hash()
        .map_err(|_| APIError::InternalServerError)
}