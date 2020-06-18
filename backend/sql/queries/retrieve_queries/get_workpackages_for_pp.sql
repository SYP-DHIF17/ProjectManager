select workpackage_id,
       name,
       start_date,
       planned_enddate,
       description,
       real_enddate
from workpackages
where project_part_id = $1;
