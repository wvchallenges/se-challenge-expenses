<!DOCTYPE html>
  <html>
    <head>
      <!--Import Google Icon Font-->
      <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <!--Import materialize.css-->
      <link type="text/css" rel="stylesheet" href="css/materialize.css"  media="screen,projection"/>
      <style>

 body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  main {
    flex: 1 0 auto;
  }
  
  </style>


      <!--Let browser know website is optimized for mobile-->
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
       <!--Import jQuery before materialize.js-->
      <script type="text/javascript" src="js/jquery.min.js"></script>
      <script type="text/javascript" src="js/materialize.min.js"></script> 
    </head>


<body>
  <main>
     <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo center">CSV-Import</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="./">Import</a></li>
        <li><a href="./view.php">View Import</a></li>
        </ul>
    


    </div>
  </nav>
        <div class="container">
     
</div>

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

$sql_mk_table = "CREATE TABLE IF NOT EXISTS `$tablename` (`date` varchar(10), `category` varchar(23),
 `employee name` varchar(12), `employee address` varchar(50), `expense description` varchar(33), 
 `pre-tax amount` varchar(10), `tax name` varchar(12), `tax amount` varchar(8)) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;";


//Start a Connection
$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->query($sql_mk_table)===TRUE)
 
//Build new query to import data into sql
$sql_csv = "LOAD DATA LOCAL INFILE '$moveto' 
INTO TABLE $tablename 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS";

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

  <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Example App in PHP & MySQL</h5>
                
              </div>
              <div class="col l4 offset-l2 s12">
               
          <div class="footer-copyright">
            <div class="container">
            © For Wave
           
            </div>
          </div>
        </footer>

    </body>





  </html>