import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError(true);
      return;
    }
    onAdd(text);
    setText("");
    setError(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        value={text}
        placeholder="What needs doing?"
        aria-label="New task"
        onChange={(e) => {
          setText(e.target.value);
          if (error) setError(false);
        }}
        className={error ? "input-error" : ""}
      />
      <button type="submit" className="btn-primary">
        Add task
      </button>
      {error && <p className="form-error">Enter a task before adding it.</p>}
    </form>
  );
}
