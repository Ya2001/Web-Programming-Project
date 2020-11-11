<?php
$error_login=''; //Variable to Store error message;
if(isset($_POST['submit_login']))
	{
 		if(empty($_POST['user']) || empty($_POST['pass'])){
 		$error_login = "Username or Password is Invalid";
 	}
 else
 	{
	 //Define $user and $pass
	 $user=$_POST['user'];
	 $pass=$_POST['pass'];


	 //Establishing Connection with server by passing server_name, user_id and pass as a patameter
	 $conn = mysqli_connect("localhost", "root", "");
	 //Selecting Database
	 $db = mysqli_select_db($conn, "users_db");
	 //sql query to fetch information of registerd user and finds user match.

	 //getting the hashed password from the database
 	 $hashed_query = mysqli_query($conn, "SELECT * FROM users WHERE  userName='$user'");
 	 $result = mysqli_fetch_assoc($hashed_query);
 	 $pwd_hash = $result['password'];

 	$query = mysqli_query($conn, "SELECT * FROM users WHERE password = '$pwd_hash' AND userName='$user'");





	 $rows = mysqli_num_rows($query);
	 if($rows == 1)
	 	{
	 	header("Location: index.html"); // Redirecting to other page
	 	}
	 else
		 {
		 	$error_login = "Username or Password is Invalid";
		 }
	 mysqli_close($conn); // Closing connection
	}
}

?>