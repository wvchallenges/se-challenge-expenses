<!DOCTYPE html>
<html>
<head>
    <link rel = "stylesheet" type="text/css" href="style.css">
</head>
<body>
	<img id="banner" src="images/banner.png" alt="Banner Image"/>
	<div class="php1" id="php1" style="position: absolute; left: 50%; top: 500px;">
		<?php
			$target_file = "./uploads/" . basename($_FILES["fileToUpload"]["name"]);
			move_uploaded_file ($_FILES['fileToUpload'] ['tmp_name'], 
       "./uploads/{$_FILES['fileToUpload'] ['name']}");

			//the parameters to my local MySql db
			$servername = "localhost:50000";
			$username = "admin";
			$password = "2345432";
			$db = "wave";

			// Create connection
			$conn = new mysqli($servername, $username, $password, $db);

			// Check connection
			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			} 
			//echo "Connected successfully";

			$handle = fopen($target_file, "r");
			if ($handle) {
				$line = fgets($handle);
			    while (($line = fgets($handle)) !== false) {
			        // process the line read.
			        $linearray = str_getcsv($line, ",");
			        $date = $linearray[0];
			        $datebreak = explode("/", $date) ;
			        $month = $datebreak[0];
			        $day = $datebreak[1];
			        $year = $datebreak[2];
			        $category = $linearray[1];
			        $ename = $linearray[2];
			        $eadd = $linearray[3];
			        $expd = $linearray[4];
			        $ptax = $linearray[5];
			        $taxn = $linearray[6];
			        $potax = $linearray[7];
			        $ptax = str_replace(',', '', $ptax);
			        $potax = str_replace(',', '', $potax);
			        $query = "INSERT INTO wave (date,category,name,address,exp_description,pre_tax_amnt,tax_name,tax_amnt) Values('" . $year . "-" . $month . "-" . $day . "','" 
			        				. $category .
			        				"','" . $ename .
			        				"','" . $eadd .
			        				"','" . $expd .
			        				"'," . $ptax .
			        				",'" . $taxn .
			        				"'," . $potax . ")";
			        if ($conn->query($query) === TRUE) {
					} else {

					}

					
			    }

			fclose($handle);
			#the sql query now
			$query = "select MONTH(date) as month, sum(pre_tax_amnt+tax_amnt) as total from wave group by MONTH(date) order by MONTH(date)";
			$result = $conn->query($query);


			//create the results table
			echo "<table border=\"1\"><tr><td>Month</td><td>Total</td></tr>";
			while ($list = mysqli_fetch_assoc($result)) {
			  echo '<tr><td>' . $list['month'] . '</td>';
			  echo '<td>' . $list['total'] . '</td></tr>';
			}
			echo "</table>";



			$conn->close();
			} else {
			    // error opening the file.
			} 
			
		?>
	</div>
</body>
</html>