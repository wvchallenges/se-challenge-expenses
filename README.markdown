# Design

This application was written as a REST application in Java. HTML uses AJAX to upload the file and retrieve the summary of expenses. 

Web page uses JQuery and Bootstrap. Backend is built on Jetty with Jersey. Database is MySQL. FileUpload and CSV parsing use Apache Commons library.

# Prerequisites
1. [Java 8](https://java.com/en/download/help/mac_install.xml)
2. Maven 
```
MacOS instructions

$ brew update
$ brew install maven
```
3. MySQL 
After installing MySQL, set the root password as *password* (it is hardcoded) and create database as *wave* and launch MySQL
```
$ brew install mysql
$ mysql_secure_installation
$ mysql.server start
$ mysql -uroot -ppassword
mysql> CREATE DATABASE wave;
```

# Install 
Clone the repo and build it using maven. Launch application and access from http://localhost:8008

```
se-challenge $ man clean install

se-challenge $ java -jar target/wave-0.0.1-SNAPSHOT.jar

```

If you have any questions, please send email to [kenan.unal@gmail.com](kenan.unal@gmail.com)


