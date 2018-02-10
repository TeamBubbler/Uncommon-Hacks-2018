var api_key = '0588d7ce8da18e8';
function requestAlbum() {
  var req = new XMLHttpRequest();
  
  req.onreadystatechange = function() { 
     if (req.readyState == 4 && req.status == 200) {
       processRequest(req.responseText);
     } else {
       console.log("Error with Imgur Request.");
     }
  }
  req.open('GET', request_url, true); // true for asynchronous     
  req.setRequestHeader('Authorization', 'Client-ID ' + api_key);
}
function processRequest(response_text) {
  if (response_text == "Not found") {
    console.log("Imgur album not found.");
  } else {
    console.log(response_text);
    // You got your response back!
    // Do your thing here.
  }
}
requestAlbum();