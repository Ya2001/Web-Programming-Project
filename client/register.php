<?php
//build connection,get the data
$error_reg = "";

if(isset($_POST['submit_reg']))
	{
		if($_POST['pwd_reg_2'] !== $_POST['pwd_reg_1'])
		{
			$error_reg = "Passwords did not match, please go back and try again.";
			echo $error_reg;
		}

	else
 	{
		
		$conn = mysqli_connect("sql206.epizy.com", "epiz_27210625", "p4yIUYOs08FQo8", "epiz_27210625_users_db");
		// Check connection
		if (!$conn) 
		{
	  		die("Connection failed: " . mysqli_connect_error());
		}

		//getting the data -escaping sql injection
		$uname_reg = mysqli_real_escape_string($conn, $_POST["uname_reg"]);
		$pwd_reg_1 = $_POST["pwd_reg_1"];
		$pwd_reg_2 = $_POST["pwd_reg_2"];

		//left to do:
		//1. Password mathing
		//2. Unique usernames
		//3. if signed in change button to logout
		//4. creating the database localy if I have to??
		//5. if logout clicked do -- ??
		//6. move files
		
		//selecting db
		
		
		//hashing the input password
		$hashed_pwd = password_hash($pwd_reg_1, PASSWORD_DEFAULT);

		//adding the hashed password and the username to the database
		$query = mysqli_query($conn, "INSERT INTO users (userID, userName, password) 
										VALUES (NULL, '$uname_reg', '$hashed_pwd');");

		//getting affected rows, as username is set to unique in database,
		//if an existing username if registered there is no change in the database
		$affected = mysqli_affected_rows($conn);
		if ($affected > 0 )
		{
			//Forwarding to main page
		 	header("Location: index.html?succes_register"); 
			mysqli_close($conn); // Closing connection
		}
		else
		{
			$error_reg = "Username already exists";
			echo $error_reg;
			//header("Location: login_page.php?username_exists");
		}

	}
}