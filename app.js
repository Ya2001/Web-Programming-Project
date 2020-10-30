const express = require("express");
var app = express();
app.listen(8080, () => console.log("Server on"));

<<<<<<< HEAD
app.use(express.static("client"));

=======

app.use(express.static("client"));

/* 	sorry, I still had this and I'm just finding out where I got this from,
	but needed to git pull in order to git push

app.use(express.static("client"));
app.get("/", function (reg, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use("client", express.static(__dirname + "/client"));

server.listen(8080);
console.log("Server started");

var io = require('socket.io')(server, {});
io.sockets.on('connection', function (socket) {
	console.log("Someone connected.")
}); */
>>>>>>> 382ba20b75011877c91af7d6c6e1885192c4824a
