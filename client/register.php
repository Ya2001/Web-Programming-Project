<?php
	$error_reg = "";
	//build connection,get the data
	$conn = mysqli_connect("localhost", "root", "");

	//escape sql injection
	$uname_reg = mysqli_real_escape_string($conn, $_POST["uname_reg"]);
	$pwd_reg_1 = mysqli_real_escape_string($conn, $_POST["pwd_reg_1"]);
	$pwd_reg_2 = mysqli_real_escape_string($conn, $_POST["pwd_reg_2"]);

	//left to do:
	//1. Password mathing
	//2. Unique usernames
	//3. if signed in change button to logout
	//4. if logout clicked do -- ??
	
	
	$db = mysqli_select_db($conn, 'users_db');
	
	$hashed_pwd = password_hash(pwd_reg_1, PASSWORD_DEFAULT);

	$sql = "INSERT INTO users (userID, userName, password) VALUES (NULL, '$uname_reg', '$hashed_pwd');";
	mysqli_query($conn, $sql);

	header("Location: index.html");




