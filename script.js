var n;
var redPart, redPart_CS, amberPart, greenPart, main, orientation;
var total_height = [];
// var beat = Math.random() * 3000;
var beat = 100;
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
		if (n >= 2) { // correlates height with previous two columns' height
			var oneColBehind = parseInt(total_height[(n-1)]);
			var twoColBehind = parseInt(total_height[(n-2)]);
			var prev_mean = (oneColBehind + twoColBehind) / 2;
			total_height[n] = Math.floor((Math.random() + 0.5) * prev_mean);
		} else if (n == 1) {
			total_height[1] = Math.floor(parseInt(total_height[0]) * (Math.random() + 0.5));
		} else { //if first column
			total_height[0] = Math.floor((Math.random() + 0.5) * (window.innerHeight/2));
		}
		$('.column' + (n+1)).height(total_height[n]);
		// colouring();
	}
}

// Tasks: 

// 1. set a totalColumnWidth for each column. Make is an easily changed var
// 2. divide totalColumnWidth by window.innerWidth to get total number of columns
// 3. use a loop with totalColumns.length as limit to generate new columns