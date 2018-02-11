var image = new Image();
image.onload = cutImageUp;
image.crossOrigin = "Anonymous";
image.src = memeUrl;

function cutImageUp() {
    var numColsToCut = 7;
    var numRowsToCut = 7;
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
        if (i % numColsToCut == 0) {
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

setTimeout(function() {
    var colors = [];
    var images = $('img');
    for(var i = 0; i < images.length; i++) {
        var rgb = getAverageRGB(images[i]);
        colors.push(rgb);
    }
    console.log(colors);
    for(var i = 0; i < colors.length; i++) {
        synth.triggerAttackRelease(getNote(colors[i].r), 0.1, i*0.2 + 3);
    }
}, 1000);
//paletteArray = createPalette(myImage, 10); // 2nd argument sets # of colors in palette

function getAverageRGB(imgEl) {
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;
        
    if (!context) {
        return defaultRGB;
    }
    
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
    context.drawImage(imgEl, 0, 0);
    
    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }
    
    length = data.data.length;
    
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
    
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    
    return rgb;
}

function getNote(colVal) {
    var notes = {
        0: 'Ab1',
        1: 'A1',
        2: 'Bb1',
        3: 'B1',
        4: 'C1',
        5: 'Db1',
        6: 'D1',
        7: 'Eb1',
        8: 'E1',
        9: 'F1',
        10: 'Gb1',
        11: 'G1',
        12: 'Ab2',
        13: 'A2',
        14: 'Bb2',
        15: 'B2',
        16: 'C2',
        17: 'Db2',
        18: 'D2',
        19: 'Eb2',
        20: 'E2',
        21: 'F2',
        22: 'Gb2',
        23: 'G2',
        24: 'Ab3',
        25: 'A3',
        26: 'Bb3',
        27: 'B3',
        28: 'C3',
        29: 'Db3',
        30: 'D3',
        31: 'Eb3',
        32: 'E3',
        33: 'F3',
        34: 'Gb3',
        35: 'G3',
        36: 'Ab4',
        37: 'A4',
        38: 'Bb4',
        39: 'B4',
        40: 'C4',
        41: 'Db4',
        42: 'D4',
        43: 'Eb4',
        44: 'E4',
        45: 'F4',
        46: 'Gb4',
        47: 'G4',
        48: 'Ab5',
        49: 'A5',
        50: 'Bb5',
        51: 'B5',
        52: 'C5',
        53: 'Db5',
        54: 'D5',
        55: 'Eb5',
        56: 'E5',
        57: 'F5',
        58: 'Gb5',
        59: 'G5',
        60: 'Ab6',
        61: 'A6',
        62: 'Bb6',
        63: 'B6',
        64: 'C6',
        65: 'Db6',
        66: 'D6',
        67: 'Eb6',
        68: 'E6',
        69: 'F6',
        70: 'Gb6',
        71: 'G6',
        72: 'Ab7',
        73: 'A7',
        74: 'Bb7',
        75: 'B7',
        76: 'C7',
        77: 'Db7',
        78: 'D7',
        79: 'Eb7',
        80: 'E7',
        81: 'F7',
        82: 'Gb7',
        83: 'G7',
    }
    return notes[Math.floor((colVal/256)*84)];
}