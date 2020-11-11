const express = require("express");
const Datastore = require("nedb");
const bcrypt = require('bcryptjs');

var app = express();
app.listen(8080, () => console.log("Server on"));

//dependencies
app.use(express.static("client"));

//max data receivable is 1mb (anti ddos)
app.use(express.json({limit: "1mb"}));