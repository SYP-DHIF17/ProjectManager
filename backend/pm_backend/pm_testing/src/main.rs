use chrono::*;
fn main() {
    let date: NaiveDate = chrono::Local::now().date().naive_local();
    println!("{}", serde_json::to_string(&date).unwrap());
}
