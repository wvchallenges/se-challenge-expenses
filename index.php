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
//Supressing errors and log them
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
     <p><i class="small material-icons">info_outline</i>Everything is working fine,You are ready to import.</p>';
echo '</div> </div> </div> </div>';
}
$conn->close();
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
