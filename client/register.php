<?php
	$error_reg = "";
	$uname_reg = $_POST["uname_reg"];
	$pwd_reg_1 = $_POST["pwd_reg_1"];
	$pwd_reg_2 = $_POST["pwd_reg_2"];

	if(($_POST["pwd_reg_1"])!=($_POST["pwd_reg_2"]))
	{
    	$error_reg = "Oops! Password did not match! Try again.";
	}
	
	$conn = mysqli_connect("localhost", "root", "");
	$db = mysqli_select_db($conn, 'users_db');
	
	$hashed_pwd = password_hash(pwd_reg_1, PASSWORD_DEFAULT);

	$sql = "INSERT INTO users (userID, userName, password) VALUES (NULL, '$uname_reg', '$hashed_pwd');";
	$result = mysqli_query($conn, $sql);

	header("Location: index.html");




