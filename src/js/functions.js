import { refs } from "./refs.js";
import { createTask, getTasks, updateTask, deleteTask } from "./api.js";

async function onFormAddSubmitTask(e) {
  e.preventDefault();

  const value = e.target.elements.task.value.trim();
  if (!value) {
    alert("Будь ласка, введіть коректний текст!");
    e.target.reset();
    return;
  }

  try {
    const newTask = await createTask({ value, isDone: false });
    addTaskToList(newTask);
  } catch (error) {
    onError(error);
  }

  e.target.reset();
}

async function onTaskBehaviour(e) {
  const id = e.target.parentNode.dataset.id;

  if (e.target.classList.contains("todo__task")) {
    const li = e.target.parentNode;
    li.classList.toggle("todo__item--done");

    try {
      await updateTask(id, li.classList.contains("todo__item--done"));
    } catch (error) {
      li.classList.toggle("todo__item--done"); // rollback
      onError(error);
    }
  } else if (e.target.classList.contains("todo__remove")) {
    try {
      await deleteTask(id);
      e.target.parentNode.remove();
    } catch (error) {
      onError(error);
    }
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

async function onRenderDB() {
  try {
    const tasks = await getTasks();
    tasks.forEach(addTaskToList);
  } catch (error) {
    onError(error);
  }
}

function onError(err) {
  const msg = err?.response?.statusText || err?.message || "Unknown error";

  alert("Error: " + msg);
}

export { onFormAddSubmitTask, onTaskBehaviour, onRenderDB };
