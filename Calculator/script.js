"use strict";

const calculatorBtnSection = document.querySelector(".calculator__btn-section");
const currentOperationDisplay = document.querySelector(".calculator__current-operation");
const resultDisplay = document.querySelector(".calculator__result");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");
const MATH_OPERATIONS = ["x", "+", "/", "-"];

function populateDisplay(e) {
    const clickedBtn = e.target;

    if(clickedBtn.classList.contains("operation-key")) return;
    if(!clickedBtn.matches("span")) return;
    if(currentOperationDisplay.innerText.includes(".") && clickedBtn.innerText === ".") return;

    if(["x", "+", "/", "-"].includes(clickedBtn.innerText)) {
        if(!detectMathOperations()) {
        resultDisplay.innerText = `${currentOperationDisplay.innerText} ${clickedBtn.innerText}`;
        currentOperationDisplay.innerText = "0";
        return;
        }
        return;
    }

    if(currentOperationDisplay.innerText === "0") {
        currentOperationDisplay.innerText = clickedBtn.innerText;
        return;
    }
    currentOperationDisplay.innerText += clickedBtn.innerText;
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

calculatorBtnSection.addEventListener("click", populateDisplay);
clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteLastDigit);
