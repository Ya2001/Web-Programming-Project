<?php

include("connect.inc.php");

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

<<<<<<< HEAD
 

$json = $_POST;
echo "<pre>";
    print_r($json);
echo "</pre>";
=======
// $_POST gives you the JSON object sent by script.js
$json = $_POST; 
// however, json_decode() gives an error
// $data = json_decode($json, true); 
echo "<pre>";
    print_r($json);
echo "</pre>"; 

/* $json = file_get_contents('php://input');
var_dump($json);

>>>>>>> 8e460a74b4ff595a4e674910aa733fe16afbc6fc
//echo json_last_error_msg();

//calling function
//insert_or_update($conn, $data["userID"], $data["userName"], $data["player_position"]); */