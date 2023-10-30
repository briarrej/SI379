import moment from 'moment';

const descriptionInput = document.querySelector("#task_description_input");
const dueDateInput     = document.querySelector("#duedate_input");
const dueTimeInput     = document.querySelector("#duetime_input");

const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
// get the offset of the current timezone (in milliseconds)

addTask("Buy milk", 1698350000000);
addTask("Set clock forward for DST", 1699167600000);

/**
 * Adds a new task to the task list
 * 
 * @param {string} description The description of the task
 * @param {number} dueTime The due time of the task (as a timestamp)
 */
function addTask(description, dueTime) {
    const dueDate = new Date(dueTime); // convert the timestamp to a Date object
    const taskList = document.querySelector("#task_list");

    const dueTimeNode = document.createElement("span"); // Will hold the due time
    dueTimeNode.classList.add("due"); 
    dueTimeNode.innerText = dueDate.toDateString() + ' ' + dueDate.toTimeString(); // Due date + time
    dueTimeNode.innerText = moment(dueDate).fromNow(); // uncomment this when moment is installed

    const removeButton = document.createElement("button"); // create a new button
    removeButton.classList.add("remove"); // add the "remove" class to the button
    removeButton.innerText = "Remove"; // set the button text to "Remove"


    const newTask = document.createElement("li"); // create a new task container (list item)
    newTask.append(description, dueTimeNode, removeButton); // append the description and the due time to the new task
    taskList.append(newTask); // append the new task to the task list

    removeButton.addEventListener("click", () => {
        newTask.remove(); // remove the task from the task list
    });
}

const addTaskButton = document.getElementById("add_task");
addTaskButton.addEventListener("click", () => {
    const description = descriptionInput.value; // The description of the task
    const dueDate = dueDateInput.valueAsNumber; // get the due date as a timestamp
    const dueTime = dueTimeInput.valueAsNumber; // get the due time as a timestamp
    const fullDueDate = dueDate + dueTime + timezoneOffset; // combine the due date and time into a single timestamp

    addTask(description, fullDueDate);

    descriptionInput.value = ''; // clear the description input
});