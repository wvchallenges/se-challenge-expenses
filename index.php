<!DOCTYPE html>
  <html>
<head>

      <!--Import Google Icon Font-->
      <link href="css/custom.css" rel="stylesheet">
    </head>
<?php include 'header.php'; ?>
<body>
        <div class="container">
     <div class="row">
       <p>Choose a CSV file to import </p>
       <div class="col s12">
   <form action="csvimport.php" method="post" enctype="multipart/form-data">
    <div class="file-field input-field">
      <div class="btn">
        <span>File</span>
        <input type="file" name="csvfile">
      </div>
      
      <div class="file-path-wrapper">

        <input class="file-path validate" type="text">
        <input type="submit" class="btn-large waves-effect waves-light teal" value="Upload">
      </div>
      
    </div>
    </form>
</div>
  </div>
</div>

<?php
//Supressing errors and logging them
ini_set("display_errors", 0);
ini_set("log_errors", 1);
require('./db.php');
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection for error
if ($conn->connect_error) {
  //HTML content inside echo to have a neat output
  echo '<div class="container">
     <div class="row">
     <div class="col l10 s8">
     <div class="card-panel red lighten-2">
     ';
    die('<i class="small material-icons">info_outline</i>The Database was not configured properly throws following error: ' . $conn->connect_error);
echo '</div> </div> </div> </div>';

}
else
{
  echo '<div class="container">
     <div class="row">
     <div class="col l8">
     <div class="card-panel green">
     <p><i class="small material-icons">info_outline</i>Everything is working fine, you are ready to import.</p>';
echo '</div> </div> </div> </div>';
}
$conn->close();
?>

  </main>

  <?php include 'footer.php'?>
    </body>





  </html>
