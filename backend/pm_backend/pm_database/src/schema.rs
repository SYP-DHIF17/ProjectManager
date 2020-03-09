table! {
    customers (customer_id) {
        customer_id -> Uuid,
        company -> Varchar,
    }
}

table! {
    employees (employee_id) {
        employee_id -> Uuid,
    }
}

table! {
    milestones (milestone_id) {
        milestone_id -> Uuid,
        created_on -> Timestamp,
        created_by -> Nullable<Uuid>,
        number -> Int4,
        reach_date -> Timestamp,
        name -> Varchar,
        project_part_id -> Uuid,
    }
}

table! {
    project_parts (project_part_id) {
        project_part_id -> Uuid,
        name -> Varchar,
        project_id -> Uuid,
    }
}

table! {
    projects (project_id) {
        project_id -> Uuid,
        name -> Varchar,
        start_date -> Date,
        planned_enddate -> Date,
        real_enddate -> Date,
        overall_budget -> Numeric,
        leader -> Uuid,
        creator -> Uuid,
    }
}

table! {
    teammembers (team_id, employee_id) {
        team_id -> Uuid,
        employee_id -> Uuid,
    }
}

table! {
    teams (team_id) {
        team_id -> Uuid,
        name -> Varchar,
    }
}

table! {
    teamtasks (project_part_id, team_id) {
        project_part_id -> Uuid,
        team_id -> Uuid,
    }
}

table! {
    tickets (ticket_id) {
        ticket_id -> Uuid,
        title -> Varchar,
        description -> Varchar,
        is_done -> Bool,
        importance -> Int2,
        user_id -> Nullable<Uuid>,
        workpackage_id -> Nullable<Uuid>,
    }
}

table! {
    todos (todo_id) {
        todo_id -> Uuid,
        created_on -> Date,
        title -> Varchar,
        description -> Varchar,
        employee_id -> Uuid,
    }
}

table! {
    users (user_id) {
        user_id -> Uuid,
        created_on -> Timestamp,
        firstname -> Varchar,
        lastname -> Varchar,
        email -> Varchar,
        password -> Varchar,
        is_active -> Bool,
        birthdate -> Date,
        left_on -> Nullable<Date>,
    }
}

table! {
    workpackages (workpackage_id) {
        workpackage_id -> Uuid,
        name -> Varchar,
        start_date -> Date,
        planned_enddate -> Date,
        real_enddate -> Date,
    }
}

joinable!(customers -> users (customer_id));
joinable!(employees -> users (employee_id));
joinable!(milestones -> project_parts (project_part_id));
joinable!(milestones -> users (created_by));
joinable!(project_parts -> projects (project_id));
joinable!(teammembers -> employees (employee_id));
joinable!(teammembers -> teams (team_id));
joinable!(teamtasks -> project_parts (project_part_id));
joinable!(teamtasks -> teams (team_id));
joinable!(tickets -> users (user_id));
joinable!(tickets -> workpackages (workpackage_id));
joinable!(todos -> employees (employee_id));

allow_tables_to_appear_in_same_query!(
    customers,
    employees,
    milestones,
    project_parts,
    projects,
    teammembers,
    teams,
    teamtasks,
    tickets,
    todos,
    users,
    workpackages,
);
