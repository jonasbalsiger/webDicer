//initialize throws and object-array for the dices
var throws;
var allDices = [];


//function to initialize to the beginning
function init() {
	//add function to leave-buttons
	document.getElementById('main-back').addEventListener("touchstart", leave);
	document.getElementById('leavenotButton').addEventListener("touchstart", notLeave);
	//set max throws to 2
	throws=2;
	//initialize 2 dices (dID=dm1,dm2, dSides=6, dFreeze=false)
	document.getElementById('dices').innerHTML = '';
	for(var i=0;i<2;i++){
		allDices[i] = new Dice('dm'+(i+1),6,false);
		document.getElementById('dices').innerHTML += allDices[i].show();
	}
	//reset CSS of dices and rollButtonM
	document.getElementById('dm1').setAttribute('style', '');
	document.getElementById('dm2').setAttribute('style', '');
	document.getElementById('rollButtonM').setAttribute('style', '');
	//reset Text of rollButtonM
	document.getElementById('rollButtonM').innerHTML = 'Würfeln';
	//reset EventListeners for touchevents
	document.getElementById('noButton').removeEventListener("touchstart", showValues);
	document.getElementById('yesButton').removeEventListener("touchstart", init);
	document.getElementById('rollButtonM').removeEventListener("touchstart", rollDiceM);
	document.getElementById('rollButtonM').addEventListener("touchstart", rollDice);
	//reset visibility of the buttons
	document.getElementById('controls').setAttribute('style', 'visibility: visible;');
	document.getElementById('controlsTrust').setAttribute('style', 'visibility: hidden;');
}

//function to be executed before the roll: removeEventListener to prevent another touch during the function
function beforeRoll(){
	document.getElementById('rollButtonM').removeEventListener("touchstart", rollDice);
}

//function to be executed after the roll: check if it was the first or the second roll
function afterRoll(){
	throws--;
	if(throws==1){
		//change Text between buttons
		document.getElementById('trustText').innerHTML = 'nochmal?';
		//add EventListeners to the buttons
		document.getElementById('yesButton').addEventListener("touchstart", rollDiceM);
		document.getElementById('noButton').addEventListener("touchstart", trustOrNot);
		//change visibility of the buttons
		document.getElementById('controls').setAttribute('style', 'visibility: hidden;');
		document.getElementById('controlsTrust').setAttribute('style', 'visibility: visible;');
	} else {
		//after the second roll, you must not see the result. so go directly to trustOrNot
		trustOrNot();
	}
}


//same as rollDice() but without "animation"
function rollDiceM(){
  beforeRoll();
	//put a random number between 0 and number of sides into every dice without loop
	for(var j=0;j<allDices.length;j++){
		allDices[j].dValue = allDices[j].roll();
		document.getElementById(allDices[j].dID).innerHTML = allDices[j].dValue;
	}
	document.getElementById('yesButton').removeEventListener("touchstart", rollDiceM);
	afterRoll();
}


//function where the user can say, whether he wants to trust the numbers or not
function trustOrNot(){
	//Show hidden dices with a '?' and change their color
	document.getElementById('trustText').innerHTML = 'Vertrauen?';
	document.getElementById('dm1').innerHTML = '?';
	document.getElementById('dm2').innerHTML = '?';
	document.getElementById('dm1').setAttribute('style', 'background-color: #444444;');
	document.getElementById('dm2').setAttribute('style', 'background-color: #444444;');
	//change EventListeners from the buttons
	document.getElementById('yesButton').removeEventListener("touchstart", rollDiceM);
	document.getElementById('noButton').removeEventListener("touchstart", trustOrNot);
	document.getElementById('yesButton').addEventListener("touchstart", init);
	document.getElementById('noButton').addEventListener("touchstart", showValues);
	//show trust yes/no
	document.getElementById('controlsTrust').setAttribute('style', 'visibility: visible;');
}


//if the user doesnt trust the previous player, the values of the dices will be shown
function showValues(){
	//Show the dice-values
	document.getElementById('dm1').innerHTML = allDices[0].dValue;
	document.getElementById('dm2').innerHTML = allDices[1].dValue;
	//change button color and text for restart
	document.getElementById('rollButtonM').setAttribute('style', 'color: #ffffff; background-color: #222222; border-color: #222222;');
	document.getElementById('rollButtonM').innerHTML = 'Neustart?';
	//set EventListener for restart
	document.getElementById('rollButtonM').addEventListener("touchstart", init);
	//change visibility of the buttonss
	document.getElementById('controlsTrust').setAttribute('style', 'visibility: hidden;');
	document.getElementById('controls').setAttribute('style', 'visibility: visible;');
}
