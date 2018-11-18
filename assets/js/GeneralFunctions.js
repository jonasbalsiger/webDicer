//freeze touched dice (deliver its id))
function freezeDice(){
  var index = this.id;
  index = index.replace(/\D/g, "");
  index--;
	allDices[index].freeze(this.id);
}

//every dice get its EventListener to get frozen
function addFreezeListener(){
	var l = allDices.length;
	for(var i=1;i<=l;i++){
		document.getElementById(allDices[i-1].dID).addEventListener("touchstart", freezeDice);
	}
}

function removeFreezeListener(){
	var l = allDices.length;
	for(var i=1;i<=l;i++){
		document.getElementById(allDices[i-1].dID).removeEventListener("touchstart", freezeDice);
	}
}

//roll dices numRolls times ("animation" with 'setInterval()')
function rollDice(){
	//remove touch listener while dices are rolling
  //beforeRoll;
  beforeRoll();

	var x=0;
	var numRolls=20;			//number of dice-rolls per dice
	var animDice = function(){
		x++;
		for(var j=0;j<allDices.length;j++){			//put a random number between 0 and number sides into every dice (this loop will be looped itself numRolls times through the setInterval function)
      allDices[j].dValue = allDices[j].roll();
  		document.getElementById(allDices[j].dID).innerHTML = allDices[j].dValue;
		}
		if(x==numRolls){
			clearInterval(timer);
			//add touch listeners when diceroll has finished
			afterRoll();
		}
	}
	timer = setInterval(animDice,40);
}

function leave(){
  document.getElementById('main-overlay').setAttribute('style', 'visibility: visible;');
}
function notLeave(){
  document.getElementById('main-overlay').setAttribute('style', 'visibility: hidden;');
}
