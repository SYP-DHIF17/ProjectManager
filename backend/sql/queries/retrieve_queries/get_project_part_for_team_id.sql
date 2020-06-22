SELECT pp.project_part_id AS "project_part_id",
    pp.name AS "name",
    pp.position AS "position"
FROM teams t
    INNER JOIN team_parts tp ON tp.team_id = t.team_id
    INNER JOIN project_parts pp ON pp.project_part_id = tp.project_part_id
WHERE t.team_id = $1;