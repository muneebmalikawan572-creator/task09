const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Pending" },
  { key: "completed", label: "Completed" },
];

export default function FilterBar({ filter, setFilter, counts }) {
  return (
    <div className="filter-bar" role="tablist" aria-label="Filter tasks">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          role="tab"
          aria-selected={filter === key}
          className={`filter-btn ${filter === key ? "filter-btn-active" : ""}`}
          onClick={() => setFilter(key)}
        >
          {label}
          <span className="filter-count">{counts[key]}</span>
        </button>
      ))}
    </div>
  );
}
