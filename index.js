import {
  saveTask,
  getTasks,
  getTask,
  onGetTask,
  deleteTask,
  updateTask,
} from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
let editStatus = false;
let id;

window.addEventListener("DOMContentLoaded", async () => {
  onGetTask((querySnapshot) => {
    let html = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      html += //html
        `
        <div>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button class="btn-delete" data-id="${doc.id}">Delete</button>
            <button class="btn-edit" data-id="${doc.id}">Edit</button>
        </div>
        `;
    });
    tasksContainer.innerHTML = html;
    tasksContainer.addEventListener("click", async ({ target }) => {
      if (target.className === "btn-delete") {
        deleteTask(target.dataset.id);
      }
      if (target.className === "btn-edit") {
        const doc = await getTask(target.dataset.id);
        const task = doc.data();
        taskForm["task-title"].value = task.title;
        taskForm["task-description"].value = task.description;
        editStatus = true;
        id = doc.id

        taskForm["btn-task-save"].textContent = "Update"
      }
    });
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];
  if (editStatus) {
    updateTask(id, {title:title.value, description:description.value});
    editStatus = false;
  } else {
    saveTask(title.value, description.value);
  }

  taskForm.reset();
});
