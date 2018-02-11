var img = new Image();
var width;
var height;
var length = 30;
var ylength = 20;
img.src = $("#meme").attr("src");
img.onload = function() {
    width = this.width;
    height = this.height;
        for (var j = 0; j < length; j++){
        for (var i = 0; i < length; i++){
            var left = (-1 * width/length * i).toString() +"px";
            var top = (-1 * height/ylength * j).toString() +"px";
            var element = jQuery('<div/>', {
                    id: i + ""+j,
                    class: "splitImg",
                    css: {
                        "width" : Math.floor(width/length),
                        "height":Math.floor(height/ylength),
                        "background-position": left  + " " +  top,
                        "background-image" : 'url(' + img.src + ')'
                    }
                });
                element.appendTo('#wrapper');
            $("#wrapper").width(width + (length *2))
        }
	}
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


