<!DOCTYPE html>
<html>
	<head>
		<meta charset="ISO-8859-1">
		<title>Upload File</title>
		<link rel="stylesheet" href="css/bootstrap.min.css" />
		<link rel="stylesheet" href="css/site.css" />
		<script src="js/jquery-2.1.4.min.js"></script>
		<script src="js/site.js"></script>
	</head>
	
	<body>			
		<br/><br/>
		<div class="container" id="container">
			<form class="panel panel-primary" role="form">
			
				<div class="panel-heading">
					<h4>Upload File</h4>
				</div>
				
				<div class="panel-body">
					<div class="col-sm-6">
						<div class="input-group">
							<span class="input-group-btn">
								<span class="btn btn-primary btn-file">
									Browse... <input type="file" multiple=""/>
								</span>
							</span>
							<input type="text" class="form-control" readonly=""/>
						</div>
					</div>
					<div class="col-sm-12">
						<br/>
						<input type="submit" value="Upload" class="btn btn-primary" />
						<input type="submit" value="Reset" class="btn btn-primary" />
					</div>
				</div>
			</form>
		</div>
	</body>
</html>