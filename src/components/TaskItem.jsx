import { useState, useRef, useEffect } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const startEdit = () => {
    setDraft(task.text);
    setIsEditing(true);
  };

  const commitEdit = () => {
    if (draft.trim()) {
      onEdit(task.id, draft);
      setIsEditing(false);
    }
  };

  const cancelEdit = () => {
    setDraft(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <li className={`task-item ${task.completed ? "task-item-done" : ""}`}>
      <button
        className="checkbox"
        role="checkbox"
        aria-checked={task.completed}
        aria-label={task.completed ? "Mark task as pending" : "Mark task as completed"}
        onClick={() => onToggle(task.id)}
      >
        {task.completed && <span className="checkmark">✓</span>}
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          className="edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitEdit}
        />
      ) : (
        <span className="task-text" onDoubleClick={startEdit}>
          {task.text}
        </span>
      )}

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="icon-btn" title="Save" onClick={commitEdit}>
              Save
            </button>
            <button className="icon-btn" title="Cancel" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="icon-btn" title="Edit task" onClick={startEdit}>
              Edit
            </button>
            <button
              className="icon-btn icon-btn-danger"
              title="Delete task"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
