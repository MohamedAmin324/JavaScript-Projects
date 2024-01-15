"use strict";

const controlButtons = document.querySelectorAll("button");
const colorModeBtn = document.querySelector(".color-mode-btn");
const rainbowModeBtn = document.querySelector(".rainbow-mode-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const clearBtn = document.querySelector(".clear-btn");

const colorInput = document.querySelector(".color-input");
const rangeInput = document.querySelector(".range-input");
const gridValueDisplay = document.querySelector(".grid-value");
const sketchDisplayContainer = document.querySelector(".sketch-display-container");
const containerWidth = 500; // width and height are equal

let defaultDrawColor = "#000000";
let isEraserActivated = false;
let isRainbowModeActivated = false;
const colorDatabase = ["red", "yellow", "green", "blue", "pink", "brown"];


function setBtnBehavior(e) {
    // prevent the default behavior of reloading the page
    e.preventDefault();
    e.target.classList.add("clicked-button");
    controlButtons.forEach((btn)=> {
        if(btn === e.target) return;
        btn.classList.remove("clicked-button");
    })
}

function setGridValueText() {
    const selectedRangeValue = rangeInput.value;
    gridValueDisplay.innerText = `${selectedRangeValue}x${selectedRangeValue}`;
}

function createGridCells() {
    setGridValueText();
    sketchDisplayContainer.innerHTML = "";
    const gridCellsNumber = Number(rangeInput.value) ** 2;
    const cellWidth = containerWidth/ Number(rangeInput.value);
    const cellHeight = containerWidth / Number(rangeInput.value);
    for(let index = 0; index < gridCellsNumber; index++) {
        const newDivElement = document.createElement("div");
        sketchDisplayContainer.append(newDivElement);
        newDivElement.style.width = `${cellWidth}px`;
        newDivElement.style.height = `${cellHeight}px`;
    }
}

function setDrawColor(e) {
    defaultDrawColor = e.target.value;
    debugger;
}

function setCellColor(e) {
    if(e.target === sketchDisplayContainer) return;
    const hoveredCell = e.target;
    if(isEraserActivated) {
        hoveredCell.style["background-color"] = "white";
        return;
    }
    if(isRainbowModeActivated) {
        const randomColor = randomizeColor();
        hoveredCell.style["background-color"] = randomColor;
        return;
    }
    hoveredCell.style["background-color"] = defaultDrawColor;
}

function toggleGridColors(indicator = true) {
    indicator?
    sketchDisplayContainer.addEventListener("mouseover", setCellColor):
    sketchDisplayContainer.removeEventListener("mouseover", setCellColor);
}

function setModesStatus(firstValue, secondValue) {
    isEraserActivated = firstValue;
    isRainbowModeActivated = secondValue;
}

function randomizeColor() {
    const chosenIndex = Math.floor(Math.random() * colorDatabase.length);
    return colorDatabase[chosenIndex];
}


colorInput.addEventListener("change", setDrawColor);
controlButtons.forEach((btn)=> btn.addEventListener("click", setBtnBehavior));
rangeInput.addEventListener("input", createGridCells);
sketchDisplayContainer.addEventListener("mousedown", ()=> toggleGridColors());
sketchDisplayContainer.addEventListener("mouseup", ()=> toggleGridColors(false));
eraserBtn.addEventListener("click", ()=> setModesStatus(true, false))
colorModeBtn.addEventListener("click", ()=> setModesStatus(false, false))
rainbowModeBtn.addEventListener("click", ()=> setModesStatus(false, true));
clearBtn.addEventListener("click", ()=>{
    setModesStatus(false, false);
    Array.prototype.forEach.call(sketchDisplayContainer.children, (childElement)=> childElement.style.backgroundColor = "white");
})
window.addEventListener("load", ()=> {
    controlButtons[0].classList.add("clicked-button");
    colorInput.value = defaultDrawColor;
    createGridCells();
})
