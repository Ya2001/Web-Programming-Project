<?php

include("connect.inc.php");

// $_POST gives you the JSON object sent by script.js
//$user_id = $_POST['userID']; 
$user_name = $_POST['userName']; 
$player_pos = $_POST['player_position']; 

/* echo gettype($user_id);
echo gettype($user_name); 
echo gettype($player_pos);  */
/* echo $user_id; 
echo $user_name; 
echo $player_pos;  */

// echo json_last_error_msg(); 

insert_or_update($conn, $user_name, $player_pos); 

//inserting into database
function insert($conn, $user_name, $player_pos) 
{
  $sql = "INSERT INTO positions ( userName, player_position) 
						VALUES ( '$user_name', '$player_pos');";
  mysqli_query($conn, $sql);
}	

//updating values
function update($conn, $user_name, $player_pos)
{
	$sql = "UPDATE positions SET player_position= '$player_pos' WHERE userName = '$user_name'";
	mysqli_query($conn, $sql);
}

//if user with the unique id is in the database just update, otherwise insert
function insert_or_update($conn, $user_name, $player_pos)
{
	if(update($conn, $user_name, $player_pos))
	{
		echo "Updated";
	}
	else
	{
		insert($conn, $user_name, $player_pos);
		echo "Inserted"; 
	}
}
