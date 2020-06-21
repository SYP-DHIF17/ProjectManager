
-- project parts
SELECT 
    DISTINCT pp.project_part_id AS "project_part_id", 
    pp.name AS "name", 
    pp.position AS "position"
    
    FROM projects p
    INNER JOIN teams t ON p.project_id = t.project_id
    INNER JOIN team_parts tp ON tp.team_id = t.team_id
    INNER JOIN project_parts pp ON pp.project_part_id = tp.project_part_id
    
WHERE p.project_id = $1;

