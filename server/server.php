<?php

//making connection
include("connect.inc.php");

//selecting databse
$db = mysqli_select_db($conn, 'users_db');

//inserting into database
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
insert_or_update($conn, 1, 'asdasd', 300);
