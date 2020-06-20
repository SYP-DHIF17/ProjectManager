INSERT INTO projects(name, start_date, planned_enddate, overall_budget, leader) VALUES($1, $2, $3, $4, $5) returning project_id;
