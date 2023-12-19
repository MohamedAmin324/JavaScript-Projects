"use strict";

const calculatorBtnSection = document.querySelector(".calculator__btn-section");
const currentOperationDisplay = document.querySelector(".calculator__current-operation");
const resultDisplay = document.querySelector(".calculator__result");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");
const equalBtn = document.querySelector(".equal-btn");
const MATH_OPERATIONS = ["x", "+", "/", "-"];

function populateDisplay(e, pressedKey) {
    //const clickedBtn = e.target || document.querySelector(`[data-key=${pressedKey}]`);
    let clickedBtn;
    e ? clickedBtn = e.target: clickedBtn = document.querySelector(`[data-key="${pressedKey}"]`);
    const userInput = clickedBtn.innerText;

    if(clickedBtn.classList.contains("operation-key")) return;
    if(!clickedBtn.matches("span")) return;
    if(currentOperationDisplay.innerText.includes(".") && userInput === ".") return;

    if(["x", "+", "/", "-"].includes(userInput)) {
        if(resultDisplay.innerText.includes("=")) resultDisplay.innerText = "";
        if(!detectMathOperations()) {
        resultDisplay.innerText = `${currentOperationDisplay.innerText} ${userInput}`;
        currentOperationDisplay.innerText = "0";
        return;
        }
        const result = performMathEquation();
        resultDisplay.innerText = `${result} ${userInput}`;
        currentOperationDisplay.innerText = "0";
        return;
    }

    if(currentOperationDisplay.innerText === "0") {
        currentOperationDisplay.innerText = userInput;
        return;
    }
    currentOperationDisplay.innerText += userInput;
}

function clearDisplay() {
    resultDisplay.innerText = "";
    currentOperationDisplay.innerText = "0";
}

function deleteLastDigit() {
    if(currentOperationDisplay.innerText.length === 1) {
        currentOperationDisplay.innerText = "0";
        return;
    }
    currentOperationDisplay.innerText = currentOperationDisplay.innerText.replace(/\d$/, " ");
}

function detectMathOperations() {
    return MATH_OPERATIONS.some((sign)=> resultDisplay.innerText.includes(sign));
}

function performMathEquation() {
    const firstPartItems = resultDisplay.innerText.split(" ");
    const [operandOne, operator] = firstPartItems;
    const operandTwo = Number(currentOperationDisplay.innerText);
    switch(operator) {
        case "+": {
            return Number(operandOne) + operandTwo;
        }

        case "-": {
            return Number(operandOne) - operandTwo;
        }

        case "x": {
            return Number(operandOne) * operandTwo;
        }

        case "/": {
            return Number(operandOne) / operandTwo;
        }
    }
}

function displayEquality() {
    if(!detectMathOperations()) return;
    const operationResult = performMathEquation();
    resultDisplay.innerText = `${resultDisplay.innerText} ${currentOperationDisplay.innerText} =`;
    currentOperationDisplay.innerText = operationResult;
}

calculatorBtnSection.addEventListener("click", populateDisplay);
clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteLastDigit);
equalBtn.addEventListener("click", displayEquality);
document.addEventListener("keydown", (e)=>{
    if(e.key === "=") {
        displayEquality();
        return;
    }
    if(e.key === "Backspace") {
        deleteLastDigit();
        return;
    }
    if(e.key === "Escape") {
        clearDisplay();
        return;
    }
    populateDisplay(null, e.key);
})
