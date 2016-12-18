1. Instructions on how to build/run your application
This a simple node application using express framework as backend and angularjs as frontend.
For database, I used mysql as open source storage engine.
Install mysql database first using XAMPP tool or direct download.
Then create database called wave_challenge, then use table create script to generate table.
table create script:

CREATE TABLE `wave_bill` (
  `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `category` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `employee name` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `employee address` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `expense description` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `pre-tax amount` double DEFAULT NULL,
  `tax name` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `tax amount` double DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

How to build:

cd to root directory and type 'node install' and 'node app', and browse to localhost:3000 and upload .csv file. 



2. A paragraph or two about what you are particularly proud of in your implementation, and why.
What I am quite proud of this application is that using angular as framework to make app more organizable,
and easy to extend in the future is we want to create single page application.

 