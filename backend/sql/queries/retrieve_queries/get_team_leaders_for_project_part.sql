SELECT t.leader_id
FROM project_parts pp
INNER JOIN team_parts tp ON tp.project_part_id = pp.project_part_id
INNER JOIN teams t ON t.team_id = tp.team_id
WHERE pp.project_part_id = $1;
