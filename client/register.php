<?php
	$error_reg = "";
	$uname_reg = $_POST["uname_reg"];
	$pwd_reg_1 = $_POST["pwd_reg_1"];
	$pwd_reg_2 = $_POST["pwd_reg_2"];

	if(($_POST["pwd_reg_1"])!=($_POST["pwd_reg_2"]))
	{
    	$error_reg = "Oops! Password did not match! Try again.";
	}
	
	$conn = mysqli_connect("localhost", "root", "");
	$db = mysqli_select_db($conn, "test");
	$sql = "INSERT INTO `userpass` (`id`, `user`, `pass`) VALUES (NULL, '$uname_reg', '$pwd_reg_1');";
	$result = mysqli_query($conn, $sql);

	header("Location: index.html");




