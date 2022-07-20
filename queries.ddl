-- This file contains the query list for the task Users and posts crud using MySQL and nodejs.
--Create table users  query
CREATE TABLE `nodemysql`.`users` (
     `id` INT(100) NOT NULL AUTO_INCREMENT,
     `name` VARCHAR(100) NOT NULL,
     `email` VARCHAR(100) NOT NULL,
     `password` VARCHAR(100) NOT NULL,
     `createdAt` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
     `updatedAt` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
     PRIMARY KEY (`id`),
     UNIQUE (`email`)
) ENGINE = InnoDB;
--posts table
CREATE TABLE `nodemysql`.`posts` (
     `id` INT(100) NOT NULL AUTO_INCREMENT,
     `createdBy` VARCHAR(100) NOT NULL,
     `description` VARCHAR(500) NOT NULL,
     `file` VARCHAR(500) NOT NULL,
     `comments` VARCHAR(500) NOT NULL,
     `isLiked` BOOLEAN NOT NULL,
     `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     `updatedAt` DATETIME NULL DEFAULT NULL,
     PRIMARY KEY (`id`)
) ENGINE = InnoDB;