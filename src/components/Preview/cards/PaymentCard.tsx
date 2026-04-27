import { useState } from "react";

export function PaymentCard() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="p-card">
      <h3 className="p-card__title">Payment Method</h3>
      <p className="p-card__subtitle">All transactions are secure and encrypted</p>

      <div className="p-field">
        <label className="p-label">Name on Card</label>
        <input className="p-input" placeholder="John Doe" defaultValue="John Doe" />
      </div>

      <div className="p-field--row">
        <div className="p-field" style={{ flex: 2 }}>
          <label className="p-label">Card Number</label>
          <input className="p-input" placeholder="1234 5678 9012 3456" />
        </div>
        <div className="p-field" style={{ flex: 1 }}>
          <label className="p-label">CVV</label>
          <input className="p-input" placeholder="123" />
        </div>
      </div>

      <div className="p-field--row">
        <div className="p-field">
          <label className="p-label">Month</label>
          <select className="p-input">
            <option>MM</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i}>{String(i + 1).padStart(2, "0")}</option>
            ))}
          </select>
        </div>
        <div className="p-field">
          <label className="p-label">Year</label>
          <select className="p-input">
            <option>YYYY</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i}>{2024 + i}</option>
            ))}
          </select>
        </div>
      </div>

      <hr className="p-sep" />

      <h4 className="p-card__title" style={{ fontSize: 15 }}>Billing Address</h4>
      <p className="p-card__subtitle">The billing address associated with your payment method</p>

      <label className="p-row" style={{ cursor: "pointer" }} onClick={() => setChecked(!checked)}>
        <span className={`p-check ${checked ? "p-check--checked" : ""}`}>
          {checked && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </span>
        <span className="p-label">Same as shipping address</span>
      </label>

      <div className="p-field">
        <label className="p-label">Comments</label>
        <textarea className="p-input p-textarea" placeholder="Add any additional comments" />
      </div>

      <div className="p-row" style={{ gap: 10 }}>
        <button className="p-btn p-btn--primary">Submit</button>
        <button className="p-btn p-btn--secondary">Cancel</button>
      </div>
    </div>
  );
}
