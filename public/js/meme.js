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
setTimeout(function() {
    var colors = [];
    var images = $('img');
    for(var i = 0; i < images.length; i++) {
        var rgb = getAverageRGB(images[i]);
        colors.push(rgb);
    }
    console.log(colors);
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