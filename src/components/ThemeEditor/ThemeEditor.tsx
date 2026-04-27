import { useScaleState, useScaleDispatch } from "../../state/ScaleContext";
import type { SemanticToken, TokenRef, ThemeMode } from "../../types";
import "./ThemeEditor.css";

const GROUPS = [
  { key: "bg", label: "Backgrounds" },
  { key: "text", label: "Text" },
  { key: "border", label: "Borders" },
  { key: "accent", label: "Accent / Primary" },
  { key: "feedback", label: "Feedback" },
];

function refToVar(ref: TokenRef): string {
  return `var(--${ref.scale}-${ref.step})`;
}

function refToLabel(ref: TokenRef): string {
  return `${ref.scale}-${ref.step}`;
}

function TokenRow({ token, mode }: { token: SemanticToken; mode: ThemeMode }) {
  const dispatch = useScaleDispatch();
  const current = token[mode];
  const candidateIdx = token.candidates.findIndex(
    (c) => c.scale === current.scale && c.step === current.step
  );

  return (
    <div className="theme-token">
      <div className="theme-token__info">
        <span className="theme-token__label">{token.label}</span>
        <code className="theme-token__var">--{token.id}</code>
      </div>

      <div className="theme-token__controls">
        <button
          className="theme-token__cycle-btn"
          onClick={() => dispatch({ type: "CYCLE_TOKEN", tokenId: token.id, direction: -1 })}
          title="Previous candidate"
        >
          ‹
        </button>

        <div className="theme-token__current">
          <div
            className="theme-token__swatch"
            style={{ background: refToVar(current) }}
          />
          <span className="theme-token__ref">{refToLabel(current)}</span>
          <span className="theme-token__count">
            {candidateIdx + 1}/{token.candidates.length}
          </span>
        </div>

        <button
          className="theme-token__cycle-btn"
          onClick={() => dispatch({ type: "CYCLE_TOKEN", tokenId: token.id, direction: 1 })}
          title="Next candidate"
        >
          ›
        </button>
      </div>

      {/* Candidate strip */}
      <div className="theme-token__candidates">
        {token.candidates.map((cand, i) => {
          const isActive = cand.scale === current.scale && cand.step === current.step;
          return (
            <button
              key={`${cand.scale}-${cand.step}`}
              className={`theme-token__cand ${isActive ? "theme-token__cand--active" : ""}`}
              style={{ background: refToVar(cand) }}
              title={refToLabel(cand)}
              onClick={() =>
                dispatch({ type: "SET_TOKEN_VALUE", tokenId: token.id, mode, ref: cand })
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export function ThemeEditor() {
  const state = useScaleState();
  const dispatch = useScaleDispatch();
  const { mode, tokens } = state.theme;

  return (
    <div className="theme-editor">
      <div className="theme-editor__header">
        <h3 className="theme-editor__title">Theme Tokens</h3>
        <div className="theme-editor__mode-toggle">
          <button
            className={`theme-editor__mode-btn ${mode === "light" ? "theme-editor__mode-btn--active" : ""}`}
            onClick={() => dispatch({ type: "SET_THEME_MODE", mode: "light" })}
          >
            ☀ Light
          </button>
          <button
            className={`theme-editor__mode-btn ${mode === "dark" ? "theme-editor__mode-btn--active" : ""}`}
            onClick={() => dispatch({ type: "SET_THEME_MODE", mode: "dark" })}
          >
            ● Dark
          </button>
        </div>
      </div>

      <div className="theme-editor__groups">
        {GROUPS.map((group) => {
          const groupTokens = tokens.filter((t) => t.group === group.key);
          if (groupTokens.length === 0) return null;
          return (
            <div key={group.key} className="theme-editor__group">
              <h4 className="theme-editor__group-label">{group.label}</h4>
              {groupTokens.map((token) => (
                <TokenRow key={token.id} token={token} mode={mode} />
              ))}
            </div>
          );
        })}
      </div>

      <button
        className="theme-editor__reset"
        onClick={() => dispatch({ type: "RESET_THEME" })}
      >
        Reset Theme
      </button>
    </div>
  );
}
