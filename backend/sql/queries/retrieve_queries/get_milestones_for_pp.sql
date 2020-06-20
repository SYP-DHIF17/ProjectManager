select milestone_id,
       reach_date,
       name,
       description
from milestones
where project_part_id = $1;
