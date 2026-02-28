import { refs } from "./refs.js";
import {
  onFormAddSubmitTask,
  onTaskBehaviour,
  onRenderDB,
} from "./functions.js";

refs.form.addEventListener("submit", onFormAddSubmitTask);
refs.container.addEventListener("click", onTaskBehaviour);
window.addEventListener("DOMContentLoaded", onRenderDB);
