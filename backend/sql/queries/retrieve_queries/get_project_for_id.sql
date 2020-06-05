SELECT DISTINCT p1.project_id AS "project_id",
                p1.name AS "project_name",
                p1.start_date AS "start_date",
                p1.planned_enddate AS "planned_enddate",
                p1.real_enddate AS "real_enddate",
                p1.overall_budget AS "overall_budget",
                u.user_id AS "leader_id",
                u.first_name AS "first_name",
                u.last_name AS "last_name",
                u.email AS "email"
FROM users u
INNER JOIN projects p1 ON p1.leader = u.user_id
LEFT OUTER JOIN teammembers tm ON u.user_id = tm.user_id
LEFT OUTER JOIN teams t ON tm.team_id = t.team_id
LEFT OUTER JOIN projects p ON p.project_id = t.project_id
WHERE u.user_id = $1;
