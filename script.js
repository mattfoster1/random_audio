// TASK: they need to move in order - first red and then amber and then green


var n;
var redPart, redPart_CS, amberPart, greenPart;
var orientation;
var total_height = [];
// var beat = Math.random() * 3000;
var beat = 300;
var amber_boundary = Math.floor((window.innerHeight * 1) / 2);
var red_boundary = Math.floor((window.innerHeight * 2) / 3);

var start = function() {
	alterations();
	sizing();
	// alterations();
	// var main = setInterval(function(){ sizing(); }, beat); // this needs to be randomised for the beat

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

var sizing = function() { // can be used to calculate height
	// var beat = Math.random() * 500;
	var beat = 300;

	for (n=0; n < 12; n++) {
		if (n >= 2) {
			// console.log(window.getComputedStyle(redPart[n-1]).height);
			var oneColBehind = total_height[(n-1)];
			var twoColBehind = total_height[(n-2)];
			var oneColBehind_H = parseInt(oneColBehind);
			var twoColBehind_H = parseInt(twoColBehind);
			var prev_mean = (oneColBehind_H + twoColBehind_H) / 2;
			// console.log(n + " = " + oneColBehind_H + ", " + twoColBehind_H);
			// console.log(n + " = " + (oneColBehind_H + twoColBehind_H) / 2);
			total_height[n] = Math.floor((Math.random() + 0.5) * prev_mean) + "px";
			// console.log("n-2 >= 0");
		} else if (n == 1) {
			// console.log("else1");
			total_height[1] = Math.floor(parseInt(total_height[0]) * (Math.random() + 0.6)) + "px";
		} else { //if first column
			// console.log("else0");
			total_height[0] = Math.floor((Math.random() + 0.6) * (window.innerHeight/2)) + "px";
		}
	colours();
	}
}

var colours = function() {
	// console.log(parseInt(total_height[n]) + ", " + red_boundary);

	if (parseInt(total_height[n]) >= red_boundary) {
		// console.log("red" + n);
		red();

	} else if (parseInt(total_height[n]) >=  amber_boundary) {
		// console.log("amber" + n);
		amber();

	} else if (parseInt(total_height[n]) < amber_boundary) {
		// console.log("green" + n);
		green();
	} else {
		console.log("fail");
	}
}

var green = function() {
	redPart[n].style.height = "0px";
	amberPart[n].style.height = "0px";
	greenPart[n].style.height = total_height[n];
}

var amber = function() {
	redPart[n].style.height = "0px";
	var amber_tip = parseInt(total_height[n]) - amber_boundary;
	greenPart[n].style.height = amber_boundary + "px";
	amberPart[n].style.height = amber_tip + "px";
}

var red = function() {
	greenPart[n].style.height = amber_boundary + "px";
	amberPart[n].style.height = (red_boundary - amber_boundary) + "px";
	var red_tip = parseInt(total_height[n]) - red_boundary;
	// console.log(amber_boundary + ", " + parseInt(amberPart[n].style.height) + ", " + red_boundary + ", " + total_height[n]);
	// console.log(amber_boundary + ", " + greenPart[n].style.height);
	// console.log(red_tip);
	redPart[n].style.height = red_tip + "px";
	// redPart[n].style.maxHeight = red_tip + "px";
}