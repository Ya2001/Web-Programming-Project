<?php
//build connection,get the data
$error = "";
session_start();

if(isset($_POST['submit_reg']))
	{
		if($_POST['pwd_reg_2'] !== $_POST['pwd_reg_1'])
		{
			$error = "pwd";
			header("Location: error.php");
		}

	else
 	{
		//connection
		include("../server/connect.inc.php");

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
			header("Location: index.php?register_success");
			// setting global username to last username given
			$_SESSION["username"] = $uname_reg;  
			mysqli_close($conn); // Closing connection
		}
		else
		{
			$error = "uname";
			header("Location: error.php");
		}

	}
}