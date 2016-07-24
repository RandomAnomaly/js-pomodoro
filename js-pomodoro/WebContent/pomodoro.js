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
		};
		
		
		
		
		var updateDisplayContent = function(){
			display.setPomodoroLengthDisplay(pomodoroLength);
			display.setPomodoroBreakDisplay(breakLength);
			display.setTimerDisplay(pomodoroLength);
		};
		
		
		
		return returnerObject;
	})();

	var display = (function(){
		var returnerObject = {};

		returnerObject.setPomodoroLengthDisplay = function(value){
			document.getElementById("pomodoroLengthDisplay").innerHTML = value;		
		};

		returnerObject.setPomodoroBreakDisplay = function(value){
			document.getElementById("pomodoroBreakDisplay").innerHTML = value;		
		};
		
		returnerObject.setTimerDisplay = function(value){
			document.getElementById("timerDisplay").innerHTML = value + ":00";
		};
		
		return returnerObject;
	})();
	
	var timer = (function(){
		
	})();
	
	return returnerObject;
})();
