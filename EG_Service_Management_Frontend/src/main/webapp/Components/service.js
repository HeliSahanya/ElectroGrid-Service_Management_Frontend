$(document).ready(function() 
{ 
	if ($("#alertSuccess").text().trim() == "") 
	{ 
		$("#alertSuccess").hide(); 
	} 
	$("#alertError").hide(); 
}); 

// SAVE ============================================
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

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
	$("#hidRequestIDSave").val($(this).data("request_id")); 
 	$("#requestType").val($(this).closest("tr").find('td:eq(0)').text()); 
 	$("#requestDesc").val($(this).closest("tr").find('td:eq(1)').text()); 
 	$("#City").val($(this).closest("tr").find('td:eq(2)').text()); 
 	$("#ZipCode").val($(this).closest("tr").find('td:eq(3)').text()); 
});

// DELETE==========================================
$(document).on("click", ".btnRemove", function(event) 
{ 
 	$.ajax( 
 	{ 
 		url : "ServiceAPI", 
 		type : "DELETE", 
 		data : "request_id=" + $(this).data("request_id"),
 		dataType : "text", 
 		complete : function(response, status) 
 		{ 
 			onRequestDeleteComplete(response.responseText, status); 
 		} 
 	}); 
});

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