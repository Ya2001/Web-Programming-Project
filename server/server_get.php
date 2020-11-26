<?php

//values used to connect
include("connect.inc.php");

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