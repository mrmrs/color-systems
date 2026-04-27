export function FeedbackCard() {
  return (
    <div className="p-card">
      {/* Spinner / loading state */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "16px 0" }}>
        <div className="p-spinner" />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text)" }}>Processing your request</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>Please wait while we process your request. Do not refresh the page.</div>
        </div>
        <button className="p-btn p-btn--secondary p-btn--sm">Cancel</button>
      </div>

      <hr className="p-sep" />

      {/* Context menu style list */}
      <div style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        overflow: "hidden",
      }}>
        {[
          { label: "Profile", shortcut: "⌘P", color: "var(--text)" },
          { label: "Settings", shortcut: "⌘,", color: "var(--text)" },
          { label: "Notifications", badge: "3", color: "var(--text)" },
          { label: "sep" },
          { label: "Upgrade Plan", color: "var(--primary)" },
          { label: "sep" },
          { label: "Sign Out", color: "var(--danger)" },
        ].map((item, i) => {
          if (item.label === "sep") return <hr key={i} className="p-sep" />;
          return (
            <div
              key={i}
              className="p-row p-row--between"
              style={{
                padding: "9px 14px",
                fontSize: 13,
                color: item.color,
                cursor: "pointer",
                transition: "background 100ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-muted)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <span>{item.label}</span>
              {"shortcut" in item && item.shortcut && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{item.shortcut}</span>}
              {"badge" in item && <span className="p-badge p-badge--red" style={{ fontSize: 10, padding: "1px 6px" }}>{item.badge}</span>}
            </div>
          );
        })}
      </div>

      <hr className="p-sep" />

      {/* Data table mini */}
      <div style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        overflow: "hidden",
        fontSize: 13,
      }}>
        <div className="p-row" style={{
          background: "var(--bg-muted)",
          padding: "8px 14px",
          fontWeight: 600,
          color: "var(--text-secondary)",
          borderBottom: "1px solid var(--border)",
        }}>
          <span style={{ flex: 2 }}>Name</span>
          <span style={{ flex: 1 }}>Status</span>
          <span style={{ flex: 1, textAlign: "right" }}>Amount</span>
        </div>
        {[
          { name: "Alice Johnson", status: "Active", statusColor: "green", amount: "$2,400" },
          { name: "Bob Smith", status: "Pending", statusColor: "orange", amount: "$1,800" },
          { name: "Carol Davis", status: "Failed", statusColor: "red", amount: "$950" },
        ].map((row, i) => (
          <div key={i} className="p-row" style={{
            padding: "10px 14px",
            color: "var(--text)",
            borderBottom: i < 2 ? "1px solid var(--border)" : "none",
          }}>
            <span style={{ flex: 2 }}>{row.name}</span>
            <span style={{ flex: 1 }}><span className={`p-badge p-badge--${row.statusColor}`}>{row.status}</span></span>
            <span style={{ flex: 1, textAlign: "right", fontFamily: "var(--mono)", fontWeight: 500 }}>{row.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
