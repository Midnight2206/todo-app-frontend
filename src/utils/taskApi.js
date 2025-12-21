const API_URL = "http://localhost:3000/api/tasks";

export async function getTasks() {
  const res = await fetch(API_URL);
  console.log(res);
  
  return res.json();
}
export async function getTask(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function createTask(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateTask(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function toggleCompleted(id) {
  const res = await fetch(
    `${API_URL}/${id}/toggle-completed`,
    { method: "PATCH" }
  );
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
