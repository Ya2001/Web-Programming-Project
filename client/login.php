<?php
$error_login=''; //Variable to Store error message;
if(isset($_POST['submit_login']))
	{
 		if(empty($_POST['user']) || empty($_POST['pass']))
		{
 			$error_login = "Username or Password is Invalid";
 		}
 else
 	{
		include("../server/connect.php");

		 //get the data - escape sql injection
		 $user= mysqli_real_escape_string($conn, $_POST["user"]);
		 $pass= $_POST["pass"];


		 //Selecting Database
		 $db = mysqli_select_db($conn, "users_db");
		 //sql query to fetch information of registerd user and finds user match.

		 //getting the hashed password from the database
	 	 $hashed_query = mysqli_query($conn, "SELECT * FROM users WHERE  userName='$user'");

	 	 $result = mysqli_fetch_assoc($hashed_query);
	 	 $pwd_hash = $result['password'];

	 	 //if password is correct, get number of results
		 if(password_verify($pass, $pwd_hash))
		 {
		 	$rows = mysqli_num_rows($hashed_query);
		 }

		 if($rows == 1)
		 	{
		 		//starting the session and setting global username to last username given
		 		session_start();
		 		$_SESSION["username"] = $user;
				header("Location: index.html?login_success");
		 	}
		 else
			 {
			 	$error_login = "Username or Password is Invalid";
			 }
		 mysqli_close($conn); // Closing connection
		 
	}
}