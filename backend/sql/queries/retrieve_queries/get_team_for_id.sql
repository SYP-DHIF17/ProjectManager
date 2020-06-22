SELECT t.project_id AS "project_id",
    t.leader_id AS "leader_id",
    t.name AS "name",
    t.team_id AS "team_id",
    tm.user_id AS "user_id"
FROM projects p
    INNER JOIN teams t ON t.project_id = p.project_id
    LEFT OUTER JOIN teammembers tm ON t.team_id = tm.team_id
WHERE p.project_id = $1;