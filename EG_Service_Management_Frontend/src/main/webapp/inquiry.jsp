<%@page import="com.Inquiry"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%
if (request.getParameter("inquiryType") != null) 
{ 
	Inquiry inqObj = new Inquiry(); 
	String stsMsg = ""; 
	
	//Insert--------------------------
	if (request.getParameter("hidInquiryIDSave") == "") 
	{
		stsMsg = inqObj.insertInquiries(request.getParameter("inquiryType"), 
				request.getParameter("customerType"), 
				request.getParameter("inquiryDesc"), 
				request.getParameter("branchCode"),
				request.getParameter("branchName"),
				request.getParameter("Address")); 
	} 
	else//Update----------------------
	{
		stsMsg = inqObj.updateInquiries(request.getParameter("hidInquiryIDSave"), 
				request.getParameter("inquiryType"), 
				request.getParameter("customerType"), 
				request.getParameter("inquiryDesc"), 
				request.getParameter("branchCode"),
				request.getParameter("branchName"),
				request.getParameter("Address")); 
	} 
	session.setAttribute("statusMsg", stsMsg); 
} 

//Delete-----------------------------
if (request.getParameter("hidInquiryIDSave") != null) 
{ 
	Inquiry inqObj = new Inquiry(); 
	String stsMsg = inqObj.deleteInquiries(request.getParameter("hidInquiryIDDelete")); 
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
				<h1>Service Management</h1>
				<h2>Inquiry Management</h2>
	
				<form id="formInquiry" name="formInquiry">
		 			Inquiry Type: 
		 			<input id="inquiryType" name="inquiryType" type="text" 
		 			class="form-control form-control-sm">
		 			<br> 
		 		
		 			Customer Type: 
		 			<input id="customerType" name="customerType" type="text" 
		 			class="form-control form-control-sm">
		 			<br> 
		 		
		 			Description: 
		 			<input id="inquiryDesc" name="inquiryDesc" type="text" 
		 			class="form-control form-control-sm">
		 			<br> 
		 		
			 		Branch Code: 
			 		<input id="branchCode" name="branchCode" type="text" 
			 		class="form-control form-control-sm">
			 		<br>
			 		
			 		Branch Name: 
			 		<input id="branchName" name="branchName" type="text" 
			 		class="form-control form-control-sm">
			 		<br>
			 		
			 		Address: 
			 		<input id="Address" name="Address" type="text" 
			 		class="form-control form-control-sm">
			 		<br>
			 		
			 		<input id="buttonSave" name="buttonSave" type="button" value="Save" 
			 		class="btn btn-primary">
			 		
			 		<input type="hidden" id="hidInquiryIDSave" 
			 		name="hidInquiryIDSave" value="">
				</form>
	
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divInquiriesGrid">
				<%
					Inquiry inqObj = new Inquiry(); 
			 		out.print(inqObj.readInquiries()); 
				%>
				</div>
			</div> 
		</div> 
	</div> 
</body>
</html>