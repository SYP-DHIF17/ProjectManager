table! {
    milestones (id) {
        id -> Uuid,
        created_on -> Timestamp,
        created_by -> Nullable<Uuid>,
        number -> Int4,
        reach_date -> Timestamp,
        name -> Varchar,
    }
}

table! {
    users (id) {
        id -> Uuid,
        created_on -> Timestamp,
        created_by -> Nullable<Uuid>,
        firstname -> Varchar,
        lastname -> Varchar,
        email -> Varchar,
        password -> Varchar,
        is_active -> Bool,
    }
}

joinable!(milestones -> users (created_by));

allow_tables_to_appear_in_same_query!(
    milestones,
    users,
);
