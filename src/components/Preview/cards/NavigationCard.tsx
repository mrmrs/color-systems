import { useState } from "react";

export function NavigationCard() {
  const [tab, setTab] = useState(0);
  const tabs = ["Overview", "Analytics", "Reports", "Settings"];

  return (
    <div className="p-card">
      {/* Pill group navigation */}
      <div className="p-row p-row--between">
        <div className="p-pill-group">
          {tabs.map((t, i) => (
            <button
              key={t}
              className={`p-pill ${tab === i ? "p-pill--active" : ""}`}
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <hr className="p-sep" />

      {/* Action row */}
      <div className="p-row" style={{ gap: 6 }}>
        <button className="p-btn p-btn--ghost p-btn--sm">← Back</button>
        <button className="p-btn p-btn--secondary p-btn--sm">Archive</button>
        <button className="p-btn p-btn--secondary p-btn--sm">Report</button>
        <button className="p-btn p-btn--secondary p-btn--sm">Snooze</button>
        <button className="p-btn p-btn--ghost p-btn--sm">···</button>
      </div>

      <hr className="p-sep" />

      {/* Pagination */}
      <div className="p-row p-row--between">
        <div className="p-pagination">
          <button className="p-page p-page--active">1</button>
          <button className="p-page">2</button>
          <button className="p-page">3</button>
          <button className="p-page">←</button>
          <button className="p-page">→</button>
        </div>
        <div className="p-pill-group">
          <button className="p-pill p-pill--active">Copilot</button>
          <button className="p-pill">Manual</button>
        </div>
      </div>

      <hr className="p-sep" />

      {/* Badges grid */}
      <div>
        <span className="p-label" style={{ marginBottom: 8, display: "block" }}>Status Badges</span>
        <div className="p-row p-row--wrap" style={{ gap: 6 }}>
          <span className="p-badge p-badge--green">Active</span>
          <span className="p-badge p-badge--blue">In Review</span>
          <span className="p-badge p-badge--orange">Pending</span>
          <span className="p-badge p-badge--red">Failed</span>
          <span className="p-badge p-badge--purple">Deployed</span>
          <span className="p-badge p-badge--slate">Draft</span>
        </div>
      </div>

      <hr className="p-sep" />

      {/* Button variations */}
      <div>
        <span className="p-label" style={{ marginBottom: 8, display: "block" }}>Actions</span>
        <div className="p-row p-row--wrap" style={{ gap: 8 }}>
          <button className="p-btn p-btn--primary">Primary</button>
          <button className="p-btn p-btn--secondary">Secondary</button>
          <button className="p-btn p-btn--danger">Delete</button>
          <button className="p-btn p-btn--success">Approve</button>
          <button className="p-btn p-btn--ghost">Ghost</button>
        </div>
      </div>
    </div>
  );
}
