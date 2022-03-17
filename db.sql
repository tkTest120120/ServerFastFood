CREATE TABLE usersFood (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    tk VARCHAR(1000) NOT NULL UNIQUE,
    mk TEXT NOT NULL,
    permission TEXT NOT NULL
);

INSERT INTO `usersFood`(`id`, `tk`, `mk`, `permission`) VALUES (null,'a','a','food')