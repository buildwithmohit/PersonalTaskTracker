import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";
import { getTasks, saveTasks, clearUsername } from "../utils/localStorage";

function TaskList({ username }) {
  const [tasks, setTasks] = useState(getTasks(username));
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    saveTasks(username, tasks);
  }, [tasks, username]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setShowForm(false);
  };

  const updateTask = updatedTask => {
    setTasks(tasks.map(t => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t)));
  };

  const deleteTask = id => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleTask = id => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <strong>Welcome, {username}!</strong>
        </div>
        <button className="logout-btn" onClick={() => { clearUsername(); window.location.reload(); }}>
          Logout
        </button>
      </div>
      <TaskFilter filter={filter} setFilter={setFilter} counts={counts} />
      <button onClick={() => setShowForm(s => !s)}>
        {showForm ? "Close" : "Add Task"}
      </button>
      {showForm && <TaskForm onSave={addTask} onCancel={() => setShowForm(false)} />}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">No tasks to show.</div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={updateTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;