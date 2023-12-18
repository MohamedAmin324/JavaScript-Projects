"use strict";

const calculatorBtnSection = document.querySelector(".calculator__btn-section");
const currentOperationDisplay = document.querySelector(".calculator__current-operation");
const resultDisplay = document.querySelector(".calculator__result");

function populateDisplay(e) {
    const clickedBtn = e.target;

    if(clickedBtn.classList.contains("operation-key")) return;
    if(!clickedBtn.matches("span")) return;

    if(["x", "+", "/", "-"].includes(clickedBtn.innerText)) {
        resultDisplay.innerText = `${currentOperationDisplay.innerText} ${clickedBtn.innerText}`;
        currentOperationDisplay.innerText = "0";
        return;
    }

    if(currentOperationDisplay.innerText === "0") {
        currentOperationDisplay.innerText = clickedBtn.innerText;
        return;
    }
    currentOperationDisplay.innerText += clickedBtn.innerText;
}

calculatorBtnSection.addEventListener("click", populateDisplay);
