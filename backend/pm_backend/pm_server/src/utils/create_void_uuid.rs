use uuid::Uuid;
use std::mem::MaybeUninit;

pub(crate) fn create_void_uuid() -> Uuid {
    unsafe {
        MaybeUninit::uninit().assume_init()
    }
}