// defines class "Dice" with its attributes (dice id, number of sides, freeze true/false, value)
// and functions (roll the dice, freeze the dice, show the value of the dice)
class Dice {
	
	//constructor to create a new dice with diceName = new Dice(id,sides,freeze). The default value is '?'.
	constructor(id,sides,freeze) {
		this.dID=id || 0;
		this.dSides=sides || 6;
		this.dFreeze=freeze || false;
		this.dValue='?';
	}

	//call function to roll the dice: diceName.roll(). if their dice is frozen, just return the former value
	roll(){
		if(this.dFreeze) {
		} else {
			this.dValue=Math.floor(Math.random()*this.dSides)+1;
		}
		return this.dValue;
	}

	freeze(thisDiv){
		//if its already frozen, defreeze the dice and reset css of the frozen div
		if(this.dFreeze){
			this.dFreeze=false;
			document.getElementById(thisDiv).setAttribute('style', '');
		//freeze the dice and change CSS of the clicked div: diceName.freeze(clicked Div)
		} else if(allDices.length>1 && this.dValue != '?'){
			this.dFreeze=true;
			document.getElementById(thisDiv).setAttribute('style', 'background-color: #FDE594;');
		}
	}

	//call function to show the dice within a div with the same ID as the dice (dID) -> a dice has to be in a div called the same than its dID
	show(){
		if(this.dFreeze){
			return '<div id="'+this.dID+'" style="background-color: #FDE594">'+this.dValue+'</div>';
		} else {
			return '<div id="'+this.dID+'">'+this.dValue+'</div>';
		}
	}

}
