//initialize throws and object-array for the dices
var throws;
var allDices = [];


//function to initialize to the beginning
function init() {
	//add function to leave-buttons
	document.getElementById('main-back').addEventListener("touchstart", leave);
	document.getElementById('leavenotButton').addEventListener("touchstart", notLeave);
	throws = 1;
	//reset number of throws to the rollButton and reset its css
	document.getElementById('rollButtonJ').innerHTML = 'Wurf '+throws;
	document.getElementById('rollButtonJ').setAttribute('style', '');

	//initialize 5 dices (dID=d1,...,d5, dSides=6, dFreeze=false)
	document.getElementById('dices').innerHTML = '';
	for(var i=0;i<5;i++){
		allDices[i] = new Dice('d'+(i+1),6,false);
		document.getElementById('dices').innerHTML += allDices[i].show();
	}

	//set EventListeners for touchevents
	document.getElementById('rollButtonJ').addEventListener("touchstart", rollDice);
	document.getElementById('rollButtonJ').removeEventListener("touchstart", init);
	document.getElementById('dices').removeEventListener("touchstart", init);
	addFreezeListener();
}


//function to be executed before the roll: removeEventListener to prevent another touch during the function
function beforeRoll(){
	document.getElementById('rollButtonJ').removeEventListener("touchstart", rollDice);
	removeFreezeListener();
}


//function to be executed after the roll: addEventListener again and write new value of throws. if its 0 -> turn end
function afterRoll(){
	throws++;
	document.getElementById('rollButtonJ').addEventListener("touchstart", rollDice);
	addFreezeListener();
	document.getElementById('rollButtonJ').innerHTML = 'Wurf '+throws;
	if(throws==4){
		showThrows();
	}
}


//function, which will be executed after 3 rolls
function showThrows() {
	document.getElementById('rollButtonJ').removeEventListener("touchstart", rollDice);
	//change color of dices
	for(var i=1;i<6;i++){
		document.getElementById('d'+i).setAttribute('style', 'background-color: #444444;');
	}
	//change color and text of rollButton and restart game on touch
	document.getElementById('rollButtonJ').setAttribute('style', 'color: #ffffff; background-color: #222222; border-color: #222222; width: 85vw !important; margin: 0 7.5vw !important;');
	document.getElementById('rollButtonJ').innerHTML = 'nächste Runde';
	document.getElementById('dices').addEventListener("touchstart", init);
	document.getElementById('rollButtonJ').addEventListener("touchstart", init);
}
