<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
		
			<form class="panel panel-primary" role="form" method="POST" action="./upload" enctype="multipart/form-data">	
				<div class="panel-heading">
					<h4>Upload File</h4>
				</div>
				
				<div class="panel-body">
					<div class="col-sm-6">
						<div class="input-group" id="input-group">
							<span class="input-group-btn">
								<span class="btn btn-primary btn-file" id="btn-file">
									Browse... <input type="file" multiple="" name="file" id="fileUploadInput"/>
								</span>
							</span>
							<input type="text" class="form-control" readonly="" id="fileUploadTxt"/>
						</div>
					</div>
					<div class="col-sm-12">
						<br/>
						<input type="submit" value="Upload" id="btn-upload" class="btn btn-primary" />
						<input type="submit" value="Reset" id="btn-reset" class="btn btn-primary" />
					</div>
				</div>
			</form>
			
			<h3 id="msg" class="text-center ${isError ? 'error-msg' : ''}">${message}</h3>
			
			<h3 id="loading-msg" class="text-center" style="display: none;">
				<img src="img/loading.gif"/>Please wait while the file is being uploaded...
			</h3>
					
		</div>
	</body>
</html>