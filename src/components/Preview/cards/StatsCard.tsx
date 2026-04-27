export function StatsCard() {
  return (
    <div className="p-card">
      <h3 className="p-card__title">Dashboard</h3>

      {/* Progress bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <div className="p-row p-row--between" style={{ marginBottom: 4 }}>
            <span className="p-label">Revenue</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--success)" }}>78%</span>
          </div>
          <div className="p-progress">
            <div className="p-progress__bar" style={{ width: "78%", background: "var(--success)" }} />
          </div>
        </div>
        <div>
          <div className="p-row p-row--between" style={{ marginBottom: 4 }}>
            <span className="p-label">Users</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--primary)" }}>52%</span>
          </div>
          <div className="p-progress">
            <div className="p-progress__bar" style={{ width: "52%", background: "var(--primary)" }} />
          </div>
        </div>
        <div>
          <div className="p-row p-row--between" style={{ marginBottom: 4 }}>
            <span className="p-label">Errors</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--danger)" }}>12%</span>
          </div>
          <div className="p-progress">
            <div className="p-progress__bar" style={{ width: "12%", background: "var(--danger)" }} />
          </div>
        </div>
        <div>
          <div className="p-row p-row--between" style={{ marginBottom: 4 }}>
            <span className="p-label">Storage</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--warning)" }}>91%</span>
          </div>
          <div className="p-progress">
            <div className="p-progress__bar" style={{ width: "91%", background: "var(--warning)" }} />
          </div>
        </div>
      </div>

      <hr className="p-sep" />

      {/* Alerts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div className="p-alert p-alert--success">✓ Deploy completed successfully</div>
        <div className="p-alert p-alert--warning">⚠ Storage usage above 90%</div>
        <div className="p-alert p-alert--error">✕ Build failed in CI pipeline</div>
        <div className="p-alert p-alert--info">ℹ New version available (v2.4.0)</div>
      </div>

      <hr className="p-sep" />

      {/* Color palette preview */}
      <div>
        <span className="p-label" style={{ marginBottom: 8, display: "block" }}>Color Tokens</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4 }}>
          {["red", "orange", "yellow", "green", "blue", "purple"].map((color) => (
            <div key={color} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[2, 4, 6, 8, 10].map((step) => (
                <div
                  key={step}
                  style={{
                    height: 16,
                    borderRadius: 3,
                    background: `var(--${color}-${step}, #ccc)`,
                  }}
                  title={`--${color}-${step}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
