// particlesJS.load('particles-js','assets/particlesjs-config.json', function() {
//   console.log('callback - particles.js config loaded');
// });
if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'hello': function() {
      alert("hello");
    },
    'search *text': searchMeme,
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}

function searchMeme(inputText) {
  $("input").val(inputText);
  $("form").submit();
}
