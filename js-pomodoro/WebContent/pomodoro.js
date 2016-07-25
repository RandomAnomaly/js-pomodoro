/**
 * 
 */

var pomodoro = (function(){

	var returnerObject = {};

	var defaultBreak = 5;
	var defaultPomodoro = 25;


	// Object representing actions often performed by page controls
	returnerObject.controls = (function(){
		var returnerObject = {};

		var pomodoroLength = 25;
		var breakLength = 5;

		returnerObject.incrementPomodoroLength = function(){
			pomodoroLength++;
			updateDisplayContent();
		};

		returnerObject.decrementPomodoroLength = function(){
			pomodoroLength--;
			updateDisplayContent();
		};

		returnerObject.incrementBreakLength = function(){
			breakLength++;
			updateDisplayContent();
		};

		returnerObject.decrementBreakLength = function(){
			breakLength--;
			updateDisplayContent();
		};

		returnerObject.timerClick = function(){
			console.log("CLICK");
			display.clearTimerCircle();
			timer.beginTimer(1,100);
			//TODO events here will be handled by the timer
		};

		var updateDisplayContent = function(){
			display.setPomodoroLengthDisplay(pomodoroLength);
			display.setPomodoroBreakDisplay(breakLength);
			display.setTimerDisplay(pomodoroLength + ":00");
		};

		

		return returnerObject;
	})();

	var display = (function(){
		var returnerObject = {};

		var circleAdjustmentValue = 1.8;

		returnerObject.setPomodoroLengthDisplay = function(value){
			document.getElementById("pomodoroLengthDisplay").innerHTML = value;		
		};

		returnerObject.setPomodoroBreakDisplay = function(value){
			document.getElementById("pomodoroBreakDisplay").innerHTML = value;		
		};

		returnerObject.setTimerDisplay = function(value){
			document.getElementById("timerDisplay").innerHTML = value;
		};

		// helper to get the circumference of the timer
		var calcCircumference = function(){
			var circle = document.getElementById("progressCircle");
			var bBox = circle.getBBox();
			var width = bBox.width + 1; //plus 1 accounts for the border
			var PI = 3.1415
			return Math.floor(PI * width);
		};

		returnerObject.clearTimerCircle = function(){
			var circle = jQuery('#svg #progressCircle');
			var circumference = calcCircumference();

			circle.css({strokeDasharray: circumference});
			circle.css({strokeDashoffset: circumference});			

		};

		returnerObject.clearTimer = function(){

		};

		returnerObject.setCirclePercentage = function(value){
			var circle = jQuery('#svg #progressCircle');
			var circumference = calcCircumference();
			var movementValue = circumference - ((value / 100)*circumference) + circleAdjustmentValue;

			console.log("Percentage: " + value + " Circum: " + circumference + " movementValue: " + movementValue);

			circle.css({strokeDashoffset: movementValue});
		};

		return returnerObject;
	})();

	var timer = (function(){
		
		var returnerObject = {};

		returnerObject.beginTimer = function(pomodoroValue, breakValue){
			//disable buttons etc
			
			// 1m = 60000ms
			var ms = pomodoroValue*60000;
			var timePassed = 0;
			
			var timer = setInterval(function(){
				timePassed += 1000;
				var currentTime = (ms - timePassed) / 1000
				var minutes = Math.floor(currentTime / 60);
				var seconds = currentTime % 60;
				var circleFill = Math.floor((ms / timePassed) * 100)
				
				display.setTimerDisplay((minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));
				console.log(minutes + ":" + seconds);
				
				console.log("\tTotal Time: " + ms + " Current Time: " + timePassed + " Percentage: " + Math.floor((timePassed / ms)*100));
				display.setCirclePercentage(Math.floor((timePassed / ms)*100))
				
				
				
				
				if(minutes === 0 && seconds === 0){
					clearInterval(timer);
				}
				
			},1000);
			
			
			
			/**
			window.setTimeout(function(){
				display.setCirclePercentage(75);
			}, 5000);
			 */

		};


		return returnerObject;
	})();

	return returnerObject;
})();