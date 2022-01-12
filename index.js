import { saveTask, getTasks, onGetTask, deleteTask } from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

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
        </div>
        `;
    });
    tasksContainer.innerHTML = html;
    tasksContainer.addEventListener("click", ({target}) => {
        if (target.className === "btn-delete") {
            deleteTask(target.dataset.id)
        }
    })
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];
  saveTask(title.value, description.value);

  taskForm.reset();
});
