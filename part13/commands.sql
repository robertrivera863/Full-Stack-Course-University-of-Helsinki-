-- Part 13 — psql / SQL exercises
-- Run with: psql -U postgres -d bloglist

-- 13.1: connect to the database
-- psql -U postgres -d bloglist

-- 13.2: create a blogs table and insert rows
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES
  ('Michael Chan', 'https://reactpatterns.com/', 'React patterns', 7),
  ('Edsger W. Dijkstra', 'http://www.cs.utexas.edu/~EWD/ewd08xx/EWD808.html', 'Canonical string reduction', 12),
  ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', 'First class tests', 10);

-- 13.3: select queries
SELECT * FROM blogs;
SELECT title, likes FROM blogs WHERE likes > 5;
SELECT * FROM blogs ORDER BY likes DESC;
SELECT * FROM blogs WHERE title ILIKE '%react%';

-- 13.4: update and delete
UPDATE blogs SET likes = likes + 1 WHERE title = 'React patterns';
DELETE FROM blogs WHERE id = 1;

-- 13.5: joins
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL
);

ALTER TABLE blogs ADD COLUMN user_id INTEGER REFERENCES users(id);

INSERT INTO users (username, name) VALUES ('mluukkai@example.com', 'Matti Luukkainen');
UPDATE blogs SET user_id = 1 WHERE id = 2;

SELECT b.title, u.name AS author_name
FROM blogs b
JOIN users u ON b.user_id = u.id;

-- 13.6: aggregation
SELECT author, COUNT(*) AS blog_count FROM blogs GROUP BY author;
SELECT AVG(likes) AS average_likes FROM blogs;
SELECT author, SUM(likes) AS total_likes
FROM blogs
GROUP BY author
ORDER BY total_likes DESC;

-- 13.7: author with the most likes
SELECT author, SUM(likes) AS total_likes
FROM blogs
GROUP BY author
ORDER BY total_likes DESC
LIMIT 1;
