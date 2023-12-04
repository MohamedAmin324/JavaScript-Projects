"use strict";

const addTaskBtn = document.querySelector(".add-task");
const submitBtn = document.querySelector(".submit");
const resetBtn = document.querySelector(".reset");
const taskList = document.querySelector(".task-list");
const inputField = document.querySelector("input");
const disclaimerMessage = document.querySelector("p:not(.warning)");

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
    disclaimerMessage.classList.remove("hide");
    removeListElements();
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

    <div class="options-container">
    <a class="edit-option"><i class="fa-solid fa-pen" style="color: #08d93c;"></i></a>
    <a class="delete-option"><i class="fa-solid fa-trash" style="color: #e12323;"></i></a>
    </div>
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

function deleteTask(e) {
    const clickedOption = e.target;
    if(!clickedOption.matches(".fa-trash")) return;
    const isDeletionConfirmed = confirm("Do you really wish to delete the following task (This action is permanent once you submit the list)");
    if(!isDeletionConfirmed) return;
    const deletedTask = clickedOption.closest("li");
    const deletedTaskIndex = Number(deletedTask.querySelector("input").id);
    tasks.splice(deletedTaskIndex, 1);
    rerenderList();
}

function rerenderList() {
    if (!tasks.length) disclaimerMessage.classList.remove("hide");
    taskList.innerHTML = "";
    tasks.forEach((currentTask)=>{
        populateList(currentTask);
    })
}

addTaskBtn.addEventListener("click", getTasks);
submitBtn.addEventListener("click", saveData);
resetBtn.addEventListener("click", resetData);
taskList.addEventListener("click", setTaskStatus);
taskList.addEventListener("click", deleteTask);
window.addEventListener("load", ()=> {
    if(tasks.length) {
        tasks.forEach((currentTask)=>{
            populateList(currentTask);
        })
    }
})
