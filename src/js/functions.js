import { refs } from "./refs.js";
import { createTask, getTasks, updateTask, deleteTask } from "./api.js";

function onFormAddSubmitTask(e) {
  e.preventDefault();

  const value = e.target.elements.task.value.trim();
  if (!value) {
    alert("Будь ласка, введіть коректний текст!");
    e.target.reset();
    return;
  }
  createTask({ value, isDone: false }).then(addTaskToList).catch(onError);

  e.target.reset();
}

function onTaskBehaviour(e) {
  if (e.target.classList.contains("todo__task")) {
    e.target.parentNode.classList.toggle("todo__item--done");
    updateTask(
      e.target.parentNode.dataset.id,
      e.target.parentNode.classList.contains("todo__item--done"),
    ).catch((err) => {
      e.target.parentNode.classList.toggle("todo__item--done");
      onError(err);
    });
  } else if (e.target.classList.contains("todo__remove")) {
    deleteTask(e.target.parentNode.dataset.id)
      .then(() => {
        e.target.parentNode.remove();
      })
      .catch(onError);
  }
}

function addTaskToList({ value: text, id, isDone }) {
  refs.container.insertAdjacentHTML(
    "beforeend",
    createLi({ text, id, isDone }),
  );
}

function createLi({ text, id, isDone }) {
  return `<li class="todo__item js-todo-item ${isDone ? "todo__item--done" : ""}" data-id="${id}">
  <button class="todo__task js-todo-toggle" type="button">
    ${text}
  </button>
  <button
    class="todo__remove js-todo-remove"
    type="button"
    aria-label="Видалити задачу"
  >
    &times;
  </button>
</li>`;
}

function onRenderDB() {
  getTasks()
    .then((data) => {
      data.forEach(addTaskToList);
    })
    .catch(onError);
}

function onError(err) {
  const msg = err?.response?.statusText || err?.message || "Unknown error";

  alert("Error: " + msg);
}

export { onFormAddSubmitTask, onTaskBehaviour, onRenderDB };
