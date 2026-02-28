const BASE_URL = "https://69a2bd22be843d692bd21e97.mockapi.io/api/todos";

// POST
function createTask(task) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((response) => response.json());
}

// GET
function getTasks() {
  return fetch(BASE_URL).then((response) => response.json());
}

// DELETE
function deleteTask(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
}

// PUT
function updateTask(id, status) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isDone: status }),
  });
}
export { createTask, getTasks, deleteTask, updateTask };
