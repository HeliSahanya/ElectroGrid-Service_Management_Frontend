<%@page import="com.Request"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%
if (request.getParameter("requestType") != null) 
{ 
	Request reqObj = new Request(); 
	String stsMsg = ""; 
	
	//Insert--------------------------
	if (request.getParameter("hidRequestIDSave") == "") 
	{
		stsMsg = reqObj.insertRequests(request.getParameter("requestType"), 
				request.getParameter("requestDesc"), 
				request.getParameter("City"), 
				request.getParameter("ZipCode")); 
	} 
	else//Update----------------------
	{
		stsMsg = reqObj.updateRequests(request.getParameter("hidRequestIDSave"), 
				request.getParameter("requestType"), 
				request.getParameter("requestDesc"), 
				request.getParameter("City"), 
				request.getParameter("ZipCode")); 
	} 
	session.setAttribute("statusMsg", stsMsg); 
} 

//Delete-----------------------------
if (request.getParameter("hidRequestIDSave") != null) 
{ 
	Request reqObj = new Request(); 
	String stsMsg = reqObj.deleteRequests(request.getParameter("hidRequestIDDelete")); 
	session.setAttribute("statusMsg", stsMsg); 
}
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Service Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/service.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-6"> 
				<h1>Request and Inquiry Management</h1>
	
				<form id="formRequest" name="formRequest">
		 			Service Type: 
		 			<input id="requestType" name="requestType" type="text" 
		 			class="form-control form-control-sm">
		 			<br> 
		 		
		 			Description: 
		 			<input id="requestDesc" name="requestDesc" type="text" 
		 			class="form-control form-control-sm">
		 			<br> 
		 		
		 			City: 
		 			<input id="City" name="City" type="text" 
		 			class="form-control form-control-sm">
		 			<br> 
		 		
			 		Zip-Code: 
			 		<input id="ZipCode" name="ZipCode" type="text" 
			 		class="form-control form-control-sm">
			 		<br>
			 		
			 		<input id="btnSave" name="btnSave" type="button" value="Save" 
			 		class="btn btn-primary">
			 		
			 		<input type="hidden" id="hidRequestIDSave" 
			 		name="hidRequestIDSave" value="">
				</form>
	
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divRequestsGrid">
				<%
					Request reqObj = new Request(); 
			 		out.print(reqObj.readRequests()); 
			 		
			 		
				%>
				</div>
			</div> 
		</div> 
	</div> 
</body>
</html>