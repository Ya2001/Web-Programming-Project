<?php
	$error_reg = "";
	//build connection,get the data
	$conn = mysqli_connect("localhost", "root", "");
	
	// Check connection
	if (!$conn) 
	{
  		die("Connection failed: " . mysqli_connect_error());
	}

	//escape sql injection
	$uname_reg = $_POST["uname_reg"];
	$pwd_reg_1 = $_POST["pwd_reg_1"];
	$pwd_reg_2 = $_POST["pwd_reg_2"];

	//left to do:
	//1. Password mathing
	//2. Unique usernames
	//3. if signed in change button to logout
	//4. creating the database localy if I have to??
	//5. if logout clicked do -- ??
	
	//selecting db
	$db = mysqli_select_db($conn, 'users_db');
	
	//hashing the input password
	$hashed_pwd = password_hash($pwd_reg_1, PASSWORD_BCRYPT);

	//adding the hashed password and the username to the database
	$query = mysqli_query($conn, "INSERT INTO users (userID, userName, password) 
		VALUES (NULL, '$uname_reg', '$hashed_pwd');");

	//Forwarding to main page
 	header("Location: index.html"); 

	mysqli_close($conn); // Closing connection




