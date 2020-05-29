pub fn pe<T, E: std::error::Error>(val: &Result<T, E>) {
    if let Err(err) = val {
        println!("{:?}", err);
    }
}