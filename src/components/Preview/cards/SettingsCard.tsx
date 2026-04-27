import { useState } from "react";

export function SettingsCard() {
  const [selected, setSelected] = useState<"k8s" | "vm">("k8s");
  const [wallpaper, setWallpaper] = useState(true);
  const [twoFa, setTwoFa] = useState(false);
  const [gpus, setGpus] = useState(8);

  return (
    <div className="p-card">
      <div className="p-url-bar">
        <span className="p-url-bar__icon">🔒</span>
        <span className="p-url-bar__url">https://</span>
        <span style={{ marginLeft: "auto", color: "var(--text-muted)" }}>☆</span>
      </div>

      <div className="p-row p-row--between">
        <div>
          <h4 style={{ margin: 0, fontSize: 14, color: "var(--text)" }}>Two-factor authentication</h4>
          <p style={{ margin: 0, fontSize: 12, color: "var(--text-secondary)" }}>Verify via email or phone number.</p>
        </div>
        <button className="p-btn p-btn--primary p-btn--sm" onClick={() => setTwoFa(!twoFa)}>
          {twoFa ? "Disable" : "Enable"}
        </button>
      </div>

      <div className="p-alert p-alert--success">
        ✓ Your profile has been verified.
      </div>

      <hr className="p-sep" />

      <div>
        <h4 style={{ margin: "0 0 4px", fontSize: 14, color: "var(--text)" }}>Compute Environment</h4>
        <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--text-secondary)" }}>Select the compute environment for your cluster.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            className={`p-radio-card ${selected === "k8s" ? "p-radio-card--selected" : ""}`}
            onClick={() => setSelected("k8s")}
          >
            <div className="p-row p-row--between">
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>Kubernetes</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Run GPU workloads on a K8s configured cluster.</div>
              </div>
              <div className="p-radio-card__dot" />
            </div>
          </div>

          <div
            className={`p-radio-card ${selected === "vm" ? "p-radio-card--selected" : ""}`}
            onClick={() => setSelected("vm")}
          >
            <div className="p-row p-row--between">
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>Virtual Machine</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Access a VM configured cluster. (Coming soon)</div>
              </div>
              <div className="p-radio-card__dot" />
            </div>
          </div>
        </div>
      </div>

      <hr className="p-sep" />

      <div className="p-row p-row--between">
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>Number of GPUs</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>You can add more later.</div>
        </div>
        <div className="p-stepper">
          <button className="p-stepper__btn" onClick={() => setGpus(Math.max(1, gpus - 1))}>−</button>
          <span className="p-stepper__value">{gpus}</span>
          <button className="p-stepper__btn" onClick={() => setGpus(gpus + 1)}>+</button>
        </div>
      </div>

      <div className="p-row p-row--between">
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>Wallpaper Tinting</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Allow the wallpaper to be tinted.</div>
        </div>
        <button className={`p-toggle ${wallpaper ? "p-toggle--on" : ""}`} onClick={() => setWallpaper(!wallpaper)}>
          <div className="p-toggle__thumb" />
        </button>
      </div>
    </div>
  );
}
