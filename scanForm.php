<?php
//checks the contents of the file and make sure that everything is correct before proceeding
//scrub the files for anything strange, but the database query for upload.
$uploadError = false;
$errorMessage = "";

//get file properties
$fileName = $_FILES["selectedUpload"]["name"];
$fileType = $_FILES["selectedUpload"]["type"];
$fileSize = $_FILES["selectedUpload"]["size"];
$tempFileName = $_FILES["selectedUpload"]["tmp_name"];
$fileError = $_FILES["selectedUpload"]["error"];
$firstLine = $_POST["firstLine"];

//get the file extension.
$fileNameDetail = explode(".", $fileName);

//check the file condition before reading
if(strlen($fileName) == 0){
	//check the file has a name.
	$uploadError = true;
	$errorMessage = "No File Uploaded";
} elseif ( strtolower($fileNameDetail[1]) != "csv"){
	//check the file for csv extension
	$uploadError = true;
        $errorMessage = "File Is Not CSV";
} elseif ($fileSize == 0){
	//check for data
	$uploadError = true;
        $errorMessage = "File Is Empty";
} elseif ($fileError > 0){
	//other file errors
        $uploadError = true;
        $errorMessage = "Error Uploading File";

}


?>
<!doctype html>
<html lang="en">
        <head>

        <title>File Reader</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- use bootstrap style -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href="style.css" />
        </head>

        <body>
		<header><h1>File Contents</h1></header>
		<!-- failed upload error -->
		<section id="failedUpload" name="failedUpload" <?php if($uploadError == false) echo "hidden"; ?>>
			<h3>The file you submitted has an error <span id="errorMessage"><em><?php echo "(".$errorMessage.")"; ?></em></span>, please retry again.</h3>
			<a id="retryButton" name="retryButton" href="index.php" class="btn btn-danger">Retry</a>
		</section>

		<!-- successful upload -->
		<section id="successUpload" name="successUpload" <?php if($uploadError) echo "hidden"; ?> >
			<h3>Confirm File Data</h3><br/>
			<div class="table-responsive">

				<table class="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Date</th>
							<th>Category</th>
							<th>Employee Name</th>
							<th>Employee Address</th>
							<th>Expense Description</th>
							<th>Pre-Tax Amount</th>
							<th>Tax Name</th>
							<th>Tax Amount</th>
						</tr>
					</thead>
					<tbody>
<?php 

//read the file and insert into an array and fields populated.
$filepointer = fopen($tempFileName, "r");
$lineCounter = 0;

//store the SQL string
$SQL_query = "";

//read the file until eof
while(!feof($filepointer)){
	$lineValue = fgetcsv($filepointer);

	//count the number of fields
	$count = count($lineValue);

	if($lineCounter != 0 || $firstLine != 'on'){
		//output a table of the contents onto the screen to verify 
		echo "<tr>";

		//create the SQL query to insert content into a database
		$SQL_query = $SQL_query . "INSERT INTO employeePayroll (date, category, employeeName, employeeAddress, expenseDescription, preTaxAmount, taxName, taxAmount) VALUES (";
		for ($i = 0; $i < $count; $i++){

			$formatText = $lineValue[$i];

			//need to change the date to mysql format
			if($i == 0){
				$date = explode("/", $formatText);
				$formatText = $date[2] ."-".$date[0]."-".$date[1];
			}



			//add quotes for string for database
			if ( ($i != 5) && ($i != 7) ){
				$SQL_query = $SQL_query . "'".$formatText."'";
			} else {
				//remove comma for numbers
				$formatText = str_replace(",", "", $formatText);
				$SQL_query = $SQL_query . $formatText;
			}

			//SQL comma separators
			if ($i != ($count - 1)) $SQL_query = $SQL_query . ", ";

			echo "<td>".$formatText."</td>";

		}
		echo "</tr>";
		$SQL_query = $SQL_query . ");";
	}
	$lineCounter += 1;
}


fclose($filepointer);

?>

					</tbody>
				</table>
			</div>
			<form id="dbSubmit" name="dbSubmit" class="form" action="databaseIO.php" method="POST">
				<input id="hiddenQuery" name="hiddenQuery" type="hidden" value="<?php echo $SQL_query; ?>" />
				<input class="btn btn-success" type="submit" value="Upload to Database">
				<a id="redoButton" name="redoButton" class="btn btn-danger" href="index.php">Cancel Upload</a>
			</form>
		</section>


	</body>
</html>
