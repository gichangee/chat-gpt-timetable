CREATE DATABASE IF NOT EXISTS BBS
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE BBS;

create table USER(
	userID varchar(20),
	userPassword varchar(20),
	userName varchar(20),
	userGender varchar(20),
	userEmail varchar(50),
	primary key(userID)
);

create table bbs(
	bbsID int,
	bbsTitle varchar(50),
	userID varchar(20),
	bbsDate datetime,
	bbsContent varchar(2048),
	bbsAvailable int,
	images varchar(1024),
	primary key(bbsID)
);
