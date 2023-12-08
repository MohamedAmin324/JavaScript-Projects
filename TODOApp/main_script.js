"use strict";

const addTaskBtn = document.querySelector(".add-task");
const submitBtn = document.querySelector(".submit");
const resetBtn = document.querySelector(".reset");
const taskList = document.querySelector(".task-list");
const inputField = document.querySelector("input");
const disclaimerMessage = document.querySelector(".disclaimer");
const warningMessage = document.querySelector(".warning");
let timer;

// First time i use the AbortController constructor, an new way to cancel event listeners
const InputEventController = new AbortController();
const signal = InputEventController.signal;

let tasks = JSON.parse(localStorage.getItem("data")) || [];

function getTasks(e) {
    const userInput = inputField.value;
    if (!userInput) {
        sendMessage("please enter a task", "red");
        return;
    }

    if(checkTaskExistence(userInput)) {
        sendMessage("Task Already exists!", "red");
        return;
    }


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
    <label for="${ index }">
    <input type="checkbox" id="${ index }" ${ userTask.done ? "checked" : "unchecked" }>
    ${ userTask.text }
    </label>
    <div class="options-container">
    <a class="edit-option hover_cursor_pointer"><i class="fa-solid fa-pen" style="color: #08d93c;"></i></a>
    <a class="delete-option hover_cursor_pointer"><i class="fa-solid fa-trash" style="color: #e12323;"></i></a>
    <a class="cancel-edit-option hide hover_cursor_pointer"><i class="fa-solid fa-xmark"></i></a>
    </div>
    </li>
    `
}

function saveData() {
    if(!taskList.children.length) {
        sendMessage("the task list is empty!!!!", "red");
        return;
    }

    if(!seekConfirmation("Submit list, any edits or deletions will be saved! (This action cannot be undone)")) return;
    localStorage.setItem("data", JSON.stringify(tasks));
}

function removeListElements() {
    taskList.innerHTML = "";
}

function resetData() {
    if(!taskList.children.length) {
        sendMessage("the task list is empty!!!!", "red");
        return;
    }

    if(!seekConfirmation("Delete the entire list! (This action cannot be undone!)")) return;

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
    if (!currentCheckbox.matches("input")) return;
    const identifier = currentCheckbox.id;
    tasks[identifier].done = currentCheckbox.checked;
}

function editTask(e) {
    if (!e.target.matches(".fa-pen")) return;
    const currentTask = e.target.closest('li');
    toggleOptions(currentTask);
    toggleBasicFunctionality(true, currentTask);
    currentTask.querySelector(".fa-xmark").addEventListener("click", cancelOrEndEdit);


    const labelElement = currentTask.querySelector("label");
    inputField.value = labelElement.innerText;
    inputField.addEventListener("keydown", (e) => {
        if (e.code !== "Enter") return;
        const currentTaskIndex = Number(labelElement.htmlFor);
        tasks[currentTaskIndex].text = inputField.value;
        console.log(labelElement.childNodes);
        labelElement.removeChild(labelElement.childNodes[2]);
        labelElement.append(inputField.value);
        inputField.value = "";
        inputField.blur();
        toggleOptions(currentTask);
        toggleBasicFunctionality(false, currentTask);
        sendMessage("Task successfully edited", "green");
        InputEventController.abort();
    }, {
        signal
    })
}

function toggleOptions(parentTask) {
    parentTask.querySelectorAll("a:not(.cancel-edit-option)").forEach((link) => link.classList.toggle("hide"));
    parentTask.querySelector(".cancel-edit-option").classList.toggle("hide");
}

/* a little bit of extra code that could be avoided if i used buttons instead of links (which I should have done) */

function toggleBasicFunctionality(indicator, parentTask) {
    const optionsBtn = document.querySelectorAll("button");
    const tasks = taskList.querySelectorAll("li");
    optionsBtn.forEach(btn => indicator ? btn.setAttribute("disabled", indicator) : btn.removeAttribute("disabled"));
    tasks.forEach((task) => {
        if (task === parentTask) return;
        const options = task.querySelectorAll("a:not(.cancel-edit-option)");
        options.forEach(link => link.classList.toggle("hide"));
    })
}

function cancelOrEndEdit(e) {
    const currentTask = e.target.closest('li');
    toggleOptions(currentTask);
    toggleBasicFunctionality(false, currentTask);
    e.target.removeEventListener("click", cancelOrEndEdit);
}

function deleteTask(e) {
    const clickedOption = e.target;
    if (!clickedOption.matches(".fa-trash")) return;
    const deletedTask = clickedOption.closest("li");
    const deletedTaskIndex = Number(deletedTask.querySelector("input").id);
    tasks.splice(deletedTaskIndex, 1);
    rerenderList();
    sendMessage("The task has been deleted.", "blue");
}

function displayList() {
    tasks.forEach(currentTask => populateList(currentTask));
}

function rerenderList() {
    if (!tasks.length) revealDisclaimer();
    removeListElements();
    displayList();
}

function sendMessage(messageText, color) {
    clearTimeout(timer);
    warningMessage.innerText = "";
    warningMessage.innerText = messageText;
    warningMessage.style.color = color;
    timer = setTimeout(()=> warningMessage.innerText = "", 2500);
}

function seekConfirmation(confirmationText) {
    const isConfirmed = confirm(confirmationText);
    return isConfirmed;
}

function checkTaskExistence(taskTextValue) {
    return tasks.some((currentTask)=> currentTask.text === taskTextValue);
}

function displayCheckedStyles(e) {
    const clickedCheckBox = e.target;
    if (!clickedCheckBox.matches("input[type='checkbox']")) return;

    const labelElement = clickedCheckBox.closest("label");

    if(clickedCheckBox.checked) {
        labelElement.style.color = "gray";
        labelElement.style.textDecoration = "line-through";
        clickedCheckBox.closest("li").querySelectorAll("a:not(.cancel-edit-option)").forEach((link) => link.classList.add("hide"));
    }

    if(!clickedCheckBox.checked) {
        labelElement.style.color = "black";
        labelElement.style["text-decoration"]= "none";
        clickedCheckBox.closest("li").querySelectorAll("a:not(.cancel-edit-option)").forEach((link) => link.classList.remove("hide"));
    }
}


// Basic Options
addTaskBtn.addEventListener("click", getTasks);
submitBtn.addEventListener("click", saveData);
resetBtn.addEventListener("click", resetData);

// Events related to list
taskList.addEventListener("click", setTaskStatus);
taskList.addEventListener("click", editTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", displayCheckedStyles);

window.addEventListener("load", () => {
    if (tasks.length) displayList();
})
