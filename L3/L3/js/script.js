// Globala konstanter och variabler
const wordList = ["BLOMMA","LASTBIL","SOPTUNNA","KÖKSBORD","RADIOAPPARAT","VINTER","SOMMAR","DATORMUS","LEJON","ELEFANTÖRA","JULTOMTE","SKOGSHYDDA","BILNUMMER","BLYERTSPENNA","SUDDGUMMI","KLÄDSKÅP","VEDSPIS","LJUSSTAKE","SKRIVBORD","ELDGAFFEL","STEKPANNA","KASTRULL","KAFFEBRYGGARE","TALLRIK","SOFFBORD","TRASMATTA","FLYGPLAN","FLYGPLATS","TANGENTBORD"]; // Lista (array) med ord som ska väljas slumpmässigt
var selectedWord; // Det slumpmässig ordet som användaren ska gissa på
var letterBoxes;  // Referens till rutor där korrekt gissade bokstäver ska visas
var hangmanImg; // Referens till elementet som visar bilden på den hängande gubben
var hangmanImgNr; // Nummer för bilden på hängande gubben som gör att den ändras som användare gissar på fel bokstäver
var letterButtons; // Referens till bokstavsknapparna
var startGameBtn; // Referens till startknappen
var startTime; // Tidpunkt när spelen startades
var msgElem; // Element för att visa meddelanden
// ------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	startGameBtn = document.getElementById("startGameBtn");
    startGameBtn.addEventListener("click", startGame);
    letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");
    for (var i = 0; i < letterButtons.length; i++) {
        letterButtons[i].onclick = guessLetter;
    }
    hangmanImg = document.getElementById("hangman");
    msgElem = document.getElementById("message");
    startGameBtn.disabled = false;
    for (var i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = true;
    }
} // End init
window.addEventListener("load", init); // Se till att init aktiveras då sidan är inladdad
// ------------------------------
//Initieria nytt spel. Välj ord, visa bokstavsrutor, visa första bilden (tom bild), sätt bildnummer till 0 
function startGame() {
    randomWord();
    showLetterBoxes();
    hangmanImg.src = "img/h0.png";
    hangmanImgNr = 0;
    startGameBtn.disabled = true;
    for (var i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = false;
    }
    msgElem.innerHTML = "";
    let now = new Date();
    startTime = now.getTime();
} // End startGame

//Välj ett slumpmässigt ord från listan och väljer aldrig samma ord efter varandra
function randomWord() {
    let oldWord = selectedWord;
    while (oldWord == selectedWord) {
        let wordIndex = Math.floor(Math.random() * wordList.length);
        selectedWord = wordList[wordIndex];
    }
} // End randomWord

// Visar rutorna där bokstäverna som gissas korrekt ska visas
function showLetterBoxes() {
    let newCode = "";
    for (var i = 0; i < selectedWord.length; i++) {
        newCode += "<span>&nbsp</span>";
    }
    document.getElementById("letterBoxes").innerHTML = newCode;
    letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");
} // End showLetterBoxes

// Kollar om bokstaven som användaren gissade på är korrekt - bestämmer även om spelaren har vunnit eller förlorat
function guessLetter() {
    this.disabled = true;
    let letter = this.value; // Bokstaven som användaren gissade på
    let letterFound = false; // Används för att avgöra om bokstaven finns i ordet
    let correctLettersFound = 0; // Bestämmer hur många bokstäver som är korrekta hittills
    for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord.charAt(i) == letter) {
            letterBoxes[i].innerHTML = letter;
            letterFound = true;
        }
        if (letterBoxes[i].innerHTML != "&nbsp;") {
            correctLettersFound += 1;
        }
    }
    if (letterFound == false) {
        hangmanImgNr++;
        hangmanImg.src = "img/h" + hangmanImgNr + ".png";
        if (hangmanImgNr == 6) {
            endGame(true);
        }
    } else if (correctLettersFound == selectedWord.length) {
        endGame(false);
    }
} // End guessLetter

// Avslutar spelet och visar meddelande baserat på vinst eller förlust
function endGame(manHanged) {
    if (manHanged) {
        msgElem.innerHTML = "Du förlorade. Ordet var: " + selectedWord;
    } else {
        msgElem.innerHTML = "Grattis, du fick rätt!";
    }
    startGameBtn.disabled = false;
    for (var i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = true;
    }
    let runTime = (new Date().getTime() - startTime) / 1000;
    msgElem.innerHTML += "<br>Du tog " + runTime + " sekunder att gissa.";
} // End endGame