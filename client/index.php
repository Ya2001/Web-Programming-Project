<!-- http://dropguys.freecluster.eu/client/index.php? 

Inspiration/Help: 
https://github.com/f28wp/f28wp.github.io/tree/master/material/games/web-basicmmo 
https://www2.macs.hw.ac.uk/~bk42/mm0/
-->
<!-- include file with connection -->
<?php
	include("../server/connect.php");
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
	<div class="alert alert-success alert-dismissible" id="success" style="display:none;">
	  	<a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>
	</div>


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
		<!-- obstacle div -->
		<div id="obstacle"></div>
		
		<!-- div for all players --> 
		<div id="players">
			<div id="0" class="character">
				<p id="playerName">
					<?php 
						if (isset($_SESSION["username"])) {
							echo $_SESSION["username"]; 
						} else {
							echo "Guest"; 
						}
					?>
				</p>
			</div>
		</div>
			
	</div>


</body>


<script src="script.js"></script>
<!-- <script src="mobile/mobileScript.js"></script> -->
<!-- <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script> var socket = io(); </script> -->

</html>