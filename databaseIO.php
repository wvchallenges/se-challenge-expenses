<?php
//get the db configuration
include_once("config.php");

//get the query
$uploadQuery = $_POST["hiddenQuery"];

//run the query on MySQL to upload.  Function sends a true for success and false for failure by default.  Need to do not.
$uploadError = !sendQuery($uploadQuery, UPLOAD_DB, TABLE_NAME, DB_LOGIN, DB_PASSWORD, HOST, DB_PORT);

//continue only if no errors
if ($uploadError == false){
	//wait for first query to finish by sleep
	sleep(5);

	//execute query to retrieve a table containing the relative data to display
	$retrieveQuery = "SELECT SUM(preTaxAmount), MONTH(date), YEAR(date) FROM ".TABLE_NAME." GROUP BY YEAR(date), MONTH(date) ORDER by YEAR(date), MONTH(date) ASC;";
	$tableOutput = retrieveQuery($retrieveQuery, UPLOAD_DB, TABLE_NAME, DB_LOGIN, DB_PASSWORD, HOST, DB_PORT);
}

?>
<!doctype html>
<html lang="en">
        <head>

        <title>File Reader</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- use bootstrap style for display-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href="style.css" />
        </head>

        <body>
		<header><h1>Database Upload</h1></header>
		<!-- failed upload error -->
		<section id="failedUpload" name="failedUpload" <?php if($uploadError == false) echo "hidden"; ?> >
			<h3>Upload Unsuccessful, Check the Query</h3><br/>
			<p><span id="queryErrorOut" name="queryErrorOut"><?php echo $uploadQuery; ?></span></p>
			<a class="btn btn-danger" href="index.php">Restart</a>
		</section>

		<!-- successful upload -->
		<section id="successUpload" name="successUpload" <?php if($uploadError) echo "hidden"; ?> >
			<h3>Upload Successful</h3>
<?php 

if ($tableOutput == "Error generating table."){
	echo "<p>".$tableOutput."</p>";
} else {
	echo "<table class='table table-striped table-bordered'>
                                    	<thead>
                                                <tr>
                                                        <th>Sum</th>
                                                        <th>Month</th>
                                                        <th>Year</th>
                                                </tr>
                                        </thead><tbody>";
	echo $tableOutput;

	echo "</tbody></table>";
}

?>
			<a class="btn btn-success" href="index.php">Upload Another File</a> 
		</section>


	</body>
</html>
