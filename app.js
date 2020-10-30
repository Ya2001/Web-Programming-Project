const express = require("express");
var app = express();
app.listen(8080, () => console.log("Server on"));

app.use(express.static("client"));

