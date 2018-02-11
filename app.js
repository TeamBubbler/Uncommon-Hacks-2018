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

// function requestMeme(memeInput) {
//     const GoogleImages = require('google-images');
 
//     const client = new GoogleImages('014316724742280594798:nfjy14mes6c', 'AIzaSyC0Zdeyc2_4_O3v48CgT1bVnHkfQzt6AJc');
    
//     client.search(memeInput + " meme")
//         .then(images => {
//             var rand = Math.floor(Math.random() * Math.floor(images.length));
//             memeUrl = images[rand]["url"];
//             console.log("rand = " + rand + "\n" + "memeUrl = " + memeUrl);
//         });
// }

function requestMeme(memeInput) {
    memeUrl = "http://i0.kym-cdn.com/photos/images/facebook/001/217/729/f9a.jpg";
}