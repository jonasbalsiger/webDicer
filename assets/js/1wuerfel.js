var allDices = [];

//function to initialize to the beginning
function init() {
	//add function to leave-buttons
	document.getElementById('main-back').addEventListener("touchstart", leave);
	document.getElementById('leavenotButton').addEventListener("touchstart", notLeave);
	//initialize 1 Dice (dID=1, dSides=initSides (1wuerfel.html), dFreeze=false)
	allDices[0] = new Dice('oneDice',6,false);
	document.getElementById('dices').innerHTML = allDices[0].show();
	document.getElementById('numOfSides').innerHTML = '# Seiten : 6';
	//reset EventListeners for touchevents
	document.getElementById('addButton').addEventListener("touchstart", sidesUp);
	document.getElementById('removeButton').addEventListener("touchstart", sidesDown);
	document.getElementById('rollButton').addEventListener("touchstart", rollDice);
	//addCSS to the buttons
	addCSS();
}


//function to be executed before the roll: removeEventListener to prevent another touch during the function
function beforeRoll(){
	removeFreezeListener();
	document.getElementById('addButton').removeEventListener("touchstart", sidesUp);
	document.getElementById('removeButton').removeEventListener("touchstart", sidesDown);
	document.getElementById('rollButton').removeEventListener("touchstart", rollDice);
}


//function to be executed after the roll: addEventlisteners again
function afterRoll(){
	document.getElementById('addButton').addEventListener("touchstart", sidesUp);
	document.getElementById('removeButton').addEventListener("touchstart", sidesDown);
	document.getElementById('rollButton').addEventListener("touchstart", rollDice);
	addFreezeListener();
}

//add a new dice to the object-array, show it, add the freeze-EventListener and check if CSS should be added to the buttons
function sidesUp(){
	allDices[0].dSides=allDices[0].dSides+1;
	allDices[0].dValue='?';
	document.getElementById('numOfSides').innerHTML = '# Seiten : '+allDices[0].dSides;
	document.getElementById('dices').innerHTML = allDices[0].show();
	addCSS();
}


//remove the last dice from the object-array and show the others again
function sidesDown(){
	if(allDices[0].dSides==2){
	} else {
		allDices[0].dSides=allDices[0].dSides-1;
		allDices[0].dValue='?';
		document.getElementById('numOfSides').innerHTML = '# Seiten : '+allDices[0].dSides;
	}
	document.getElementById('dices').innerHTML = allDices[0].show();
	addCSS();
}


//give gray color to +/- Buttons, if they are "unclickable"
function addCSS(){
	if(allDices[0].dSides==2){			//if there is only one dice, you can't remove it. So give a gray color to the removeButton
		document.getElementById("removeButton").setAttribute('style', 'color: #222222; border-color: #222222; background-color: #333333;');
	} else {			//reset default colors
		document.getElementById("removeButton").setAttribute('style', 'color: #FACC2E; border-color: #FACC2E; background-color: #ffffff;');
	}
	if(allDices[0].dSides<10){
		document.getElementById('oneDice').setAttribute('style', '');
	} else if(allDices[0].dSides>=10 && allDices[0].dSides <100){
		document.getElementById('oneDice').setAttribute('style', 'font-size: 51.5vw; padding-top:9vw;');
	} else{
		document.getElementById('oneDice').setAttribute('style', 'font-size: 35vw; padding-top:19vw;');
	}
}
