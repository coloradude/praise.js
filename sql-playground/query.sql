select 
  name,
  character,
  title,
  year

from appearances
  left join actors on actors.id = appearances.actor_id
where appearances.id is null

;