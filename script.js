var n;
var redPart, redPart_CS, amberPart, greenPart, main, orientation;
var total_height = [];
// var beat = Math.random() * 3000;
var beat = 1000;
var amber_boundary = Math.floor((window.innerHeight * 1) / 2);
var red_boundary = Math.floor((window.innerHeight * 2) / 3);
var setup = 1;

var start = function() {
	alterations();
	sizing();
	// alterations();
	// main = setInterval(function(){ sizing(); }, beat); // this needs to be randomised for the beat

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

var sizing = function() { //used to calculate height
	for (n=0; n < 12; n++) {

		if (n >= 2) { // correlates height with previous two columns' height
			var oneColBehind = parseInt(total_height[(n-1)]);
			var twoColBehind = parseInt(total_height[(n-2)]);
			var prev_mean = (oneColBehind + twoColBehind) / 2;
			total_height[n] = Math.floor((Math.random() + 0.5) * prev_mean);
		} else if (n == 1) {
			total_height[1] = Math.floor(parseInt(total_height[0]) * (Math.random() + 0.6));
		} else { //if first column
			total_height[0] = Math.floor((Math.random() + 0.6) * (window.innerHeight/2));
		}
		$('.column' + (n+1)).height(total_height[n]);
		colouring();
	}
}

var colouring = function() {

	var middle = window.innerHeight / 3;
	var top = (window.innerHeight * 2) / 3;
	console.log(top);
	
	if (total_height[n] < middle) {
		console.log("bottom")
		// $(".column" + (n+1) + " .col_core").css("background-color", "lightgreen");
		$(".column" + (n+1) + " .col_core").css("background", "linear-gradient(green, yellow, red)");
	}
	if (total_height[n] >= middle) {
		console.log("middle")
		$(".column" + (n+1) + " .col_core").css("background-color", "goldenrod");
	}
 	if (total_height[n] >= top) {
		console.log("top");
		$(".column" + (n+1) + " .col_core").css("background-color", "red");
	}
}