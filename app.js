var express = require("express");
var app = express(),
    request = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("landing"); 
});

app.listen(8000, function(req, res) {
    console.log("Ready for some dank memes on port  " + 8000);
})