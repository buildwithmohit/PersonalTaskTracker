import React, { useState } from "react";
import TaskForm from "./TaskForm";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = updatedTask => {
    onEdit(updatedTask);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : "pending"}`}>
      {isEditing ? (
        <TaskForm existingTask={task} onSave={handleEdit} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <div className="task-main">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <div className="task-details">
              <div className="task-title">{task.title}</div>
              {task.description && <div className="task-desc">{task.description}</div>}
              <div className="task-date">
                Created: {new Date(task.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => window.confirm("Delete this task?") && onDelete(task.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;