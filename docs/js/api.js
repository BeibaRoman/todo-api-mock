import axios from "axios";

const BASE_URL = "https://69a2bd22be843d692bd21e97.mockapi.io/api/todos";

// POST
async function createTask(task) {
  try {
    const response = await axios.post(BASE_URL, task);
    return response.data;
  } catch (error) {
    console.error("Помилка створення задачі:", error);
    throw error;
  }
}

// GET
async function getTasks() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Помилка читання:", error);
    throw error;
  }
}

// DELETE
async function deleteTask(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка видалення:", error);
    throw error;
  }
}

// PUT
async function updateTask(id, status) {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, { isDone: status });
    return response.data;
  } catch (error) {
    console.error("Помилка оновлення:", error);
    throw error;
  }
}
export { createTask, getTasks, deleteTask, updateTask };
