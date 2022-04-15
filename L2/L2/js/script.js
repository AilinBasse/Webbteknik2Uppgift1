// Globala variabler
var input1Elem, input2Elem, msgElem, selFruitsElem, selFruitNr; //inputElem1 & 2 används för att ge användaren en ruta att skriva in siffror som används i senare program
//msgElem används för att skicka felmeddelanden ifall användaren har skrivit med fel syntax i inputElem1 eller 2

// ------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	input1Elem = document.getElementById("input1");
    input2Elem = document.getElementById("input2");
    msgElem = document.getElementById("message");
    document.getElementById("btn1").onclick = showFruit;
    selFruitsElem = document.getElementById("selectedFruits");
    selFruitsElem = 0;
    document.getElementById("btn2").onclick = addFruits;
} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// ------------------------------


// Funktion som visar upp en bild på olika frukter baserat på vad användaren skriver in för nummer 
// i det första fältet
function showFruit() {
    let nr = checkNr(input1Elem.value, 5) //Nummer som användaren skrev in
    checkNr(nr);
    // Kollar så att numret är korrekt skrivet
    if (nr === null) {
        return;
    }
    document.getElementById("fruitImg").src = getUrl(nr)
    selFruitNr = nr;
    // Ändrar bilden till den bild som man valde med siffra i tidigare steg
}

// -----------------------------------------------------------------
// Funktion som ska välja rätt url för bilden baserat på det nummer som användaren skriver in

function getUrl(nr) {
    let url; // Kommer att användas för att berätta för HTML vilken bild som ska visas upp
    switch(nr) {
        case 1: 
            url = "img/apple.png";
            break;
        case 2:
            url = "img/banana.png";
            break;
        case 3:
            url = "img/pineapple.png";
            break;
        case 4:
            url = "img/orange.png";
            break;
        case 5:
            url = "img/pear.png";
            break;
        default:
            url = "img/nofruit.png";
    }    // Definerar scenario (vilken bild som ska visas) baserat på vilket nummer som användaren skriver in i inputElem1
    return url 
}

// -------------------------------------------------------------
// Funktion som ser så att användaren har skrivit in numret på rätt sätt

function checkNr(nr, high) {
    msgElem.innerHTML = "";
    if (isNaN(nr)) {
        msgElem.innerHTML = "Du måste skriva ett tal med siffror."
        return null;
    } //Kollar att man har skrivit in ett nummer

    if (nr < 1 || nr > high) {
        msgElem.innerHTML = "Du måste skriva en siffra mellan 1 och " + high;
        return null;
    } //Kollar att numret är mellan 1 och "high"

    nr = parseInt(nr);
    input1Elem.value = nr; // Ser till så att numret blir ett heltal
    return nr;
}

// ---------------------------------------------------
// Lägger till upp till 9 frukter av den valda frukten i en lista och visar upp det på sidan
function addFruits() {
    // Kollar så att det finns en frukt som är vald
    if(selFruitNr < 1 || selFruitNr > 5) {
        return;
    }

    // Kollar så att användaren skrivit nummer korrekt
    let amount = checkNr(input2Elem.value, 9)
    if(amount === null) {
        return;
    }

    let fruitUrl = getUrl(selFruitsElem); //Bilden på den valda frukten
    let imgList = ""; //Listan som vi kommer spara alla frukter
    for (let i = 0; i < amount; i++) {
        imgList += "<img src='" + fruitUrl + "' alt='frukt'>"
    }
    selFruitsElem.innerHTML += imgList;
}