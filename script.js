var n;
var redPart, redPart_CS, amberPart, greenPart;
var orientation;
var total_height = [];
// var beat = Math.random() * 3000;
var beat = 3500;
var amber_boundary = Math.floor((window.innerHeight * 1) / 2);
var red_boundary = Math.floor((window.innerHeight * 2) / 3);
var setup = 1;
var main;
var n_array = [];
var total_height_prev = [];

var start = function() {
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

var sizing = function() { // can be used to calculate height
	// var beat = Math.random() * 500;
	// var beat = 300;
	for (n=0; n < 12; n++) {

	if (total_height[n]) {
		total_height_prev[n] = total_height[n];
	}

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
	n_array = [];
}

var colours = function() {

	if (setup <= 12) {
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

	setup++;

	} else {

		if (parseInt(total_height[n]) >= red_boundary) {
			// console.log("red" + n);
			redChange();

		} else if (parseInt(total_height[n]) >=  amber_boundary) {
			// console.log("amber" + n);
			amberChange();

		} else if (parseInt(total_height[n]) < amber_boundary) {
			// console.log("green" + n);
			greenChange();
		} else {
			console.log("fail");
		}
	}
}

var greenChange = function() {
	

	if (total_height_prev[n] < total_height[n]) { //growing
		var gr = n;

		$(greenPart[gr]).height(total_height[gr]);
		$('.column'+ gr + "> " + '.greenPart').on('transitionend webkitTransitionEnd', function () {
			$(amberPart[gr]).height("0"); 
		});
		$('.column'+ gr + "> " + '.amberPart').on('transitionend webkitTransitionEnd', function () {
			$(redPart[n]).height("0");
		});

	} else { //shrinking
		$(redPart[n]).height("0");
		var gr = n;
		// n_array.push(n);
		//read earliest value of n_array and then remove it
		// k = n_array[0]
		$('.column'+ gr + "> " + '.redPart').on('transitionend webkitTransitionEnd', function () {
			$(amberPart[gr]).height("0"); 
			// console.log("gurp1, " + gr);
		});
		$('.column'+ gr + "> " + '.amberPart').on('transitionend webkitTransitionEnd', function () {
			$(greenPart[gr]).height(total_height[gr]);
			// console.log("gurp2, " + gr);
		});
	}
}

var amberChange = function() {
	var am = n;
	var amber_tip = parseInt(total_height[n]) - amber_boundary;
	$(redPart[am]).height("0");
	
	$('.column'+ am + "> " + '.redPart').on('transitionend webkitTransitionEnd', function () {
		$(amberPart[am]).height(amber_tip);
		// console.log("gurp3, " + am);
	});
	$('.column'+ am + "> " + '.amberPart').on('transitionend webkitTransitionEnd', function () {
		$(greenPart[am]).height(amber_boundary);
		// console.log("gurp4, " + am);
	});
}


// bugs:

// 1. red goes first, even on a growing bar
// 2. 

var redChange = function() {
	var re = n;
	var red_tip = parseInt(total_height[re]) - red_boundary;
	$(redPart[re]).height(red_tip);

	$('.column'+ re + "> " + '.redPart').on('transitionend webkitTransitionEnd', function () {
		$(amberPart[re]).height(red_boundary - amber_boundary);
		// console.log("gurp5, " + re);
	});
	$('.column'+ re + "> " + '.amberPart').on('transitionend webkitTransitionEnd', function () {
		$(greenPart[re]).height(amber_boundary);
		// console.log("gurp6, " + re);
	});
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
	redPart[n].style.height = red_tip + "px";
}