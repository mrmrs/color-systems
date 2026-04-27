export function TeamCard() {
  return (
    <div className="p-card" style={{ alignItems: "center", textAlign: "center" }}>
      <div className="p-row" style={{ gap: 0 }}>
        <div className="p-avatar" style={{ background: "var(--purple-5, #7c3aed)", marginRight: -8, zIndex: 2 }}>AB</div>
        <div className="p-avatar" style={{ background: "var(--cyan-5, #06b6d4)", marginRight: -8, zIndex: 1 }}>CD</div>
        <div className="p-avatar" style={{ background: "var(--success)" }}>EF</div>
      </div>

      <h3 className="p-card__title">No Team Members</h3>
      <p className="p-card__subtitle" style={{ margin: 0 }}>Invite your team to collaborate on this project.</p>

      <button className="p-btn p-btn--secondary">+ Invite Members</button>

      <hr className="p-sep" style={{ width: "100%" }} />

      <div className="p-row p-row--wrap" style={{ justifyContent: "center", gap: 6 }}>
        <span className="p-badge p-badge--blue">Syncing</span>
        <span className="p-badge p-badge--orange">Updating</span>
        <span className="p-badge p-badge--slate">Loading</span>
      </div>

      <hr className="p-sep" style={{ width: "100%" }} />

      <div className="p-field" style={{ width: "100%" }}>
        <label className="p-label">Price Range</label>
        <p className="p-card__subtitle" style={{ margin: 0 }}>Set your budget range ($200 - 800).</p>
        <div style={{ padding: "8px 0" }}>
          <div className="p-slider">
            <div className="p-slider__fill" style={{ width: "65%" }} />
            <div className="p-slider__thumb" style={{ left: "25%" }} />
            <div className="p-slider__thumb" style={{ left: "75%" }} />
          </div>
        </div>
      </div>

      <hr className="p-sep" style={{ width: "100%" }} />

      <div className="p-row p-row--between" style={{ width: "100%" }}>
        <div className="p-row" style={{ flex: 1 }}>
          <span style={{ color: "var(--text-muted)" }}>🔍</span>
          <span style={{ color: "var(--text-muted)", fontSize: 14 }}>Search...</span>
        </div>
        <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>12 results</span>
      </div>
    </div>
  );
}
