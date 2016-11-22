<?php

//Variables
$username = "test";
$password = "Qq123456";
$hostname = "localhost";
$dbname = "wave";
$tablename = "taxes";

//Connect to MySQL
$connection = mysql_connect($hostname, $username, $password) 
	or die("Unable to connect to MySQL");

//Create DB if not exists
mysql_query("CREATE DATABASE IF NOT EXISTS ".$dbname);
mysql_query("use ".$dbname);

//Create table if not exists
mysql_query("CREATE TABLE IF NOT EXISTS ".$tablename."(date DATE, category VARCHAR(255), employee_name varchar(255), employee_address varchar(255), expense_description varchar(255), pre_tax_ammount numeric(15,2), tax_name varchar(255), tax_ammount numeric(15,2))");
  
//Clear table and import file if submitted
if(isset($_POST["submit"])){
	mysql_query("delete FROM ".$tablename);
	mysql_query("LOAD DATA LOCAL INFILE '".addslashes($_FILES['fileToUpload']['tmp_name'])."' INTO TABLE ".$tablename." FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"'  LINES TERMINATED BY '\n' IGNORE 1 LINES (@date,category,employee_name,employee_address,expense_description,pre_tax_ammount,tax_name,tax_ammount) SET date = STR_TO_DATE(@date, '%m/%d/%Y')");
}
else echo "Previously uploaded data:<br/><br/>";

//Read data and print table
$result = mysql_query("SELECT YEAR(date), MONTHNAME(date), SUM(tax_ammount), COUNT(1) FROM ".$tablename." GROUP BY YEAR(date), MONTH(date)");
while($row = mysql_fetch_array($result)) {
	echo $row[0]."; ".$row[1]."; ".$row[2]."; ".$row[3]."; ".$row[4]."<br/>";
}

//Close connection
mysql_close($connection);

?>
<!DOCTYPE html>
 <html> 
 <body> 
	<form method="POST" enctype="multipart/form-data">
		Select file to upload: <input type="file" name="fileToUpload" id="fileToUpload">
		<input type="submit" value="Import data" name="submit">
	</form> 
 </body>
 </html>

