class Option{
  constructor(id,link,description) {
		this.dID=id || 0;
		this.link=link+'.html' || 'index.html';
    this.description = description || '';
  }
  showDescription(){
    document.getElementById('main-overlay').setAttribute('style', 'visibility: visible;');
    document.getElementById('main-overlay-text').innerHTML = this.description+'<p class="go"><a href="'+this.link+'">weiter</a></p>';
  }
}


var allOptions = [];

function init(){
  //define options
  allOptions[0] = new Option(0,'1wuerfel','Würfle mit einem einzigen Zahlenwürfel. Optional kannst du die Anzahl Seiten einstellen.');
  allOptions[1] = new Option(1,'woerterwuerfeln','Würfle mit selbst eingegebenen Wörtern bzw. Namen');
  allOptions[2] = new Option(2,'1bis6','Würfle mit mehreren Würfeln. Du kannst die Anzahl Würfel selbst einstellen.');
  allOptions[3] = new Option(3,'jazzi','Benutze 5 Würfel, um Jazzi zu spielen. Du kannst Würfel durch Antippen einfrieren.');
  allOptions[4] = new Option(4,'meier','Benutze 2 Würfel, um "zu meiern". Ein Spieler würfelt ein oder zwei mal und gibt danach das Handy weiter.');
  //add EventListeners
  document.getElementById('main-overlay-back').addEventListener("touchstart", back);
  document.getElementById('option0').addEventListener("touchstart", function () { allOptions[0].showDescription(); });
  document.getElementById('option1').addEventListener("touchstart", function () { allOptions[1].showDescription(); });
  document.getElementById('option2').addEventListener("touchstart", function () { allOptions[2].showDescription(); });
  document.getElementById('option3').addEventListener("touchstart", function () { allOptions[3].showDescription(); });
  document.getElementById('option4').addEventListener("touchstart", function () { allOptions[4].showDescription(); });  
}

function back() {
  document.getElementById('main-overlay').setAttribute('style', 'visibility: hidden;');
}