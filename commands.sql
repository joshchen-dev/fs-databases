CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs
  (author, url, title, likes)
VALUES ('Martin Fowler', 'asd', 'Microservices and the First Law of Distributed Objects', 0);

INSERT INTO blogs
  (author, url, title, likes)
VALUES ('s', 'd', 'a', 0);