// This array holds the words we are going to choose from.
var wordBank = ["han", "luke", "leia" , "alderaan", "tantooine", "sith", "jedi", "chewbacca", "padme", "anakin", "finn", "rey", "phasma", "vader", "naboo", "lightsaber", "yoda", "palpatine", "mustafar", "clones","maul"];
var activeWord = " ";	//word that is in play
var wordLength = " ";	//length of in play word
var blanks = "_";		//blanks for in play word
var letter = "";		//letter that is being input
var insertLetter = " ";	//letter to be inserted if correct
var position = 0;		//position of correctly guessed letter
var numGuesses = 12;		//number of guesses
var wrongLetters = []; 	//array of wrong letters
var wins = 0;			//number of wins
var updateBlanks = "";	//unused can delete
var goodGuess = false;  //returns true if letter is in word
//global vars^^^

//functions
function gameOn(){
	
	//setting game conditions back to default
	
	wrongLetters = [];
	blanks = "";

	chooseWord();
	blankSpace();
	console.log(activeWord);
	//console.log(blanks);
	//console.log(wordLength);

	//game stats
	document.getElementById("usedLetter").innerHTML = wrongLetters;
	document.getElementById("numBlanks").innerHTML = blanks;
	document.getElementById("numLength").innerHTML = wordLength;
	document.getElementById("guessCount").innerHTML = numGuesses;
	document.getElementById("winCount").innerHTML = wins;
}


	// This function will pick our word which is stored in the activeWord var
function chooseWord () {
    activeWord = wordBank[Math.floor(Math.random() * wordBank.length )];
    return activeWord;

}


	//returns blank spaces instead of word. Also set wordLength
function blankSpace () {
	
	var currentWord = activeWord;
    wordLength = currentWord.length;
	//console.log(wordLength);//for testing
	//console.log(currentWord);//for testing
	for (i=0; i < wordLength; i ++){
		blanks = blanks + "_";
	}
	//console.log(blanks);//for testing
	return blanks;
}


	//inserts letter(position of letter, the letter to be inserted, the word being used)
function alterWordAt ( position, insertLetter, activeWord ) {
    blanks = activeWord.substr(0,position) + insertLetter + activeWord.substr(position+1,activeWord.length);
    return blanks
}

//goes through word to find if letter is present.  Replaces the blank with the letter
function guessLetter( letter, blanks, activeWord) {
    var checkIndex = -1;
    checkIndex = activeWord.indexOf(letter);
    
    while ( checkIndex >= 0 ) {
        blanks  = alterWordAt( checkIndex, letter, blanks );
        checkIndex = activeWord.indexOf(letter, checkIndex + 1);
    }
    //console.log(blanks);
    return blanks;
}

//checks to see if letter is in the word. Also subtracts guesses if it is not in word and sets goodGuess back to false.
function letterTF(letter){

	if (activeWord.indexOf(letter) > 0){
		return goodGuess = true;
	} 
	
	if (activeWord.indexOf(letter) < 0){
		console.log(blanks);
		wrongLetters.push(" "+ letter +" ");
		numGuesses = numGuesses-1;
		return goodGuess = false;
		
	}
    
}

	function tranlator() {
    var x = document.getElementById("c3p0").value;
    document.getElementById("star").innerHTML = x;
}
//end of functions


//Running the game
document.onkeyup = function(event){
gameOn();


document.onkeyup = function(event){
	letter = String.fromCharCode(event.keyCode).toLowerCase();
 if(numGuesses > 0){
	
	  	 letterTF(letter);
 	  	 document.getElementById("guessCount").innerHTML = numGuesses;
	  	 document.getElementById("usedLetter").innerHTML = wrongLetters;
 
 		if(goodGuess = true){
	  	 guessLetter(letter, blanks, activeWord);
	  	 console.log(letter);
	  	 document.getElementById("numBlanks").innerHTML =  blanks;
		}
		//win scenario
		if(blanks == activeWord){
			wins = wins + 1;
			document.getElementById("winCount").innerHTML = wins;
			alert("The answer is " + activeWord+"." +" You Win!  Click ok to continue.");
			blanks = "";
			wrongLetters = [];
			chooseWord();
			blankSpace();
			gameOn();
			console.log(activeWord); //for testing
		}
 
 }
//loss scenario
 else{
 	alert("GAME OVER!! CLICK OK TO START OVER");
 	wrongLetters = [];
 	numGuesses = 12;
 	wins = 0;
 	gameOn();
 	}
 }

}
