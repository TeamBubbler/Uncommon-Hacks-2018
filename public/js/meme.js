var image = new Image();
image.onload = cutImageUp;
image.crossOrigin = "Anonymous";
image.src = memeUrl;

function cutImageUp() {
    var numColsToCut = 5;
    var numRowsToCut = 4;
    var heightOfOnePiece = image.height/numRowsToCut;
    var widthOfOnePiece = image.width/numColsToCut;
    var imagePieces = [];
    for(var y = 0; y < numRowsToCut; ++y) {
        for(var x = 0; x < numColsToCut; ++x) {
            var canvas = document.createElement('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            var context = canvas.getContext('2d');
            context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }
    for(var i = 0; i < imagePieces.length; i++){
        if (i % 5 == 0) {
        var br = document.createElement('BR');
        var div = document.getElementById('img-wrapper');
        div.appendChild( br );
        }
        var slicedImage = document.createElement('img')
        slicedImage.src = imagePieces[i];
        var div = document.getElementById('img-wrapper');
        div.appendChild( slicedImage );

    };
}

var synth = new Tone.FMSynth({
    "modulationIndex" : 12.22,
    "envelope" : {
        "attack" : 0.01,
        "decay" : 0.2
    },
    "modulation" : {
        "type" : "square"
    },
    "modulationEnvelope" : {
        "attack" : 0.2,
        "decay" : 0.01
    }
}).toMaster();
