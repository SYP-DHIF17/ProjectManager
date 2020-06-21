SELECT
    DISTINCT m.milestone_id AS "milestone_id",
    m.name AS "name",
    m.description AS "description",
    m.project_part_id AS "project_part_id",
    m.reach_date AS "reach_date"
    
FROM milestones m
WHERE project_part_id = $1;