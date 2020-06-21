SELECT 
    DISTINCT pp.project_part_id AS "project_part_id", 
    pp.name AS "name", 
    pp.position AS "position"
    
    FROM projects p
    INNER JOIN teams t ON p.project_id = t.project_id
    INNER JOIN team_parts tp ON tp.team_id = t.team_id
    INNER JOIN project_parts pp ON pp.project_part_id = tp.project_part_id
    
WHERE p.project_id = $1;
-- milestones of project part
SELECT
    DISTINCT m.milestone_id AS "milestone_id",
    m.name AS "name",
    m.description AS "description",
    m.project_part_id AS "project_part_id",
    m.reach_date AS "reach_date"
    
FROM milestones m
WHERE project_part_id = $1;

-- workpackages of project part
SELECT
    DISTINCT w.workpackage_id AS "workpackage_id",
    w.name AS "name",
    w.description AS "description",
    w.start_date AS "start_date",
    w.planned_enddate AS "planned_enddate",
    w.real_enddate AS "real_enddate"

FROM workpackages w
WHERE project_part_id = $1;

