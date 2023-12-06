"use strict";

const addTaskBtn = document.querySelector(".add-task");
const submitBtn = document.querySelector(".submit");
const resetBtn = document.querySelector(".reset");
const taskList = document.querySelector(".task-list");
const inputField = document.querySelector("input");
const disclaimerMessage = document.querySelector(".disclaimer");

let tasks = JSON.parse(localStorage.getItem("data")) || [];

function getTasks(e) {
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
    <li class="task">
    <label for="${index}">
    <input type="checkbox" id="${index}" ${userTask.done? "checked": "unchecked"}>
    ${userTask.text}
    </label>

    <div class="options-container">
    <a class="edit-option hover_cursor_pointer"><i class="fa-solid fa-pen" style="color: #08d93c;"></i></a>
    <a class="delete-option hover_cursor_pointer"><i class="fa-solid fa-trash" style="color: #e12323;"></i></a>
    </div>
    </li>
    `
}

function saveData() {
    localStorage.setItem("data", JSON.stringify(tasks));
}

function removeListElements() {
    taskList.innerHTML = "";
}

function resetData() {
    tasks = [];
    revealDisclaimer();
    removeListElements();
    localStorage.clear();
}

function revealDisclaimer() {
    disclaimerMessage.classList.remove("hide");
}

function setTaskStatus(e) {
    const currentCheckbox = e.target;
    if(!currentCheckbox.matches("input")) return;
    const identifier = currentCheckbox.id;
    tasks[identifier].done = currentCheckbox.checked;
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

function displayList() {
    tasks.forEach(currentTask=>populateList(currentTask));
}

function rerenderList() {
    if (!tasks.length) revealDisclaimer();
    removeListElements();
    displayList();
}


// Basic Options
addTaskBtn.addEventListener("click", getTasks);
submitBtn.addEventListener("click", saveData);
resetBtn.addEventListener("click", resetData);

// Events related to list
taskList.addEventListener("click", setTaskStatus);
taskList.addEventListener("click", deleteTask);

window.addEventListener("load", ()=> {
    if(tasks.length) displayList();
})
