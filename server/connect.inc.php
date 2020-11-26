<?php
	//values used to connect
	$servername = "sql206.epizy.com";
	$username = "epiz_27210625";
	$password = "p4yIUYOs08FQo8";
	$db_name = "epiz_27210625_users_db";

	// Create connection
	$conn = mysqli_connect($servername, $username, $password, $db_name);

	// Check connection
	if (!$conn) 	
	{
		die("Connection failed: " . mysqli_connect_error());
	}
	//echo "Connected successfully";

	// Creating a database 
	$db = mysqli_query($conn, "CREATE DATABASE IF NOT EXISTS epiz_27210625_users_db");

	//selecting created db
	$select_db = mysqli_select_db($conn, 'users_db');

	//creating table with values
	$create_table = mysqli_query($conn, "CREATE TABLE IF NOT EXISTS users (
		  userID int(30) NOT NULL AUTO_INCREMENT PRIMARY KEY,
		  userName varchar(30) NOT NULL UNIQUE KEY,
		  password varchar(255) NOT NULL)");
	
	$create_table_positions = mysqli_query($conn, "CREATE TABLE IF NOT EXISTS positions (
	  userName varchar(30) NOT NULL PRIMARY KEY,
	  player_position int(255) NOT NULL)");
	


?>