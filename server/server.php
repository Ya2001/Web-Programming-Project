<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

// where does the data come from ? In real world this would be a SQL query or something
$data_source_file = 'test.txt';


// request has send a timestamp
$last_timestamp = isset($_GET['timestamp']) ? (int)$_GET['timestamp'] : null;
$xp = isset($_GET['xp']) ? (int)$_GET['xp'] : 0;
$yp = isset($_GET['yp']) ? (int)$_GET['yp'] : 0;
$uniqueid = isset($_GET['uniqueid']) ? (int)$_GET['uniqueid'] : 0;

// PHP caches file data, like requesting the size of a file, by default. clearstatcache() clears that cache
clearstatcache();
$curtimestamp=time();

// todo - limit access/sync - do check here
if (true)
{
	// keep trying to open the file
	// hack fix so resolve multiple clients fighting for access
	$data = false;
	while ( $data==false )
	{
		usleep(500); // add in a delay
		
		// get content of data.txt
		$data = file_get_contents($data_source_file);
	}

	$result = json_decode($data, true);
	// do some error checking for formatting issues/errors here
	
	$numusers = count($result["users"]);
	$newusers = [];
	for ($n=0; $n< $numusers; $n++ )
	{
		$delta = $result["users"][$n]["timestamp"] - $curtimestamp;
		if ( abs( $delta ) < 10 )
		{
			array_push( $newusers, $result["users"][$n] );
		}
	}
	$result["users"] = $newusers;
	
	$found = -1;
	for ($n=0; $n< $numusers; $n++ )
	{
		if ($result["users"][$n]["uniqueid"] == $uniqueid)
		{
			$found = $n;
		}
	}
	if ($found==-1)
	{
		array_push( $result["users"], [] );
		$found = count( $result["users"] ) - 1;
	}
	$result["users"][$found]["timestamp"] = $curtimestamp;
	$result["users"][$found]["uniqueid"]  = $uniqueid;
	$result["users"][$found]["xp"]        = $xp;
	$result["users"][$found]["yp"]        = $yp;
	

	file_put_contents($data_source_file, json_encode($result));
	
	// encode to JSON, render the result (for AJAX)
	$json = json_encode($result);
	echo $json;
}