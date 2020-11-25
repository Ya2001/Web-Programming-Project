<?php


//making connection
// include("connect.inc.php");

//values used to connect
$servername = "localhost";
$username = "root";
$password = "";
$db_name = "";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $db_name);

//selecting database
$db = mysqli_select_db($conn, 'users_db');

// getting data from table 
$result = mysqli_query($conn, "SELECT * FROM `positions`"); 

// storing in array 
$data = array(); 
while ($row = mysqli_fetch_assoc($result)) {
	$data[] = $row; 
}

// returning response in JSON format
echo json_encode($data); 