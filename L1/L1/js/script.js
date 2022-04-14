var input1Elem, input2Elem, resultElem;

function init() {
	input1Elem = document.getElementById("input1");
	input2Elem = document.getElementById("input2");
	resultElem = document.getElementById("result");
	document.getElementById("runBtn").onclick = areaCalculations;
} // End init
window.onload = init;

// Kod för beräkningar av area
function areaCalculations() {
	// Deklaration av variabler
	var length;		// Längd i meter
	var width;		// bredd i meter
	var area;		// Yta i kvadratmeter
	
	length = Number(input1Elem.value);
	width = Number(input2Elem.value);

	area = length * width;
	resultElem.innerHTML = "<p>Rektangelns area: " + area + " kvadratmeter</p>";
	
	area = length * width / 2;
	resultElem.innerHTML += "<p>Triangelns area: " + area + " kvadratmeter</p>";
	
	area = 3.14 * length * width / 4;
	resultElem.innerHTML += "<p>Ellipsens area: " + area + " kvadratmeter</p>";

    area = (length + 5) * width;
	resultElem.innerHTML += "<p>Rektangelns area med längden +5 ger en rekatngel på: " + area + " kvadratmeter</p>";

    area = (length * 1.5) * (width + 3);
	resultElem.innerHTML += "<p>Rektangelns area med 50% ökad längd och 3 meter bredare bredd: " + area + " kvadratmeter</p>";

    area = ((length * 3.28) * (width * 3.28)) / 2;
	resultElem.innerHTML += "<p>Triangelns area: " + area + " kvadratfot</p>";
	
} // End areaCalculations