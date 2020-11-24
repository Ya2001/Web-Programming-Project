<!-- http://dropguys.freecluster.eu/client/index.php? 

Inspiration/Help: 
https://github.com/f28wp/f28wp.github.io/tree/master/material/games/web-basicmmo 
https://www2.macs.hw.ac.uk/~bk42/mm0/
-->
<!-- include file with connection -->
<?php
	include("../server/connect.inc.php");
	include("login.php");
?>
<!-- start session -->
<?php
	session_start();
?>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="login.css">
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script>
		// JQuery code in here? 
	</script>
	<title>Drop Guys</title>

</head>

<body>

	<div class="controls">
		<div class="gameControls">
			<button class="startButton">start</button>
			<button class="stopButton">stop</button>
		</div>
		<div class="loginControls">
			<a href="login_page.php">
				<button id="login_button" type="submit">Login / Register</button>
			</a>
		</div>
	</div>


	<div class="game">
		<div id="obstacle">

		</div>
		<div id="character">
			<p id="playerName">
				<?php 
					if (isset($_SESSION["username"])) {
						echo $_SESSION["username"]; 
					} else {
						echo "Guest"; 
					}

					/* $sql = "SELECT * FROM `users` WHERE userID = 1"; 
					$user = mysqli_query($conn, $sql); 
					$username = $user->fetch_array()['userName'] ?? '';
					if (isset ($username)) {
						echo $username; 
					} else {
						echo "Guest"; 
					} */
				?>
			</p>
		</div>
	</div>


</body>


<script src="script.js"></script>
<!-- <script src="mobile/mobileScript.js"></script> -->
<!-- <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script> var socket = io(); </script> -->

</html>