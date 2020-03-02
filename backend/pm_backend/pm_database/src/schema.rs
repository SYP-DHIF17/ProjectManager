table! {
    customers (customer_id) {
        customer_id -> Uuid,
        company -> Varchar,
    }
}

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
        birthdate -> Date,
        left_on -> Nullable<Date>,
    }
}

joinable!(customers -> users (customer_id));
joinable!(milestones -> users (created_by));

allow_tables_to_appear_in_same_query!(
    customers,
    milestones,
    users,
);
