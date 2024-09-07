"use strict";

const input = document.getElementById("input");
const numberButtons = document.querySelectorAll(".numbers div");
const operatorButtons = document.querySelectorAll(".operators div");
const resultButton = document.getElementById("result");
const clearButton = document.getElementById("clear");

if (!input || !resultButton || !clearButton) {
    console.error("One or more required elements are missing from the HTML.");
    return;
}

let resultDisplayed = false;

// Adding click handlers to number buttons
numberButtons.forEach(num => {
    num.addEventListener("click", function(e) {
        const currentString = input.innerHTML;
        const lastChar = currentString[currentString.length - 1];

        if (!resultDisplayed) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed && ["+", "-", "×", "÷"].includes(lastChar)) {
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            resultDisplayed = false;
            input.innerHTML = e.target.innerHTML;
        }
    });
});

// Adding click handlers to operator buttons
operatorButtons.forEach(op => {
    op.addEventListener("click", function(e) {
        const currentString = input.innerHTML;
        const lastChar = currentString[currentString.length - 1];

        if (["+", "-", "×", "÷"].includes(lastChar)) {
            input.innerHTML = currentString.slice(0, -1) + e.target.innerHTML;
        } else if (currentString.length === 0) {
            console.log("Enter a number first");
        } else {
            input.innerHTML += e.target.innerHTML;
        }
    });
});

// On click of 'equal' button
resultButton.addEventListener("click", function() {
    const inputString = input.innerHTML;

    const numbers = inputString.split(/\+|\-|\×|\÷/g).map(num => parseFloat(num));
    const operators = inputString.replace(/[0-9]|\./g, "").split("");

    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const nextNumber = numbers[i + 1];

        if (operator === "÷") {
            result /= nextNumber;
        } else if (operator === "×") {
            result *= nextNumber;
        } else if (operator === "-") {
            result -= nextNumber;
        } else if (operator === "+") {
            result += nextNumber;
        }
    }

    input.innerHTML = result;
    resultDisplayed = true;
});

// Clearing the input on press of clear
clearButton.addEventListener("click", function() {
    input.innerHTML = "";
});
