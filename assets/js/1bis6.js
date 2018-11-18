//initialize bject-array for the dices
var allDices = [];


//function to initialize to the beginning
function init() {
	//add function to leave-buttons
	document.getElementById('main-back').addEventListener("touchstart", leave);
	document.getElementById('leavenotButton').addEventListener("touchstart", notLeave);
	//initialize with 1 Dice (dID=1, dSides=6, dFreeze=false)
	allDices[0] = new Dice(1,6,false);
	document.getElementById('dices').innerHTML = allDices[0].show();
	//reset EventListeners for touchevents
	document.getElementById('1').addEventListener("touchstart", freezeDice);
	document.getElementById('addButton').addEventListener("touchstart", addDice);
	document.getElementById('removeButton').addEventListener("touchstart", removeDice);
	document.getElementById('rollButton').addEventListener("touchstart", rollDice);
	//addCSS to the buttons
	addCSS();
}


//function to be executed before the roll: removeEventListener to prevent another touch during the function
function beforeRoll(){
	removeFreezeListener();
	document.getElementById('addButton').removeEventListener("touchstart", addDice);
	document.getElementById('removeButton').removeEventListener("touchstart", removeDice);
	document.getElementById('rollButton').removeEventListener("touchstart", rollDice);
}


//function to be executed after the roll: addEventlisteners again
function afterRoll(){
	document.getElementById('addButton').addEventListener("touchstart", addDice);
	document.getElementById('removeButton').addEventListener("touchstart", removeDice);
	document.getElementById('rollButton').addEventListener("touchstart", rollDice);
	addFreezeListener();
}

//add a new dice to the object-array, show it, add the freeze-EventListener and check if CSS should be added to the buttons
function addDice(){
	var l = allDices.length;
	if(l==6) {			//max number of dices is 6
	} else {
		//put new dice (object) in the allDice-array
		allDices[l] = new Dice(l+1,6,false);
		document.getElementById('dices').innerHTML = '';
		for(var i=0;i<l+1;i++){
			//set the default-value '?' to all all dices
			allDices[i].dValue='?';
			allDices[i].dFreeze=false;
			document.getElementById('dices').innerHTML += allDices[i].show();
		}
		addFreezeListener();
		//add css to addButton/removeButton if they are "unclickable"
		addCSS();
	}
}


//remove the last dice from the object-array and show the others again
function removeDice(){
	var l = allDices.length;
	if(l==1) {			//min number of dices is 1
	} else {
		allDices.splice(l-1); //put new dice in the allDice-array
		document.getElementById('dices').innerHTML = '';
		for(var i=0;i<l-1;i++){
			allDices[i].dValue='?';
			allDices[i].dFreeze=false;
			document.getElementById('dices').innerHTML += allDices[i].show();
		}
		addFreezeListener();
		addCSS();			//add css to addButton/removeButton if they are "unclickable"
	}
	//the last button can't be frozen
	if(l==2) {
		allDices[0].freeze(1);
	}
}


//give gray color to +/- Buttons, if they are "unclickable"
function addCSS(){
	var l = allDices.length;
	if(l==1){			//if there is only one dice, you can't remove it. So give a gray color to the removeButton
		document.getElementById("removeButton").setAttribute('style', 'color: #222222; border-color: #222222; background-color: #333333;');
	} else if(l==6){			//if there are 9 dices, you can't add another. So give a gray color to the addButton
		document.getElementById("addButton").setAttribute('style', 'color: #222222; border-color: #222222; background-color: #333333;');
	} else {			//reset default colors
		document.getElementById("removeButton").setAttribute('style', 'color: #FACC2E; border-color: #FACC2E; background-color: #ffffff;');
		document.getElementById("addButton").setAttribute('style', 'color: #FACC2E; border-color: #FACC2E; background-color: #ffffff;');
	}
}
