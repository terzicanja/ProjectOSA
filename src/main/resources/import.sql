INSERT INTO users (user_username, user_password, user_name) VALUES ('a', '$2a$10$yS7pAhT6AVZUhW27So8NA.CQGybqWN4e5g8XV0/QQvw07lDqyH81y', 'Anja');
INSERT INTO users (user_username, user_password, user_name) VALUES ('b', 'b', 'Bbb');

INSERT INTO authority (name) VALUES ('ROLE_USER');
INSERT INTO authority (name) VALUES ('ROLE_ADMIN');
INSERT INTO authority (name) VALUES ('ROLE_COMMENTATOR');

INSERT INTO posts (post_title, post_description, post_likes, post_date, post_dislikes, user_id, latitude, longitude) VALUES ('prva vest', 'Razni racunari', 11, '2017-12-11', 1, 2, 37.436227, -122.132592);
INSERT INTO posts (post_title, post_description, post_likes, post_date, post_dislikes, user_id, latitude, longitude) VALUES ('druga vest', 'Prenosni racunari', 34, '2015-12-11', 2, 2, 33.998768, -118.273992);
INSERT INTO posts (post_title, post_description, post_likes, post_date, post_dislikes, user_id, latitude, longitude) VALUES ('treca vest', 'Prenosni ali teski racunari', 5, '2011-12-11', 3, 1, -22.524330, -41.946920);
INSERT INTO posts (post_title, post_description, post_likes, post_date, post_dislikes, user_id, latitude, longitude) VALUES ('cetvrta vest', 'Tesko prenosni racunari', 10, '2012-12-11', 4, 1, 35.707812, 139.724990);

INSERT INTO tags (tag_name) VALUES ('najnovije');
INSERT INTO tags (tag_name) VALUES ('tagovi');
INSERT INTO tags (tag_name) VALUES ('hashtag');
INSERT INTO tags (tag_name) VALUES ('vesti');
INSERT INTO tags (tag_name) VALUES ('probaaaa');

INSERT INTO comments (comment_title, comment_description, comment_likes, comment_dislikes, comment_date, post_id, user_id) VALUES ('komentar 1', 'sadrzaj prvog komentara', 22, 11, '2010-12-11', 2, 2);
INSERT INTO comments (comment_title, comment_description, comment_likes, comment_dislikes, comment_date, post_id, user_id) VALUES ('komentar 2', 'sadrzaj drugog komentara', 5, 1, '2010-12-11', 3, 1);
INSERT INTO comments (comment_title, comment_description, comment_likes, comment_dislikes, comment_date, post_id, user_id) VALUES ('komentar 3', 'sadrzaj treceg komentara', 3, 5, '2010-12-11', 4, 2);
INSERT INTO comments (comment_title, comment_description, comment_likes, comment_dislikes, comment_date, post_id, user_id) VALUES ('komentar 2', 'aaaaaaaaaaa', 5, 1, '2010-12-11', 3, 1);
INSERT INTO comments (comment_title, comment_description, comment_likes, comment_dislikes, comment_date, post_id, user_id) VALUES ('komentar 3', 'bbbbbbbbb', 3, 5, '2010-12-11', 3, 2);

INSERT INTO post_tags (post_id, tag_id) VALUES (3, 1);
INSERT INTO post_tags (post_id, tag_id) VALUES (1, 3);
INSERT INTO post_tags (post_id, tag_id) VALUES (2, 2);
INSERT INTO post_tags (post_id, tag_id) VALUES (1, 4);
INSERT INTO post_tags (post_id, tag_id) VALUES (1, 5);