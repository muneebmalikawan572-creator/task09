# Tally — React To-Do List

A to-do list app built with React functional components and the `useState` /
`useEffect` hooks.

## Features

- **Add tasks** — empty or whitespace-only input is rejected, with an inline
  error message.
- **Display tasks** — shown in a styled list with a live "tally" progress
  strip at the top (one pip per task, filled in as tasks are completed).
- **Mark as completed** — click the checkbox; completed tasks get a
  strikethrough and a muted, tinted row.
- **Delete tasks** — instantly removes a task from the list.
- **Edit tasks** — double-click a task's text (or use the Edit button) to
  rename it in place; Enter saves, Escape cancels.
- **Filter tasks** — All / Pending / Completed tabs, each with a live count.
- **Local storage** — tasks persist across page refreshes.
- **Responsive UI** — usable down to small mobile widths.

## Project structure

```
src/
  App.jsx                  // top-level state: tasks, filter, CRUD handlers
  App.css                  // component styles / design system
  index.css                // global reset
  main.jsx                 // React root
  components/
    TaskForm.jsx            // add-task input + validation
    FilterBar.jsx            // All / Pending / Completed tabs
    TaskList.jsx              // renders TaskItem list or empty state
    TaskItem.jsx                // checkbox, text, inline edit, delete
    TallyStrip.jsx                // progress pips (signature UI element)
```

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```
