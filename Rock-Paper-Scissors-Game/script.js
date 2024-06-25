"use strict";

const optionsOfPlay = document.querySelectorAll(".option");
const choiceDisplay = document.querySelector(".computer-choice .text");
const resultDisplay = document.querySelector(".result .text");
const scoreDisplays = document.querySelectorAll(".score-panel > p");
const resetBtn = document.querySelector("button");

function getUserOption(clickedOption) {
    return clickedOption.innerText;
}

function setComputerChoice() {
    const chosenIndex = Math.floor(Math.random() * 3);
    return optionsOfPlay[chosenIndex].dataset.option;
}

function displayComputerChoice(computerChoice) {
    choiceDisplay.innerText = computerChoice;
}

function resetScore() {
    resultDisplay.innerText = "";
    choiceDisplay.innerText = "";
    scoreDisplays.forEach((item)=>{
        item.querySelector(".score-value").innerText = "0";
    })
}

function compareResults(userChoice, computerChoice) {
    if(userChoice  === computerChoice) return ["Draw"];

    if(((userChoice === "Rock") && (computerChoice === "Paper")) ||
    ((userChoice === "Scissor") && (computerChoice === "Rock")) ||
    ((userChoice === "Paper") && (computerChoice === "Scissor"))) return ["Computer Wins", "computer"];

    return ["You win", "user"];
}

function displayFinalResult(e) {
    const userChoice = getUserOption(e.target);
    const computerChoice = setComputerChoice();
    displayComputerChoice(computerChoice);
    const result = compareResults(userChoice, computerChoice);
    resultDisplay.innerText = result[0];
    if(result[0] === "Draw") return;
    scoreDisplays.forEach((item)=>{
        if(item.dataset.winner === result[1]) item.querySelector(".score-value").innerText = Number(item.querySelector(".score-value").innerText) + 1;
    })
}

optionsOfPlay.forEach(option => option.addEventListener("click", displayFinalResult));
resetBtn.addEventListener("click", resetScore);
