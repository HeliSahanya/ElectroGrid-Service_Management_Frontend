package com; 
import java.sql.*; 

public class Request { 
	private Connection connect()
	{
		Connection con = null;
			
		try
		{
			Class.forName("com.mysql.jdbc.Driver");
			//Provide the correct details: DBServer/DBName, username, password
			con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/service_management_db", "root", "");
		}
			
		catch (Exception e)
		{
			e.printStackTrace();
		}
			
		return con;
	}
	
	//read Requests
	public String readRequests() 
	{ 
		String output = ""; 
		try
		{ 
			Connection con = connect(); 
			if (con == null) 
			{ 
				return "Error while connecting to the database for reading."; 
			} 
			// Prepare the html table to be displayed
			output = "<table border='1'><tr>" 
			 +"<th>Service Type</th><th>Description</th>"
			 +"<th>city</th><th>Zip Code</th>"
			 + "<th>Update</th><th>Remove</th></tr>"; 
			String query = "select * from request"; 
			Statement stmt = con.createStatement(); 
			ResultSet rs = stmt.executeQuery(query); 
			// iterate through the rows in the result set
			while (rs.next()) 
			{ 
				String requestID = Integer.toString(rs.getInt("request_id")); 
				String service_type = rs.getString("service_type"); 
				String description = rs.getString("description"); 
				String city = rs.getString("city"); 
				String zip_code = rs.getString("zip_code");  
	 
				// Add into the html table
				output += "<tr><td>" + service_type + "</td>"; 
				output += "<td>" + description + "</td>"; 
				output += "<td>" + city + "</td>"; 
				output += "<td>" + zip_code + "</td>"; 
				
				// buttons
				output += "<td><input name='btnUpdate' type='button' value='Update' "
						+ "class='btnUpdate btn btn-secondary' data-requestid='" + requestID + "'></td>"
						+ "<td><input name='btnRemove' type='button' value='Remove' "
						+ "class='btnRemove btn btn-danger' data-requestid='" + requestID + "'></td></tr>"; 
			} 
			con.close(); 
			// Complete the html table
			output += "</table>"; 
		} 
		catch (Exception e) 
		{ 
			output = "Error while reading the requests."; 
			System.err.println(e.getMessage()); 
		} 
		return output; 
	}
	
	//Insert inquiry to DB table
	public String insertRequests(String service_Type, String desc, String city, String zip_code)
	{
		String output = "";
		try 
		{
			Connection con = connect();
					
			if (con == null)
			{
				return "Error while connecting to the database for inserting."; 
			}
					
			// create a prepared statement
			String query = " insert into request (`request_id`,`service_type`,`description`,`city`,`zip_code`)"
								+ " values (?, ?, ?, ?, ?)";
					
			PreparedStatement preparedStmt = con.prepareStatement(query);
					
			// binding values
			preparedStmt.setInt(1, 0);
			preparedStmt.setString(2, service_Type);
			preparedStmt.setString(3, desc);
			preparedStmt.setString(4, city);
			preparedStmt.setString(5, zip_code);
			
			// execute the statement
			preparedStmt.execute();
			con.close();
			String newRequests = readRequests(); 
			output = "{\"status\":\"success\", \"data\": \"" + newRequests + "\"}"; 	
		}
				
		catch (Exception e)
		{
			output = "{\"status\":\"error\", \"data\": \"Error while inserting the requests.\"}"; 
			System.err.println(e.getMessage());  
		}
				
		return output;
	}
		
	//Update inquiry details
	public String updateRequests(String request_id, String service_Type,String desc, String city, String zip_code) 
	{
		String output = "";
			
		try
		{
			Connection con = connect();
				
			if (con == null)
			{
				return "Error while connecting to the database for updating."; 
			}
				
			// create a prepared statement
			String query = "UPDATE request SET service_type=?,description=?, city=?, zip_code=? WHERE request_id=?";
				
			PreparedStatement preparedStmt = con.prepareStatement(query);
				
			// binding values
			preparedStmt.setString(1, service_Type);
			preparedStmt.setString(2, desc);
			preparedStmt.setString(3, city);
			preparedStmt.setString(4, zip_code);
			preparedStmt.setInt(5, Integer.parseInt(request_id));
				
			// execute the statement
			preparedStmt.execute();
			con.close();
			String newRequests = readRequests(); 
			output = "{\"status\":\"success\", \"data\": \"" + newRequests + "\"}"; 
		}
			
		catch (Exception e)
		{
			output = "{\"status\":\"error\", \"data\": \"Error while updating the requests.\"}"; 
			System.err.println(e.getMessage()); 
		}
			
		return output;
	}
		
	//delete request details
	public String deleteRequests(String request_id)
	{
		String output = "";
			
		try
		{
			Connection con = connect();
				
			if (con == null)
			{
				return "Error while connecting to the database for deleting."; 
			}
				
			// create a prepared statement
			String query = "delete from request where request_id=?";
				
			PreparedStatement preparedStmt = con.prepareStatement(query);
				
			// binding values
			preparedStmt.setInt(1, Integer.parseInt(request_id));
				
			// execute the statement
			preparedStmt.execute();
			con.close();
			String newRequests = readRequests(); 
			output = "{\"status\":\"success\", \"data\": \"" + newRequests + "\"}";
		}
			
		catch (Exception e)
		{
			output = "{\"status\":\"error\", \"data\": \"Error while deleting the requests.\"}"; 
			System.err.println(e.getMessage()); 
		}
			
		return output;
	}
	
}
