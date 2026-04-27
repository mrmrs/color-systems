export function ChatCard() {
  return (
    <div className="p-card">
      <div className="p-row p-row--between">
        <h3 className="p-card__title" style={{ fontSize: 14 }}>Chat</h3>
        <span className="p-badge p-badge--green">Online</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Incoming message */}
        <div className="p-row" style={{ alignItems: "flex-start", gap: 10 }}>
          <div className="p-avatar" style={{ background: "var(--purple-5, #7c3aed)", width: 28, height: 28, fontSize: 11 }}>AI</div>
          <div style={{
            background: "var(--bg-muted)",
            borderRadius: "12px 12px 12px 4px",
            padding: "10px 14px",
            fontSize: 13,
            color: "var(--text)",
            maxWidth: "80%",
          }}>
            How can I help you today? I can answer questions, write code, or analyze data.
          </div>
        </div>

        {/* Outgoing message */}
        <div className="p-row" style={{ alignItems: "flex-start", gap: 10, justifyContent: "flex-end" }}>
          <div style={{
            background: "var(--primary)",
            borderRadius: "12px 12px 4px 12px",
            padding: "10px 14px",
            fontSize: 13,
            color: "var(--primary-text, white)",
            maxWidth: "80%",
          }}>
            Can you help me pick colors for a design system?
          </div>
        </div>

        {/* Incoming */}
        <div className="p-row" style={{ alignItems: "flex-start", gap: 10 }}>
          <div className="p-avatar" style={{ background: "var(--purple-5, #7c3aed)", width: 28, height: 28, fontSize: 11 }}>AI</div>
          <div style={{
            background: "var(--bg-muted)",
            borderRadius: "12px 12px 12px 4px",
            padding: "10px 14px",
            fontSize: 13,
            color: "var(--text)",
            maxWidth: "80%",
          }}>
            Absolutely! What kind of palette are you looking for?
          </div>
        </div>
      </div>

      <hr className="p-sep" />

      {/* Input bar */}
      <div className="p-row" style={{ gap: 10 }}>
        <input className="p-input" placeholder="Send a message..." style={{ flex: 1 }} />
        <button className="p-btn p-btn--primary p-btn--sm" style={{ borderRadius: "50%", width: 36, height: 36, padding: 0 }}>↑</button>
      </div>

      <hr className="p-sep" />

      {/* URL input */}
      <div className="p-field">
        <input className="p-input" placeholder="https:// example.com" />
      </div>

      {/* Composer-style input */}
      <div style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 14,
        color: "var(--text-muted)",
      }}>
        Ask, Search or Chat...
      </div>

      <div className="p-row p-row--between">
        <div className="p-row" style={{ gap: 4 }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>+</span>
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Auto</span>
        </div>
        <div className="p-row" style={{ gap: 6 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>52% used</span>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12 }}>↑</div>
        </div>
      </div>

      <div className="p-row p-row--between" style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "8px 12px",
      }}>
        <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>@shadcn</span>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10 }}>✓</div>
      </div>
    </div>
  );
}
