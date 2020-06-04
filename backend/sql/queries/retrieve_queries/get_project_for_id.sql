SELECT DISTINCT p.project_id AS "project_id",
                p.name AS "project_name",
                p.start_date AS "start_date",
                p.planned_enddate AS "planned_enddate",
                p.real_enddate AS "real_enddate",
                p.overall_budget AS "overall_budget",
                lu.user_id AS "leader_id",
                lu.first_name AS "first_name",
                lu.last_name AS "last_name",
                lu.email AS "email"
FROM users u
INNER JOIN teammembers tm ON u.user_id = tm.user_id
INNER JOIN teams t ON tm.team_id = t.team_id
INNER JOIN projects p ON p.project_id = t.project_id
INNER JOIN users lu ON p.leader = lu.user_id
WHERE u.user_id = $1;
