<?php

//MySQL INFO
$servername = "mysql.travisrawn.com";
$username = "bigbirdy";
$password = "bird1990";
$dbName = "wavechallenge";

$target_dir = "/uploads";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

$fileType = pathinfo($target_file,PATHINFO_EXTENSION);
//File check to ensure its a least a csv.
if(isset($_POST["submit"])) {
    if($fileType !== 'csv') {
         $response_array['status']='error';
		 $response_array['message']="File is not a csv file.";
		 die(json_encode($response_array));
    }

//Move file to server for file stream.	
if (!(move_uploaded_file($_FILES['fileToUpload']['tmp_name'], "uploads/uploaded_file.txt"))) {
	$response_array['status']='error';
	$response_array['message']='Error uploading file.';
	 die(json_encode($response_array));
}

//SQL connect
$conn = new mysqli($servername, $username, $password, $dbName) ;
if (!$conn)
  {
   $response_array['status']='error';
   $response_array['message']='Could not connect to database: ' . mysql_error();
   die(json_encode($response_array));
  }
 //Getting extension off file name. 
$tableName= substr($_FILES["fileToUpload"]["name"],0,-4);

//Check if table exist.
$sql = "select 1 from '".$tableName."' LIMIT 1";
if($conn->query($sql) === TRUE)
{
   $response_array['status']='error';
   $response_array['message']="File has already been uploaded.";
      die(json_encode($response_array));
}

 //Create the table to drop csv in.
 $sql="CREATE TABLE ". $tableName ." (
		id INT(4) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			date DATE NOT NULL,
			category VARCHAR(255) NOT NULL,
			employeeName VARCHAR(255) NOT NULL,
			employeeAddress VARCHAR(255) NOT NULL,
			expenseDesc VARCHAR(255) NOT NULL,
			pretaxAmt DECIMAL(10,2) NOT NULL,
			taxName VARCHAR(255) NOT NULL,
			taxAmount DECIMAL(10,2) NOT NULL)";

if ($conn->query($sql) === FALSE) {
    $response_array['status']='error';
	$response_array['message']='Error creating the table: ' . $conn->error;
	die(json_encode($response_array));
}
//Reading file line by line and inserting into table

//open file stream
$fp = fopen('uploads/uploaded_file.txt', 'r');

$months= array();
$monthExp=array();
$lineCount=1;
    while ( ($line = fgets($fp)) !== false) {
	  //ignore header line	
      if($lineCount!=1){
	    $cols = str_getcsv($line,",");
		//adding months array for expenses by months
		
		//Check if new month, if new push to arrays
		$month=explode("/",$cols[0])[0];
		if(!(in_array($month,$months))){
			array_push($months,$month);
			array_push($monthExp,$cols[7]+$cols[5]);
		}else{
			$index=array_search($month,$months);
			$monthExp[$index]+=$cols[7]+$cols[5];		
		}
		//insert into db
		$sql="INSERT INTO ". $tableName ." (date, category, employeeName,employeeAddress,expenseDesc,pretaxAmt,taxName,taxAmount)
              VALUES ('".date("Y-m-d H:i:s", strtotime($cols[0]))."', '".$cols[1]."', '".$cols[2]."','".$cols[3]."','".$cols[4]."','".$cols[5]."','".$cols[6]."','".$cols[7]."')";
		if ($conn->query($sql) === FALSE) {
			$response_array['status']='error';
			$response_array['message']="Error inserting data: " . $conn->error;
			die(json_encode($response_array));
		}
	  }
	  $lineCount++;
    }
fclose($fp);

$conn->close();

//Delete the uploaded file since no longer needed.
unlink("uploads/uploaded_file.txt");

//send data back.
$response_array['status']='success';
$response_array['data']['months']=$months;
$response_array['data']['expense']=$monthExp;
echo json_encode($response_array);


}


?>  
