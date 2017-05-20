Setup:
The App needs php and mysql to run
Let's install the things we need.
Note: You need superuser acess to install these
1) Install Apache
Open Terminal and type in 
"sudo apt-get install apache2"
2) Install MySQL
"sudo apt-get install apache2"
3) Install PHP
"sudo apt-get install php5 libapache2-mod-php5"
4) Restart Server
"sudo /etc/init.d/apache2 restart"
5) Open http://localhost/ to check if apache is running, you will see "It works!".
6) Make a test.php file inside "/var/www/" folder and inside the folder write this " echo 'this works!'"
and visit http://localhost/test.php if you see this works then php is installed and running without any issues
7)Now we need to setup mysql
Open terminal and type in "mysql -u root -p"
Make a new user by typing following
"CREATE USER 'USERNAME'@'localhost' IDENTIFIED BY 'PASSWORD';"
where USERNAME is your desired username and PASSWORD is your secure password

Now type in
"GRANT ALL PRIVILEGES ON * . * TO 'USERNAME'@'localhost';"
To grant new useraccount all privilages 

AppSetup:
1) Unzip app.zip to "/var/www/app"
2) Open db.php and change the values with new values which we created in 7th step.
3) you can leave $dbname and $tablename to defaults if you dont need custom values
4) Visit http://localhost/app/ if you see "Everything is working fine,You are ready to import." Note in green
you did everything right untill this step.if not check db.php and make sure everything is right.
5)Click on teal button which says file and click upload.
6)A Database will be created and the csv file will be imported into the database.
7)You can view your imported data at http://localhost/app/view.php 
8)Make sure temp folder inside "/var/www/app" is writable.


Mytake:
Although the app is fairly simple in its working, I wanted to use few new functions and code in different way than I usually do 
I choose a differnt css framework than usual and 
For the importing part I didn't want to loop a string cuz it felt slow and bit old style :D
so I used loadfile for importing csv file into database which is faster (tested with a 100mb file), I found it fun to use end function instead of count to find out file extension after exploding the filename - a small change from my coding routine but was fun nonetheless. I implemented few basic checks to make sure the file is a csv and file does exist, I thought it was a good idea to remove file after importing so i did that.
