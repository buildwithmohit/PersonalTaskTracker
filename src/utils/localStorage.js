const USER_KEY = "task-tracker-username";
const TASKS_KEY = username => `task-tracker-${username}-tasks`;

export function saveUsername(username) {
  localStorage.setItem(USER_KEY, username);
}

export function getUsername() {
  return localStorage.getItem(USER_KEY);
}

export function clearUsername() {
  localStorage.removeItem(USER_KEY);
}

export function saveTasks(username, tasks) {
  localStorage.setItem(TASKS_KEY(username), JSON.stringify(tasks));
}

export function getTasks(username) {
  const data = localStorage.getItem(TASKS_KEY(username));
  return data ? JSON.parse(data) : [];
}