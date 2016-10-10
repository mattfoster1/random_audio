var n;
var redPart, redPart_CS, amberPart, greenPart, main, orientation;
var total_height = [];
// var beat = Math.random() * 3000;
var beat = 80;
var amber_boundary = Math.floor((window.innerHeight * 1) / 2);
var red_boundary = Math.floor((window.innerHeight * 2) / 3);
var setup = 1;
var totalColumnWidth = 30;

var start = function() {
	setup();
	alterations();
	sizing();
	// alterations();
	main = setInterval(function(){ sizing(); }, beat); // this needs to be randomised for the beat

	if (window.innerHeight > window.innerWidth) {
		orientation = "portrait";
	} else {
		orientation = "landscape";
	}
}

var alterations = function() {
	greenPart = document.getElementsByClassName("greenPart");
	amberPart = document.getElementsByClassName("amberPart");
	redPart = document.getElementsByClassName("redPart");
}

var setup = function() {
	var totalColumns = Math.floor(window.innerWidth / totalColumnWidth);

	for (x=1; x < totalColumns; x++) {
		var newDiv = document.createElement("div");
		$(newDiv).addClass("mf_column").addClass("column" + x);
		document.getElementsByClassName("cont1")[0].appendChild(newDiv);
		
		var newChildGreen = document.createElement("div");
		$(newChildGreen).addClass("greenPart").addClass("segment");
		newDiv.appendChild(newChildGreen);

		var newChildAmber = document.createElement("div");
		$(newChildAmber).addClass("amberPart").addClass("segment");
		newDiv.appendChild(newChildAmber);

		var newChildRed = document.createElement("div");
		$(newChildRed).addClass("redPart").addClass("segment");
		newDiv.appendChild(newChildRed);
	}
}

var sizing = function() { //used to calculate height

	for (n=0; n < greenPart.length; n++) {
		if (n >= 3) { // correlates height with previous two columns' height
			var oneColBehind = parseInt(total_height[(n-1)]);
			var twoColBehind = parseInt(total_height[(n-2)]);
			var threeColBehind = parseInt(total_height[(n-3)]);
			var prev_mean = (oneColBehind + twoColBehind) / 2;
			total_height[n] = Math.floor((Math.random() + 0.5) * prev_mean); //assigns height to column
		} else if (n == 2) {
			total_height[2] = Math.floor(parseInt(total_height[0]) * (Math.random() + 0.5));
		} else if (n == 1) {
			total_height[1] = Math.floor(parseInt(total_height[0]) * (Math.random() + 0.5));
		} else { //if first column
			total_height[0] = Math.floor((Math.random() + 0.5) * (window.innerHeight/2));
		}
		$('.column' + (n+1)).height(total_height[n]);
		// colouring();
	}
}

var upTempo = function() {
	clearInterval(main);
	var tDur = $(".mf_column").css("transition-duration");
	if (parseFloat(tDur) > 0.2 && beat > 20) {
		tDur = parseFloat(tDur) - (parseFloat(tDur) /5);
		$(".mf_column").css("transition-duration", tDur + "s");
		beat = Math.floor(beat - (beat / 4));
		console.log(beat);
		console.log(tDur);
	}
	console.log("upTempo");
	main = setInterval(function(){ sizing(); }, beat); // this needs to be randomised for the beat
}

var downTempo = function() {
	clearInterval(main);
	var tDur = $(".mf_column").css("transition-duration");
	if (parseFloat(tDur)) {
		tDur = parseFloat(tDur) + (parseFloat(tDur) /5);
		$(".mf_column").css("transition-duration", tDur + "s");
		beat = Math.floor(beat + (beat / 3));
		console.log(beat);
		console.log(tDur);
	}
	console.log("downTempo");
	main = setInterval(function(){ sizing(); }, beat); // this needs to be randomised for the beat
}