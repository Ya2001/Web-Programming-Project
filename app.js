const express = require("express");
var app = express();
app.listen(8080, () => console.log("Server on"));

//dependencies
app.use(express.static("client"));

//max data receivable is 1mb (anti ddos)
app.use(express.json({limit: "1mb"}));

//make can get requests
app.post('/server', (request, response) => {
	console.log("User authenticated.")
	console.log(request.body);
	response.json({
		status: "success",
		username: request.body.uname,
		password: request.body.pwd
	});
});