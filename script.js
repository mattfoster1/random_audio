var n;
var redPart, redPart_CS, amberPart, greenPart, total_height;
var orientation;
var beat = Math.random() * 3000;
var amber_boundary = (window.innerHeight * 1) / 2;
var red_boundary = (window.innerHeight * 2) / 3;

var start = function() {
	alterations();
	// alterations();
	// var main = setInterval(function(){ alterations(); }, beat); // this needs to be randomised for the beat

	if (window.innerHeight > window.innerWidth) {
		orientation = "portrait";
	} else {
		orientation = "landscape";
	}
}

var alterations = function() {
	var beat = Math.random() * 500;
	greenPart = document.getElementsByClassName("greenPart");
	amberPart = document.getElementsByClassName("amberPart");
	redPart = document.getElementsByClassName("redPart");
	for (n=0; n < 12; n++) {	
		greenPart_CS = window.getComputedStyle(greenPart[0]);
		sizing();
	}
}

var sizing = function() { // can be used to calculate height
	if (n-2 >= 0) {
		// console.log(window.getComputedStyle(redPart[n-1]).height);
		var oneColBehind = window.getComputedStyle(greenPart[(n-1)]);
		var twoColBehind = window.getComputedStyle(greenPart[(n-2)]);
		var oneColBehind_H = parseInt(oneColBehind.height);
		var twoColBehind_H = parseInt(twoColBehind.height);
		var prev_mean = (oneColBehind_H + twoColBehind_H) / 2;
		// console.log(n + " = " + oneColBehind_H + ", " + twoColBehind_H);
		// console.log(n + " = " + (oneColBehind_H + twoColBehind_H) / 2);
		greenPart[n].style.height = (Math.random() + 0.5) * prev_mean + "px";
		// console.log("n-2 >= 0");
	} else if (n == 1) {
		console.log("else1");
		greenPart[1].style.height = parseInt(greenPart[0].style.height) * (Math.random() + 0.6) + "px";
	} else { //if first column
		console.log("else0");
		greenPart[0].style.height = (Math.random() + 0.6) * (window.innerHeight/2) + "px";
	}
warning_colours();

}

var warning_colours = function() {
	// console.log("warning_colours");
	// greenPart[n].style.maxHeight = amber_boundary;
	// amberPart[n].style.maxHeight = parseInt(amber_boundary) - parseInt(red_boundary);
	// amberPart[n].style.maxHeight = window.innerHeight - (parseInt(amber_boundary) + parseInt(red_boundary));
	// console.log(parseInt(greenPart[n].style.height) + ", " + parseInt(amber_boundary))

	if (parseInt(greenPart[n].style.height) >=  parseInt(red_boundary)) {
		console.log("red");
		
		amber();
		red();
	} else if (parseInt(greenPart[n].style.height) >=  parseInt(amber_boundary)) {
		console.log("amber");
		
		amber();

	}
}

var amber = function() {
	var amber_tip = parseInt(greenPart[n].style.height) - amber_boundary;
	greenPart[n].style.height = amber_boundary + "px";
	console.log(amber_boundary + ", " + greenPart[n].style.height);
	amberPart[n].style.height = amber_tip + "px";
}

var red = function() {
	var red_tip = (amber_boundary + parseInt(amberPart[n].style.height)) - red_boundary;
	amberPart[n].style.height = amber_boundary - red_boundary + "px";
	// console.log(amber_boundary + ", " + greenPart[n].style.height);
	redPart[n].style.height = red_tip + "px";
	redPart[n].style.maxHeight = red_tip + "px";
}