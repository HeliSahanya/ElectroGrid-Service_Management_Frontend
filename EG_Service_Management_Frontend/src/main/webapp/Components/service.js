$(document).ready(function() 
{ 
	if ($("#alertSuccess").text().trim() == "") 
	{ 
		$("#alertSuccess").hide(); 
	} 
	$("#alertError").hide(); 
}); 

// SAVE ============================================
//Request Service------------------------------------------------------
$(document).on("click", "#btnSave", function(event) 
{ 
	// Clear alerts---------------------
 	$("#alertSuccess").text(""); 
 	$("#alertSuccess").hide(); 
 	$("#alertError").text(""); 
 	$("#alertError").hide(); 
 	
	// Form validation-------------------
	var status = validateRequestForm(); 
	if (status != true) 
 	{ 
 		$("#alertError").text(status); 
 		$("#alertError").show(); 
 		return; 
 	} 
 	
	// If valid------------------------
	var type = ($("#hidRequestIDSave").val() == "") ? "POST" : "PUT"; 
 	$.ajax( 
 	{ 
 		url : "ServicesAPI", 
 		type : type, 
 		data : $("#formRequest").serialize(), 
 		dataType : "text", 
 		complete : function(response, status) 
 		{ 
 			onRequestSaveComplete(response.responseText, status); 
 		} 
 	}); 
 	
});

//Inquiry Service------------------------------------------------------
$(document).on("click", "#buttonSave", function(event) 
{ 
	// Clear alerts---------------------
 	$("#alertSuccess").text(""); 
 	$("#alertSuccess").hide(); 
 	$("#alertError").text(""); 
 	$("#alertError").hide(); 
 	
 	// Form validation-------------------
	var status = validateInquiryForm(); 
	if (status != true) 
 	{ 
 		$("#alertError").text(status); 
 		$("#alertError").show(); 
 		return; 
 	} 
 	
 	// If valid------------------------
	var type = ($("#hidInquiryIDSave").val() == "") ? "POST" : "PUT"; 
 	$.ajax( 
 	{ 
 		url : "InquiryAPI", 
 		type : type, 
 		data : $("#formInquiry").serialize(), 
 		dataType : "text", 
 		complete : function(response, status) 
 		{ 
 			onInquirySaveComplete(response.responseText, status); 
 		} 
 	}); 
});

// UPDATE==========================================
//Request Service------------------------------------------------------
$(document).on("click", ".btnUpdate", function(event) 
{ 
	$("#hidRequestIDSave").val($(this).data("requestid")); 
 	$("#requestType").val($(this).closest("tr").find('td:eq(0)').text()); 
 	$("#requestDesc").val($(this).closest("tr").find('td:eq(1)').text()); 
 	$("#City").val($(this).closest("tr").find('td:eq(2)').text()); 
 	$("#ZipCode").val($(this).closest("tr").find('td:eq(3)').text()); 
});

//Inquiry Service------------------------------------------------------
$(document).on("click", ".buttonUpdate", function(event) 
{ 
	$("#hidInquiryIDSave").val($(this).data("inquiryid")); 
 	$("#inquiryType").val($(this).closest("tr").find('td:eq(0)').text()); 
 	$("#customerType").val($(this).closest("tr").find('td:eq(1)').text()); 
 	$("#inquiryDesc").val($(this).closest("tr").find('td:eq(2)').text()); 
 	$("#branchCode").val($(this).closest("tr").find('td:eq(3)').text()); 
 	$("#branchName").val($(this).closest("tr").find('td:eq(4)').text()); 
 	$("#Address").val($(this).closest("tr").find('td:eq(5)').text()); 
});

// DELETE==========================================
//Request Service------------------------------------------------------
$(document).on("click", ".btnRemove", function(event) 
{ 
 	$.ajax( 
 	{ 
 		url : "ServicesAPI", 
 		type : "DELETE", 
 		data : "requestID=" + $(this).data("requestid"),
 		dataType : "text", 
 		complete : function(response, status) 
 		{ 
 			onRequestDeleteComplete(response.responseText, status); 
 		} 
 	}); 
});

//Inquiry Service------------------------------------------------------
$(document).on("click", ".buttonRemove", function(event) 
{ 
 	$.ajax( 
 	{ 
 		url : "InquiryAPI", 
 		type : "DELETE", 
 		data : "inquiryID=" + $(this).data("inquiryid"),
 		dataType : "text", 
 		complete : function(response, status) 
 		{ 
 			onInquiryDeleteComplete(response.responseText, status); 
 		} 
 	}); 
});

//Request Service------------------------------------------------------
// CLIENT-MODEL================================================================
function validateRequestForm() 
{ 
	// Type-----------------------------
	if ($("#requestType").val().trim() == "") 
 	{ 
 		return "Insert Request Type."; 
 	} 
	// Description--------------------------
	if ($("#requestDesc").val().trim() == "") 
 	{ 
	 	return "Insert Request Description."; 
 	} 
	// City-------------------------------
	if ($("#City").val().trim() == "") 
 	{ 
 		return "Insert City."; 
	} 
	// ZipCode------------------------
	if ($("#ZipCode").val().trim() == "") 
 	{ 
 		return "Insert Zip Code."; 
 	} 
	return true; 
}

function onRequestSaveComplete(response, status) 
{ 
	if (status == "success") 
 	{ 
 		var resultSet = JSON.parse(response); 
 		if (resultSet.status.trim() == "success") 
 		{ 
 			$("#alertSuccess").text("Successfully saved."); 
			$("#alertSuccess").show(); 
			$("#divRequestsGrid").html(resultSet.data); 
 		} 
 		else if (resultSet.status.trim() == "error") 
 		{ 
 			$("#alertError").text(resultSet.data); 
 			$("#alertError").show(); 
 		} 
 	}	 
 	else if (status == "error") 
 	{ 
 		$("#alertError").text("Error while saving."); 
 		$("#alertError").show(); 
 	} 
 	else
 	{ 
 		$("#alertError").text("Unknown error while saving.."); 
 		$("#alertError").show(); 
 	} 
 	$("#hidRequestIDSave").val(""); 
 	$("#formRequest")[0].reset(); 
}

function onRequestDeleteComplete(response, status) 
{ 
	if (status == "success") 
 	{ 
	 	var resultSet = JSON.parse(response); 
 		if (resultSet.status.trim() == "success") 
 		{ 
 			$("#alertSuccess").text("Successfully deleted."); 
 			$("#alertSuccess").show(); 
 			$("#divRequestsGrid").html(resultSet.data); 
 		} 
 		else if (resultSet.status.trim() == "error") 
 		{ 
 			$("#alertError").text(resultSet.data); 
 			$("#alertError").show(); 
 		} 
 	} 
 	else if (status == "error") 
 	{ 
 		$("#alertError").text("Error while deleting."); 
 		$("#alertError").show(); 
 	} 
 	else
 	{ 
 		$("#alertError").text("Unknown error while deleting.."); 
 		$("#alertError").show(); 
 	} 
}
 // Inquiry Service ------------------------------------------------------------------
 // CLIENT-MODEL================================================================
function validateInquiryForm() 
{ 
	// Type-----------------------------
	if ($("#inquiryType").val().trim() == "") 
 	{ 
 		return "Insert Inquiry Type."; 
 	} 
	// Customer Type--------------------------
	if ($("#customerType").val().trim() == "") 
 	{ 
	 	return "Insert Customer Type."; 
 	} 
	// Description-------------------------------
	if ($("#inquiryDesc").val().trim() == "") 
 	{ 
 		return "Insert Description."; 
	} 
	// Branch Code------------------------
	if ($("#branchCode").val().trim() == "") 
 	{ 
 		return "Insert Branch Code."; 
 	} 
 	// Branch Name------------------------
	if ($("#branchName").val().trim() == "") 
 	{ 
 		return "Insert Branch Name."; 
 	} 
 	// Address------------------------
	if ($("#Address").val().trim() == "") 
 	{ 
 		return "Insert Address."; 
 	} 
	return true; 
}
 
function onInquirySaveComplete(response, status) 
{ 
	if (status == "success") 
 	{ 
 		var resultSet = JSON.paras(response); 
 		if (resultSet.status.trim() == "success") 
 		{ 
 			$("#alertSuccess").text("Successfully saved."); 
			$("#alertSuccess").show(); 
			$("#divInquiriesGrid").html(resultSet.data); 
 		} 
 		else if (resultSet.status.trim() == "error") 
 		{ 
 			$("#alertError").text(resultSet.data); 
 			$("#alertError").show(); 
 		} 
 	}	 
 	else if (status == "error") 
 	{ 
 		$("#alertError").text("Error while saving."); 
 		$("#alertError").show(); 
 	} 
 	else
 	{ 
 		$("#alertError").text("Unknown error while saving.."); 
 		$("#alertError").show(); 
 	} 
 	$("#divInquiriesGrid").val(""); 
 	$("#formInquiry")[0].reset(); 
}

function onInquiryDeleteComplete(response, status) 
{ 
	if (status == "success") 
 	{ 
	 	var resultSet = JSON.paras(response); 
 		if (resultSet.status.trim() == "success") 
 		{ 
 			$("#alertSuccess").text("Successfully deleted."); 
 			$("#alertSuccess").show(); 
 			$("#divInquiriesGrid").html(resultSet.data); 
 		} 
 		else if (resultSet.status.trim() == "error") 
 		{ 
 			$("#alertError").text(resultSet.data); 
 			$("#alertError").show(); 
 		} 
 	} 
 	else if (status == "error") 
 	{ 
 		$("#alertError").text("Error while deleting."); 
 		$("#alertError").show(); 
 	} 
 	else
 	{ 
 		$("#alertError").text("Unknown error while deleting.."); 
 		$("#alertError").show(); 
 	} 
}