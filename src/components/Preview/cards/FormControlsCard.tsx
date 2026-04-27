import { useState } from "react";

export function FormControlsCard() {
  const [source, setSource] = useState("social");
  const [agree, setAgree] = useState(true);
  const [notify, setNotify] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-card">
      <h3 className="p-card__title" style={{ fontSize: 15 }}>How did you hear about us?</h3>
      <p className="p-card__subtitle">Select the option that best describes how you...</p>

      <div className="p-row p-row--wrap" style={{ gap: 6 }}>
        {[
          { id: "social", label: "Social Media" },
          { id: "search", label: "Search Engine" },
          { id: "referral", label: "Referral" },
          { id: "other", label: "Other" },
        ].map((opt) => (
          <button
            key={opt.id}
            className={`p-chip ${source === opt.id ? "p-chip--selected" : ""}`}
            onClick={() => setSource(opt.id)}
          >
            {source === opt.id && "✓ "}
            {opt.label}
          </button>
        ))}
      </div>

      <hr className="p-sep" />

      {/* Checkboxes */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label className="p-row" style={{ cursor: "pointer" }} onClick={() => setAgree(!agree)}>
          <span className={`p-check ${agree ? "p-check--checked" : ""}`}>
            {agree && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </span>
          <span style={{ fontSize: 14, color: "var(--text)" }}>I agree to the terms and conditions</span>
        </label>

        <label className="p-row" style={{ cursor: "pointer" }} onClick={() => setNotify(!notify)}>
          <span className={`p-check ${notify ? "p-check--checked" : ""}`}>
            {notify && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </span>
          <span style={{ fontSize: 14, color: "var(--text)" }}>Send me email notifications</span>
        </label>
      </div>

      <hr className="p-sep" />

      {/* Toggles */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="p-row p-row--between">
          <div>
            <div style={{ fontWeight: 500, fontSize: 14, color: "var(--text)" }}>Dark Mode</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Switch to dark color scheme</div>
          </div>
          <button className={`p-toggle ${darkMode ? "p-toggle--on" : ""}`} onClick={() => setDarkMode(!darkMode)}>
            <div className="p-toggle__thumb" />
          </button>
        </div>
      </div>

      <hr className="p-sep" />

      {/* Text inputs */}
      <div className="p-field">
        <label className="p-label">Email</label>
        <input className="p-input" type="email" placeholder="you@example.com" />
      </div>

      <div className="p-field">
        <label className="p-label">Password</label>
        <input className="p-input" type="password" placeholder="••••••••" />
      </div>

      <div className="p-row" style={{ gap: 10 }}>
        <button className="p-btn p-btn--primary" style={{ flex: 1 }}>Sign In</button>
        <button className="p-btn p-btn--ghost">Forgot password?</button>
      </div>
    </div>
  );
}
