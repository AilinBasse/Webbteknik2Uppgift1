// Globala konstanter och variabler
const wordList = ["BLOMMA","LASTBIL","SOPTUNNA","KÖKSBORD","RADIOAPPARAT","VINTER","SOMMAR","DATORMUS","LEJON","ELEFANTÖRA","JULTOMTE","SKOGSHYDDA","BILNUMMER","BLYERTSPENNA","SUDDGUMMI","KLÄDSKÅP","VEDSPIS","LJUSSTAKE","SKRIVBORD","ELDGAFFEL","STEKPANNA","KASTRULL","KAFFEBRYGGARE","TALLRIK","SOFFBORD","TRASMATTA","FLYGPLAN","FLYGPLATS","TANGENTBORD"]; // Lista (array) med ord som ska väljas slumpmässigt
var selectedWord; //Det ord som användaren ska gissa på
var letterBoxes; //Den array som bokstäver kommer att skrivas i
var hangmanImg; //Referens till hänga-gubbe bilden
var hangmanImgNr; //Referens till vilken av det sex hänga-gubbe bilderna som ska användas
var msgElem; //Referens för meddelanden
var startGameBtn; //Referens till startknappen
var letterButtons; //Referens till alla knappar med det olika bokstäverna på
var startTime; //Referens till när spelet startar

// ------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	startGameBtn = document.getElementById("startGameBtn");
    startGameBtn.addEventListener("click", startGame);
    letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");
    for(let i = 0; i < letterButtons.length; i++) {
        letterButtons[i].onclick = guessLetter;
    }
    hangmanImg = document.getElementsById("hangman");
    msgElem = document.getElementById("message");
    startGameBtn.disabled = false;
    for(let i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = true
    }
} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// ------------------------------

//Starta nytt spel. Välj ord, visa bokstavsrutor, visa första bilden (tom), sätt bildnr till 0
function startGame() {
    randomWord();
    showLetterBoxes();
    hangmanImg.src = "img/h0.png"
    hangmanImgNr = 0
    startGameBtn.disabled = true;
    for(let i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = false
    }
    let now = new Date();
    startTime = now.getTime(); //Sätter starttiden för spelet
    msgElem = ""
}

//Väljer ett slumpmässigt ord från wordList
function randomWord() {
    let wordIndex = Math.floor(Math.random() * wordList.length) //Väljer ett slumpmässigt ord från vår ordlista
    newWord = wordList[wordIndex]
    if(newWord == selectedWord) {
        return randomWord()
    } else {
        newWord = selectedWord
    }
}

//Visar tomma rutor där rätt bokstäver ska fyllas i
function showLetterBoxes() {
    let newCode = ""
    for(let i = 0; i < selectedWord.length; i++) {
        newCode += "<span>&nbsp;</span>"
    }
    document.getElementById("letterBoxes").innerHTML = newCode;
    letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");
}

//Lägger in korrekt gissade bokstäver samt ändrar img vid inkorrekt gissad bokstav
function guessLetter() {
    this.disabled = true;
    let letter = this.value;
    let letterFound = false;
    let correctLettersFound = 0;
    for(let i = 0; i < selectedWord.length; i++) {
        if(selectedWord.charAt(i) == letter) {
            letterFound = true
            letterBoxes[i].innerHTML = letter
        }
        if(letterBoxes[i].innerHTML != "&nbsp;") {
            correctLettersFound += 1
        }
    }
    if(letterFound == false) {
        hangmanImgNr += 1
        if(hangmanImgNr == 6) {
            endGame(true)
        }
        hangmanImg.src = "img/h" + hangmanImgNr + ".png"
    } else if(correctLettersFound == selectedWord.length) {
        endGame(false)
    }
}

//Avslutar spelet
function endGame(manHanged) {
    startGameBtn.disabled = false;
    for(let i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = true
    }
    if(manHanged == true) {
        msgElem.innerHTML = "Tyvärr, gubben hängdes. Rätt svar var " + selectedWord + "."
    } else {
        msgElem.innerHTML = "Grattis! Det var helt rätt ord!"
    }
    let runTime = (new Date().getTime() - startTime) / 1000 //Sparar total tid från spelets början till slut
    msgElem.innerHTML += "<br>Det tog " + runTime.toFixed(1) + " sekunder.";
    return;
}