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

<?php
//php code starts here
//Html echo starts here
echo '<br><div class="container"><div class="row"><div class="card-panel"><h3 class="center-align flow-text">Expense Table</h3>';

//Supressing errors and log them
ini_set("display_errors", 0);
ini_set("log_errors", 1);
require('./db.php');
$conn = new mysqli($servername, $username, $password, $dbname);

$sql = "SELECT * FROM $tablename";
$query = $conn->query($sql);
if($query->num_rows>0)
{
echo" <table class=\"responsive-table\">
        <thead>
          <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Employee name</th>
               <th>Employee address</th>
              <th>Expense description</th>
               <th>Pre-tax amount</th>
              <th>Tax name</th>
              <th>Tax Amount</th>
          </tr>
        </thead><tbody>";
        //Loop the data into table to display
        while ($row=$query->fetch_assoc()){
            echo"
          <tr>";
            echo 
            "<td>".$row['date']."</td>";
            echo 
            "<td>".$row['category']."</td>";
            echo 
            "<td>".$row['employee name']."</td>";
            echo 
            "<td>".$row['employee address']."</td>";
            echo 
            "<td>".$row['expense description']."</td>";
            echo 
            "<td>".$row['pre-tax amount']."</td>";
            echo 
            "<td>".$row['tax name']."</td>";
            echo 
            "<td>".$row['tax amount']."</td>";
echo"</tr>";



        
        }
        echo "</tbody></table>";
        $conn->close();
        
}

else
{
  echo "No Import Found";
}







//Close html tags and html ends here 
echo '</div></div></div>';
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