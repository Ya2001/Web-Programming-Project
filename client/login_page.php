<?php
	include("../server/register.php");
	include("../server/login.php");


	// Creating connection
	$conn = mysqli_connect("localhost", "root", "");
	// Checking connection
	if (!$conn) {
	    die("Connection failed: " . mysqli_connect_error());
	}

	// Creating a database 
	$db = mysqli_query($conn, "CREATE DATABASE IF NOT EXISTS users_db");

	//selecting created db
	$select_db = mysqli_select_db($conn, 'users_db');

	//creating table with values
	$create_table = mysqli_query($conn, "CREATE TABLE IF NOT EXISTS users (
		  userID int(30) NOT NULL AUTO_INCREMENT PRIMARY KEY,
		  userName varchar(30) NOT NULL UNIQUE KEY,
		  password varchar(255) NOT NULL)");
	
	// closing connection
	mysqli_close($conn);
?>


 
<!DOCTYPE html>
<html>
	<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="login.css">
	<title>Login</title>
	</head>

	<body class="login_page">

		<div class="login">
			<h1 id="main_text">Login</h1>
			<form  method="post">
				<label for="uname"><b id="login_page_text">Username</b></label>
    			<br>
				<input class="form_field" type="text" placeholder="Username" id="uname" name="user" required>
				<br>
				<label for="pwd"><b id="login_page_text">Password</b></label>
    			<br>
				<input class="form_field" type="password" placeholder="Password" id="pwd" name="pass" required>
				<br>
				<span><?php echo $error_login; ?></span>
				<br>
				<input id="submit_login" type="submit" value="Login" name="submit_login">
				
			</form>
		</div>

		<dir class="vertical"></dir>

	<div class="register">
	    <h1 id="main_text">Register</h1>

		<form action="register.php" method="POST">
			<label for="uname"><b id="login_page_text">Username</b></label>
	    	<br>
		    <input class="form_field" id="register_uname" type="text" placeholder="Enter Username" name="uname_reg" required>

		    <br>
		    <label for="pwd"><b id="login_page_text">Password</b></label>

   		 	<br>
		    <input class="form_field" id="register_pwd_1" type="password" placeholder="Enter Password" name="pwd_reg_1" required>
		    <br>
		    <label for="pwd"><b id="login_page_text">Repeat Password</b></label>
	   		 <br>
		    <input class="form_field" id="register_pwd_2" type="password" placeholder="Repeat Password" name="pwd_reg_2" required>	
		    <br>

				<span><?php echo $error_reg; ?></span>

		    <br>
	    	<button id="submit_reg"   type="submit" name="submit_reg" >Register</button>
		</form>

 	</div>

	</body>
</html>