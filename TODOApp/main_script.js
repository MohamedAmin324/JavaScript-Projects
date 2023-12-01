"use strict";

const addTaskBtn = document.querySelector(".add-task");
const submitBtn = document.querySelector(".submit");
const resetBtn = document.querySelector(".reset");
const taskList = document.querySelector(".task-list");
const inputField = document.querySelector("input");
/* The idea behind defining a variable with that holds all the added tasks is to be able to load them instantly from the LocalStorage when the pages reloads instead of listening fro the event*/
let tasks = JSON.parse(localStorage.getItem("data")) || [];

function saveData() {
    // when using the localStorage object , transform your data into JSON to easily save it
    localStorage.setItem("data", JSON.stringify(tasks));
}

function resetData() {
    tasks = [];
    taskList.innerHTML = "";
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
