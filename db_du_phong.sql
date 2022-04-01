trên web là có các chức năng 
- quản lý user(xóa, khóa, không có thêm user bắt buộc đăng ký trên app)
- cái banner quảng cáo(thêm, xóa)
-  loại món(thêm, xóa, sửa)
- món ăn(thêm, xóa, sửa)
- đơn đã order (tình trạng chuẩn bị, thanh toán, giao hàng)
- cần thêm 1 bảng doanh thu để tính báo cáo nữa)

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

CREATE TABLE Foods (
    idFood int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    name TEXT NOT NULL,
    typeFood TEXT NOT NULL,
    price TEXT NOT NULL,
    amount TEXT NOT NULL    
);


CREATE TABLE Banner(
    idBanner INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    img MEDIUMTEXT NOT NULL,
    nameBanner TEXT NOT NULL
);

CREATE TABLE MenuDemo (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name TEXT(50) NOT NULL,
	img	MEDIUMTEXT NOT NULL
);

CREATE TABLE LoaiMon (
	idLoaiMon INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	tenLoai	TEXT NOT NULL,
	imgLoaiMon	MEDIUMTEXT NOT NULL
);

CREATE TABLE MonAn (
	idMonAn	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	tenMonAn	TEXT NOT NULL,
	idLoaiMon	INTEGER NOT NULL,
	gia	TEXT NOT NULL,
	soLuong	TEXT NOT NULL,
	moTa	TEXT,
	img1	MEDIUMTEXT NOT NULL,
	img2	MEDIUMTEXT,
	img3	MEDIUMTEXT,
	img4	MEDIUMTEXT,
	img5	MEDIUMTEXT,
	img6	MEDIUMTEXT,
	FOREIGN KEY(idLoaiMon) REFERENCES LoaiMon(idLoaiMon)
);

CREATE TABLE Selected (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	idUser	INTEGER NOT NULL,
	idMonAn	INTEGER,
	soLuong	TEXT NOT NULL
);