<!DOCTYPE html>
  <html>
  <head>

     
      <link href="css/custom.css" rel="stylesheet">
    </head>
<?php include 'header.php'; ?>
<body>
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
            "<td>".$row['employee_name']."</td>";
            echo 
            "<td>".$row['employee_address']."</td>";
            echo 
            "<td>".$row['expense_description']."</td>";
            echo 
            "<td>".$row['pre_tax_amount']."</td>";
            echo 
            "<td>".$row['tax_name']."</td>";
            echo 
            "<td>".$row['tax_amount']."</td>";
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
<?php include 'footer.php'?>
    </body>





  </html>
