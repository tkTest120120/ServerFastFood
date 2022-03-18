CREATE TABLE usersFood (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    tk VARCHAR(1000) NOT NULL UNIQUE,
    mk TEXT NOT NULL,
    permission TEXT NOT NULL
);

INSERT INTO `usersFood`(`id`, `tk`, `mk`, `permission`) VALUES (null,'a','a','food')

create table Users(
    phone varchar(15) primary key not null,
    password TEXT NOT NULL,
    role TEXT(20) NOT NULL, 
    email varchar(50),
    full_name TEXT,
    address TEXT,
    avatar TEXT,
    birthOfDate date,
    sex TEXT(6),
    createTime DATETIME
);

INSERT INTO `Users`(`phone`, `password`, `role`, `email`, `full_name`, `address`, `avatar`, `birthOfDate`, `sex`, `createTime`) VALUES ('0123456789','123','food',null,null,null,null,null,null,null)