<?php
//build connection,get the data
session_start();
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
		//connection
		include("../server/connect.php");

		//getting the data -escaping sql injection
		$uname_reg = mysqli_real_escape_string($conn, $_POST["uname_reg"]);
		$pwd_reg_1 = $_POST["pwd_reg_1"];
		$pwd_reg_2 = $_POST["pwd_reg_2"];
		
		//selecting db
		$db = mysqli_select_db($conn, 'users_db');
		
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
		 	header("Location: index.html?register_success"); 
			mysqli_close($conn); // Closing connection
		}
		else
		{
			$error_reg = "Username already exists, please go back and try again.";
			echo $error_reg;
			//header("Location: connect.php?username_exists");
		}

	}
}