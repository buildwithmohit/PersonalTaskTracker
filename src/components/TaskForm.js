import React, { useState, useEffect } from "react";

function TaskForm({ onSave, onCancel, existingTask }) {
  const [title, setTitle] = useState(existingTask ? existingTask.title : "");
  const [description, setDescription] = useState(existingTask ? existingTask.description : "");

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description || "");
    }
  }, [existingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      ...existingTask,
      title,
      description,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        required
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit">{existingTask ? "Update" : "Add"} Task</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

export default TaskForm;