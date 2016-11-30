<?php
//define settings
define ('UPLOAD_DB', '');
define ('TABLE_NAME', 'employeePayroll');
define ('DB_LOGIN', '');
define ('DB_PASSWORD', '');
define ('DB_PORT', 3306);
define ('HOST', 'localhost');

/*
* Sends a query to the database with the defined global parameters
*/
function sendQuery($query, $db, $table, $login, $pass, $host, $port = 3306){
	//make the db connection
	$dbconnect = mysqli_connect ($host, $login, $pass, $db);

	//check the db connection
	if(mysqli_connect_errno()){
		//return an error for handling
		return false;
	}

	//send the query in multi form to the server.
	mysqli_multi_query($dbconnect, $query);
	mysqli_close($dbconnect);

	//return a success for signal
	return true;
}

/*
* Retrieve the data and put it into a table format
*/
function retrieveQuery($query, $db, $table, $login, $pass, $host, $port = 3306){
	$table = "";

	//make the db connection
	$dbconnect = mysqli_connect ($host, $login, $pass, $db);

	//check the db connection
	if(mysqli_connect_errno()){
		return "Error generating table.";
	}

	//get the results
	$result = mysqli_query($dbconnect, $query);

	//format the results into a table.
	while($row = mysqli_fetch_array($result, MYSQLI_NUM)){
		$table = $table . "<tr><td>".$row[0]."</td><td>".$row[1]."</td><td>".$row[2]."</td></tr>";
	}

	//close the db connection
	mysqli_free_result($result);
	mysqli_close($dbconnect);

	//return the new table
	return $table;
}

?>
