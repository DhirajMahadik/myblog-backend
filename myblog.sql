create database myblogs;

use myblogs;

-- select * from blogs where title like '%node%';

create table admin(
user_id int primary key auto_increment,
username varchar(60),
password varchar(500)
);

create table blogs(
id int primary key auto_increment,
title varchar(255),
category varchar(60) ,
description text ,
thumbnail varchar(1000) ,
headline varchar(500) ,
date varchar(100)
)

-- json for create admin  

-- http://localhost:5500/api/auth/register  (POST)

-- {
--     "username":"admin"
--     "password":"123"
-- }
