var allDices = [];
var allWords = [];

//function to initialize to the beginning
function init() {
	//add function to leave-buttons
	document.getElementById('main-back').addEventListener("touchstart", leave);
	document.getElementById('leavenotButton').addEventListener("touchstart", notLeave);
	//initialize 1 Dice (dID=1, dSides=initSides (1wuerfel.html), dFreeze=false)
	allDices[0] = new Dice('oneDice',0,false);
	document.getElementById('dices').innerHTML = allDices[0].show();
	//reset EventListeners for touchevents
	document.getElementById('addButton').addEventListener("touchstart", addWord);
	document.getElementById('removeButton').addEventListener("touchstart", removeWord);
	document.getElementById('rollButton').addEventListener("touchstart", rollWords);
	//addCSS to the buttons
	addCSS();
}


//function to be executed before the roll: removeEventListener to prevent another touch during the function
function beforeRoll(){
	document.getElementById('addButton').removeEventListener("touchstart", addWord);
	document.getElementById('removeButton').removeEventListener("touchstart", removeWord);
	document.getElementById('rollButton').removeEventListener("touchstart", rollWords);
}


//roll dices numRolls times ("animation" with 'setInterval()')
function rollWords(){
	if(allWords.length==0){
	}else{
  		beforeRoll();
		var x=0;
		var numRolls=20; //number of dice-rolls per dice
		var animDice = function(){
			x++;
			allDices[0].dValue = allDices[0].roll();
			//change font-size depending on word-length
			var l = allWords[allDices[0].dValue-1].length;
			fs=(60+5*l)/l; //fontsize
			pt=(80-fs)/2; //padding-top
			document.getElementById('oneDice').setAttribute('style', 'font-size:'+fs+'vw !important; line-height:'+fs+'vw !important; padding-top:'+pt+'vw !important;');
  		document.getElementById('oneDice').innerHTML = allWords[allDices[0].dValue-1];
			if(x==numRolls){
				clearInterval(timer);
				afterRoll();
			}
		}
		timer = setInterval(animDice,40);
	}
}

//function to be executed after the roll: addEventlisteners again
function afterRoll(){
	document.getElementById('addButton').addEventListener("touchstart", addWord);
	document.getElementById('removeButton').addEventListener("touchstart", removeWord);
	document.getElementById('rollButton').addEventListener("touchstart", rollWords);
}

//add a new dice to the object-array, show it, add the freeze-EventListener and check if CSS should be added to the buttons
function addWord(){
	var x = document.form.wordX.value;
	if(x==''){
	document.form.wordX.value = '';
	document.getElementById('wordInput').setAttribute('placeholder', 'Leere Eingabe. Neuer Versuch.')
	} else{
		document.getElementById('wordInput').setAttribute('placeholder', 'Wort eingeben')
		l = allWords.length;
		allWords[l]=x;
		document.form.wordX.value = '';
		allDices[0].dSides=l+1;
		addCSS();
		showWords();
	}
}


//remove the last dice from the object-array and show the others again
function removeWord(){
	l = allWords.length;
	if(l!=0){
		allWords.splice(l-1);
		allDices[0].dSides=l-1;
	}
	addCSS();
	showWords();
}

function showWords(){
	if(allWords.length==0){
		document.getElementById('words').innerHTML = '';
	}
	else{
		document.getElementById('words').innerHTML = '';
		for(var i=0;i<allWords.length;i++){
			document.getElementById('words').innerHTML += '<p>'+allWords[i]+'</p>';
		}
	}
}


//give gray color to +/- Buttons, if they are "unclickable"
function addCSS(){
	if(allWords.length==0){			//if there is only one dice, you can't remove it. So give a gray color to the removeButton
		document.getElementById("removeButton").setAttribute('style', 'color: #222222; border-color: #222222; background-color: #333333;');
		document.getElementById("rollButton").setAttribute('style', 'color: #222222; border-color: #222222; background-color: #333333;');
	} else {			
		//reset default colors
		document.getElementById("removeButton").setAttribute('style', '');
		document.getElementById("rollButton").setAttribute('style', '');
	}
}
