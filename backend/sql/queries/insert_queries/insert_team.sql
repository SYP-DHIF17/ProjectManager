INSERT INTO teams (project_id, leader_id, name) VALUES($1, $2, $3) returning team_id;
