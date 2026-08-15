import { useState, useEffect, useMemo } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TallyStrip from "./components/TallyStrip.jsx";
import "./App.css";

const STORAGE_KEY = "tally.tasks";

// Load any previously saved tasks so the list survives a page refresh.
function loadInitialTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadInitialTasks);
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'

  // Persist to localStorage whenever the task list changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return; // guard against empty tasks
    const newTask = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return; // don't allow editing into an empty task
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );
  };

  const counts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    }),
    [tasks]
  );

  const visibleTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="app-card">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">✓</span>
          <div>
            <h1>Tally</h1>
            <p className="subtitle">Keep a running count of what's done.</p>
          </div>
        </div>
        <TallyStrip total={counts.all} completed={counts.completed} />
      </header>

      <TaskForm onAdd={addTask} />

      <FilterBar filter={filter} setFilter={setFilter} counts={counts} />

      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
        emptyMessage={
          tasks.length === 0
            ? "No tasks yet. Add your first one above."
            : filter === "completed"
            ? "Nothing completed yet."
            : "You're all caught up."
        }
      />
    </div>
  );
}
