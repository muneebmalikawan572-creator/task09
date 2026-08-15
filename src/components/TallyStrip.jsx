// A row of pips, one per task, filled in as tasks are completed.
// Doubles as the app's signature visual: a literal "tally" of progress.
export default function TallyStrip({ total, completed }) {
  if (total === 0) {
    return <div className="tally-strip tally-empty">0 / 0 done</div>;
  }

  const pips = Array.from({ length: total }, (_, i) => i < completed);

  return (
    <div className="tally-strip">
      <div className="tally-pips" aria-hidden="true">
        {pips.map((filled, i) => (
          <span key={i} className={`pip ${filled ? "pip-filled" : ""}`} />
        ))}
      </div>
      <span className="tally-count">
        {completed} / {total} done
      </span>
    </div>
  );
}
