<!DOCTYPE html>
  <html>
<head>

      
      <link href="css/custom.css" rel="stylesheet">
    </head>
<?php include 'header.php'; ?>
<body>
  
<?php
echo '<br><div class="container"><div class="row"><div class="card-panel"><h3 class="center-align flow-text">';
//Supressing errors and log them
ini_set("display_errors", 0);
ini_set("log_errors", 1);
require('./db.php');
//Check if user is sending a file or not,If Not Die with a prompt
if(isset($_FILES['csvfile'])){
$file = $_FILES['csvfile'];
//Reading up file info into varibles for further use
$file_loc = $file['tmp_name'];
$filename = $file['name'];
$moveto = "temp/".$filename;

$file_extsn = explode(".",$filename);
//Using  end and strtolower to get the file extension which will help with if file name has "." in it or filename is 
//in random case
$file_extsn = strtolower(end($file_extsn));
//Chekcing if the file is csv or not
if($file_extsn==="csv"){

//Reading first row and col to know if there is a header or not.
move_uploaded_file($file_loc,$moveto);

// Build a query 

$sql_mk_table = "CREATE TABLE IF NOT EXISTS `$tablename` (`date` DATE, `category` varchar(40),
 `employee_name` varchar(20), `employee_address` varchar(50), `expense_description` varchar(20), 
 `pre_tax_amount` FLOAT, `tax_name` varchar(20), `tax_amount` FLOAT) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;";


//Start a Connection
$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->query($sql_mk_table)===TRUE)
 
//Build new query to import data into sql
$sql_csv = "LOAD DATA LOCAL INFILE '$moveto' 
INTO TABLE $tablename 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@date,category,employee_name,employee_address,expense_description,pre_tax_amount,tax_name,tax_amount)
SET date=STR_TO_DATE(@date,'%m/%d/%Y');";

if($conn->query($sql_csv)===TRUE)
{
    echo"Data has been imported You can view it <a href='./view.php'> here </a>";
}



else
 {
     echo "There was an error: ".$conn->error;
 }
 //Remove the temp file
unlink($moveto);
//Close connection
$conn->close();
}
else
//Tell user the file is not a csv
die("The uploaded file is not a CSV");
}
else
{
//If somehow user gets here tell him to choose a file
    die("Please Choose a file to import.");
}

echo '</div></div></div></h3>';


?>


 </main>

<?php include 'footer.php'?>
    </body>





  </html>
