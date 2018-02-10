var express = require("express");
var app = express(),
    request = require("request"),
    bodyParser = require("body-parser"),
    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var memeUrl;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("landing"); 
});

app.post("/meme/", function(req, res) {
    var memeInput = req.body.memeinput;
    requestMeme(memeInput);
    setTimeout(function() {
        res.render("meme", {memeUrl: memeUrl});
    }, 1000);
});

app.listen(8000, function(req, res) {
    console.log("Ready for some dank memes on port  " + 8000);
})

// API STUFF
function requestMeme(memeInput) {
    var api_key = '0588d7ce8da18e8';
    var request_url = 'https://api.imgur.com/3/gallery/search/?q=' + memeInput + ' meme';
    var req = new XMLHttpRequest();
    
    req.onreadystatechange = function() { 
        if (req.readyState == 4 && req.status == 200) {
            memeUrl = processMeme(req.responseText);
        }
    }
    req.open('GET', request_url, true); // true for asynchronous     
    req.setRequestHeader('Authorization', 'Client-ID ' + api_key);
    req.send(null);
}

function processMeme(response_text) {
    if (response_text == "Not found") {
        console.log("Imgur album not found.");
    } else {
        var json = JSON.parse(response_text);
        var rand = Math.floor(Math.random() * Math.floor(4));

        if (json["data"][rand]["images"].length != 0) {
            return json["data"][rand]["images"][0]["link"];
        } else {
            return 'http://s.quickmeme.com/img/a8/a8022006b463b5ed9be5a62f1bdbac43b4f3dbd5c6b3bb44707fe5f5e26635b0.jpg';
        }
    }
}