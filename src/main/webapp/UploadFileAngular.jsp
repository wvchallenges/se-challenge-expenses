<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
		<meta charset="ISO-8859-1">
		<title>Upload File</title>
		<link rel="stylesheet" href="css/bootstrap.min.css" />
		<link rel="stylesheet" href="css/site.css" />
		<script src="js/jquery-2.1.4.min.js"></script>
		<script src="js/angular.min.js"></script>
		<script src="js/site.angular.js"></script>
	</head>
	
	<body>
		<br/><br/>
		<div class="container" id="container" ng-app="uploadApp" ng-controller="uploadController">
		
			<form class="panel panel-primary" role="form" method="POST" action="./upload" enctype="multipart/form-data">	
				<div class="panel-heading">
					<h4 ng-bind="pageTitle"></h4>
				</div>
				
				<div class="panel-body">
					<div class="col-sm-6">
						<div class="input-group" id="input-group">
							<span class="input-group-btn">
								<span class="btn btn-primary btn-file" id="btn-file">
									Browse... 
									<input type="file" multiple="" name="file" id="fileUploadInput" 
										ng-model="uploadForm.fileInput" onchange="angular.element(this).scope().onFileInputChange(this)"/>
								</span>
							</span>
							<input type="text" class="form-control" readonly="" id="fileUploadTxt" ng-model="uploadForm.fileText" />
						</div>
					</div>
					<div class="col-sm-12">
						<br/>
						<input type="submit" value="Upload" id="btn-upload" class="btn btn-primary" />
						<input type="submit" value="Reset" id="btn-reset" class="btn btn-primary" ng-disabled="disableReset()" ng-click="resetAction()"/>
					</div>
				</div>
			</form>
			
			<h3 id="msg" class="text-center ${isError ? 'error-msg' : ''}">${message}</h3>
			
			<h3 id="loading-msg" class="text-center" style="display: none;">
				<img src="img/loading.gif"/>Please wait while the file is being uploaded...
			</h3>
			
			<c:if test="${totals.size() > 0}">
				<h3 id="table-header">Totals by month</h3>
				<div class="container-fluid">
					<table class="table table-striped table-hover table-primary" >
						<thead>
							<tr>
								<th>Year</th>
								<th>Month</th>
								<th><span class="pull-right">Pre-tax Total</span></th>
								<th><span class="pull-right">Tax Total</span></th>
								<th><span class="pull-right">Grand Total</span></th>
							</tr>
						</thead>
						<tbody>
							<c:forEach var="t" items="${totals}">
								<tr>
							   		<td><c:out value="${t.year}"/></td>
							   		<td><c:out value="${t.monthString}"/></td>
							   		<td><span class="pull-right"><c:out value="${t.preTaxAmountTotalString}"/></span></td>
							   		<td><span class="pull-right"><c:out value="${t.taxAmountTotalString}"/></span></td>
							   		<td><span class="pull-right"><c:out value="${t.grandTotalString}"/></span></td>
							   	</tr>
							</c:forEach>
						</tbody>
					</table>
				</div>
			</c:if>
			
		</div>
	</body>
</html>