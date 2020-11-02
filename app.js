const express = require("express");
const Datastore = require("nedb");
const bcrypt = require('bcryptjs');

var app = express();
app.listen(8080, () => console.log("Server on"));

//dependencies
app.use(express.static("client"));



//max data receivable is 1mb (anti ddos)
app.use(express.json({limit: "1mb"}));

//database
const database = new Datastore("database.db");
database.loadDatabase();

//get data between clients (usernames, scores)
app.get("/server", (request, response) => {
	database.find({}, (err, data) => {
		if (err)
		{
			response.end();
			return;
		}
		var x = response.json(data);
		//console.log(x);
	});
});

//make can get requests
app.post('/server', (request, response) => {
	console.log("User authenticated.");
	const data = request.body;
	data.pwd = bcrypt.hashSync(data.pwd, 2);
	//const verified = bcrypt.compareSync('Pa$$w0rd', passwordHash);
	database.insert(data);
	console.log(data);
});

