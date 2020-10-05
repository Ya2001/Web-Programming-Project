var express = require("express");
var app = express();
var server = require('http').Server(app);

app.get("/", function (reg, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use("client", express.static(__dirname + "/client"));

server.listen(8080);
console.log("Server started");

var io = require('socket.io')(server, {});
io.sockets.on('connection', function (socket) {
	console.log("Someone connected.")
});