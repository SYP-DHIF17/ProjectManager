SELECT user_id, created_on, first_name AS "firstname", last_name AS "lastname", email, password, birthdate FROM users WHERE email = $1;
