"use strict";

const addTaskBtn = document.querySelector(".add-task");
const submitBtn = document.querySelector(".submit");
const resetBtn = document.querySelector(".reset");
const taskList = document.querySelector(".task-list");
const inputField = document.querySelector("input");
const disclaimerMessage = document.querySelector(".disclaimer");
/* The idea behind defining a variable with that holds all the added tasks is to be able to load them instantly from the LocalStorage when the pages reloads instead of listening fro the event*/
let tasks = JSON.parse(localStorage.getItem("data")) || [];


function saveData() {
    // when using the localStorage object , transform your data into JSON to easily save it
    localStorage.setItem("data", JSON.stringify(tasks));
}

function removeListElements() {
    const listElements = taskList.querySelectorAll("li");
    listElements.forEach((currentItem)=> taskList.removeChild(currentItem));
}

function resetData() {
    tasks = [];
    removeListElements();
    disclaimerMessage.classList.remove("hide");
    localStorage.clear();
}

function getTasks(e) {
    // the e represents the event object
    // if the input element is empty the function will stop
    const userInput = inputField.value;
    if(!userInput) return;
    const currentTask = {
        text: userInput,
        done: false,
    }
    inputField.value = "";
    tasks.push(currentTask);
    populateList(currentTask);
}

function populateList(userTask) {
    disclaimerMessage.classList.add("hide");
    const index = tasks.indexOf(userTask);

    taskList.innerHTML = taskList.innerHTML + `
    <li>
    <label for="${index}">
    <input type="checkbox" id="${index}" ${userTask.done? "checked": "unchecked"}>
    ${userTask.text}
    </label>
    </li>
    `
}

function setTaskStatus(e) {
    const currentCheckbox = e.target;
    if(currentCheckbox.matches("input")){
       const identifier = currentCheckbox.id;
       tasks[identifier].done = currentCheckbox.checked;
    }
}

// Watching Over the list inner changes to toggle the disclaimer

/*const callback = function(changesRecords) {
    console.log(changesRecords);
    const currentRecord = changesRecords[0];
    console.log(taskList.childElementCount);
    disclaimerMessage.classList.toggle("hide", taskList.childElementCount === 1);
    //taskList.childElementCount === 1 ? disclaimerMessage.classList.remove("hide"): disclaimerMessage.classList.add("hide");
}
const listObserver = new MutationObserver(callback);
const configurationObj = {
    childList: true,
    subtree: true,
}


listObserver.observe(taskList, configurationObj);*/

addTaskBtn.addEventListener("click", getTasks);
submitBtn.addEventListener("click", saveData);
resetBtn.addEventListener("click", resetData);
taskList.addEventListener("click", setTaskStatus);
window.addEventListener("load", ()=> {
    if(tasks.length) {
        tasks.forEach((currentTask)=>{
            populateList(currentTask);
        })
    }
})
