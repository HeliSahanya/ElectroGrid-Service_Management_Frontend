package com; 
import java.sql.*; 

public class Inquiry { 
	
	//A common method to connect to the DB
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

	public String readInquiries() 
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
			 +"<th>Inquiry Type</th><th>Customer Type</th>"
			 +"<th>Description</th><th>Branch Code</th>"
			 +"<th>Branch Name</th><th>Address</th>"
			 + "<th>Update</th><th>Remove</th></tr>"; 
			String query = "select * from inquiry"; 
			Statement stmt = con.createStatement(); 
			ResultSet rs = stmt.executeQuery(query); 
			// iterate through the rows in the result set
			while (rs.next()) 
			{ 
				String inquiryID = Integer.toString(rs.getInt("Inquiry_id")); 
				String inquiry_type = rs.getString("inquiry_type"); 
				String customer_type = rs.getString("customer_type"); 
				String description = rs.getString("description"); 
				String branch_code = rs.getString("branch_code"); 
				String branch_name = rs.getString("branch_name"); 
				String address = rs.getString("address"); 
	 
				// Add into the html table
				output += "<tr><td>" + inquiry_type + "</td>"; 
				output += "<td>" + customer_type + "</td>"; 
				output += "<td>" + description + "</td>"; 
				output += "<td>" + branch_code + "</td>"; 
				output += "<td>" + branch_name + "</td>"; 
				output += "<td>" + address + "</td>"; 
				
				// buttons
				output += "<td><input name='buttonUpdate' type='button' value='Update' "
						+ "class='buttonUpdate btn btn-secondary' data-inquiryid='" + inquiryID + "'></td>"
						+ "<td><input name='buttonRemove' type='button' value='Remove' "
						+ "class='buttonRemove btn btn-danger' data-inquiryid='" + inquiryID + "'></td></tr>"; 
			} 
			con.close(); 
			// Complete the html table
			output += "</table>"; 
		} 
		catch (Exception e) 
		{ 
			output = "Error while reading the inquiries."; 
			System.err.println(e.getMessage()); 
		} 
		return output; 
	}

	public String insertInquiries(String inquiry_Type, String customer_Type, String desc, String branch_Code, String branch_Name, String Address) 
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
			String query = " insert into inquiry (`inquiry_id`,`inquiry_type`,`customer_type`,`description`,`branch_code`, `branch_name`, `address`)"
					+ " values (?, ?, ?, ?, ?, ?, ?)";
			PreparedStatement preparedStmt = con.prepareStatement(query); 
			// binding values
			preparedStmt.setInt(1, 0);
			preparedStmt.setString(2, inquiry_Type);
			preparedStmt.setString(3, customer_Type);
			preparedStmt.setString(4, desc);
			preparedStmt.setString(5, branch_Code);
			preparedStmt.setString(6, branch_Name);
			preparedStmt.setString(7, Address);
			
			// execute the statement
			preparedStmt.execute(); 
			con.close(); 
			String newInquires = readInquiries(); 
			output = "{\"status\":\"success\", \"data\": \"" + 
					newInquires + "\"}"; 
			}
		
			catch (Exception e) 
			{ 
				output = "{\"status\":\"error\", \"data\": \"Error while inserting the inquiries.\"}"; 
				System.err.println(e.getMessage()); 
			} 
		return output; 
	} 
		
	public String updateInquiries(String inquiry_id, String inquiry_Type, String customer_Type, String desc, String branch_Code, String branch_Name, String Address)
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
			String query = "UPDATE inquiry SET inquiry_type=?,customer_type=?,description=?,branch_code=?, branch_name=?, address=? WHERE inquiry_id=?";
			
			PreparedStatement preparedStmt = con.prepareStatement(query); 
			
			// binding values
			preparedStmt.setString(1, inquiry_Type);
			preparedStmt.setString(2, customer_Type);
			preparedStmt.setString(3, desc);
			preparedStmt.setString(4, branch_Code);
			preparedStmt.setString(5, branch_Name);
			preparedStmt.setString(6, Address);
			preparedStmt.setInt(7, Integer.parseInt(inquiry_id));
			 
			// execute the statement
			preparedStmt.execute(); 
			con.close(); 
			String newInquires = readInquiries(); 
			output = "{\"status\":\"success\", \"data\": \"" + 
					newInquires + "\"}"; 
		} 
		
		catch (Exception e) 
		{ 
			output = "{\"status\":\"error\", \"data\": \"Error while updating the inquiries.\"}"; 
			System.err.println(e.getMessage()); 
		} 
		return output; 
	} 
			
	public String deleteInquiries(String inquiry_id)
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
			String query = "delete from inquiry where inquiry_id=?";
			
			PreparedStatement preparedStmt = con.prepareStatement(query); 
			
			// binding values
			preparedStmt.setInt(1, Integer.parseInt(inquiry_id));
			
			// execute the statement
			preparedStmt.execute(); 
			con.close(); 
			String newInquires = readInquiries(); 
			output = "{\"status\":\"success\", \"data\": \"" + 
					newInquires + "\"}"; 
			} 
		
			catch (Exception e) 
			{ 
			output = "{\"status\":\"error\", \"data\": \"Error while deleting the inquiries.\"}"; 
			System.err.println(e.getMessage()); 
			} 
			return output; 
	} 
}




