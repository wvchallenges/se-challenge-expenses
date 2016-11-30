<?php

//requires php 7.x, mysql database 5.x setup in config.php
//requires php.ini setting to allow file uploads at the max size of file expected

include_once("config.php");
//try open database;

//execute a random query
$testQuery = "SELECT TOP(1) FROM " + TABLE_NAME;
$installError = !sendQuery($testQuery, UPLOAD_DB, TABLE_NAME, DB_LOGIN, DB_PASSWORD, HOST, DB_PORT);


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
		<header><h1>File Reader Application</h1></header>
		<!-- section for detecting installation of database and configuration -->
		<section id="configInstall" name="configInstall" <?php if ($installError == false) echo "hidden"; ?>>
			<h3>Please install the application by editing the config.php file with the correct login, password and database.  Make sure to run the SQL file in the database to create the required table.</h3>
		</section>

		<!-- section for submitting file for user -->
		<section id="submitFile" name="submitFile" <?php if ($installError == true) echo "hidden"; ?>>
			<form class="form-inline" name="fileUpload" action="scanForm.php" method="POST" enctype="multipart/form-data">

				<fieldset>
					<legend>Upload File Form:</legend>
					<div class="form-group">
						<label class="control-label" for="selectedUpload"/>Common Separated File (.csv)</label>
						<input class="file" id="selectedUpload" name="selectedUpload" type="file" />
					</div>

					<div class="form-group">
						<label class="control-label" for="firstLine">First Line Is Header</label>
						<input id="firstLine" name="firstLine" class="checkbox" type="checkbox" checked></input>
					</div>
					<input type="submit" class="btn btn-success" value="Upload File"/>

				</fieldset>

			</form>
		</section>

	</body>
</html>
