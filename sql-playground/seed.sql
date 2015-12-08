delete from movies;
delete from actors;

insert into movies (title, year) values 
  ('Shawshank Redemption', 1994),
  ('Bourne Identity', 2004),
  ('Back to the Future', 1986),
  ('Good Will Hunting', 1998);

insert into actors (name, dob) values
  ('Matt Damon', '1987-03-23'),
  ('Tim Robbins', '1111-01-22'),
  ('Morgan Freeman', '2934-10-30'),
  ('Jonah Hill', '2002-12-02');

insert into appearances (actor_id, movie_id, character) values
  (
    (select id from actors where name = 'Matt Damon'),
    (select id from movies where title = 'Bourne Identity'),
    'Jason Bourne'
  ),
  (
    (select id from actors where name = 'Matt Damon'),
    (select id from movies where title = 'Good Will Hunting'),
    'Will Hunting'
  ),
  (
    (select id from actors where name = 'Morgan Freeman'),
    (select id from movies where title = 'Shawshank Redemption'),
    'Red'
  ),
  (
    (select id from actors where name = 'Tim Robbins'),
    (select id from movies where title = 'Shawshank Redemption'),
    'Andy Dufrane'
  )
  ;