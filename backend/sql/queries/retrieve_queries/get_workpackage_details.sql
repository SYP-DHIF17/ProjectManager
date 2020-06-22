SELECT
    DISTINCT w.workpackage_id AS "workpackage_id",
    w.name AS "name",
    w.description AS "description",
    w.start_date AS "start_date",
    w.planned_enddate AS "planned_enddate",
    w.real_enddate AS "real_enddate"

FROM workpackages w
WHERE project_part_id = $1;

