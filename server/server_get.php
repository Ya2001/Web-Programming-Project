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

/* //inserting into database
function insert($conn, $user_id, $user_name, $player_pos) 
{
  $sql = "INSERT INTO positions (userID, userName, player_position) 
						VALUES ('$user_id', '$user_name', '$player_pos');";
  mysqli_query($conn, $sql);
}
//updating values
function update($conn, $user_id, $user_name, $player_pos)
{
	$sql = "UPDATE positions SET player_position= '$player_pos' WHERE userID = '$user_id'";
	mysqli_query($conn, $sql);
}
//if user with the unique id is in the database just update, otherwise insert
function insert_or_update($conn, $user_id, $user_name, $player_pos)
{
	if(update($conn, $user_id, $user_name, $player_pos))
	{
		echo "Updated";
	}
	else
	{
		insert($conn, $user_id, $user_name, $player_pos);
	}
}
//calling function
insert_or_update($conn, 1, 'asdasd', 300); */