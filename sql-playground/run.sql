drop table if exists appearances;
drop table if exists actors;
drop table if exists movies;

create table actors (
  id serial primary key,
  name varchar,
  dob date 
);

create table movies (
  id serial primary key,
  title varchar,
  year int
);

create table appearances (
  id serial primary key,
  movie_id int references movies(id) on delete cascade,
  actor_id int references actors(id) on delete cascade,
  character varchar
);