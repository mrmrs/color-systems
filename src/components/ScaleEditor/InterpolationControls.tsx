import type { ColorScale } from "../../types";
import "./InterpolationControls.css";

const SPACES = [
  { value: "oklch", label: "OKLCh" },
  { value: "oklab", label: "OKLab" },
  { value: "lch", label: "LCH" },
  { value: "lab", label: "Lab" },
  { value: "srgb", label: "sRGB" },
  { value: "p3", label: "Display P3" },
];

const HUE_MODES = [
  { value: "shorter", label: "Shorter" },
  { value: "longer", label: "Longer" },
  { value: "increasing", label: "Increasing" },
  { value: "decreasing", label: "Decreasing" },
];

interface InterpolationControlsProps {
  interpolationSpace: string;
  hueInterpolation: ColorScale["hueInterpolation"];
  stepCount: number;
  paddingStart: number;
  paddingEnd: number;
  onSpaceChange: (space: string) => void;
  onHueChange: (hue: ColorScale["hueInterpolation"]) => void;
  onStepCountChange: (count: number) => void;
  onPaddingChange: (paddingStart: number, paddingEnd: number) => void;
  onResetAll: () => void;
}

export function InterpolationControls({
  interpolationSpace,
  hueInterpolation,
  stepCount,
  paddingStart,
  paddingEnd,
  onSpaceChange,
  onHueChange,
  onStepCountChange,
  onPaddingChange,
  onResetAll,
}: InterpolationControlsProps) {
  return (
    <div className="interpolation-controls">
      <div className="interpolation-controls__field">
        <label className="interpolation-controls__label">Space</label>
        <select
          className="interpolation-controls__select"
          value={interpolationSpace}
          onChange={(e) => onSpaceChange(e.target.value)}
        >
          {SPACES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="interpolation-controls__field">
        <label className="interpolation-controls__label">Hue</label>
        <select
          className="interpolation-controls__select"
          value={hueInterpolation}
          onChange={(e) => onHueChange(e.target.value as ColorScale["hueInterpolation"])}
        >
          {HUE_MODES.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="interpolation-controls__field">
        <label className="interpolation-controls__label">Steps</label>
        <input
          type="range"
          className="interpolation-controls__range"
          min={3}
          max={24}
          value={stepCount}
          onChange={(e) => onStepCountChange(Number(e.target.value))}
        />
        <span className="interpolation-controls__value">{stepCount}</span>
      </div>

      <div className="interpolation-controls__field">
        <label className="interpolation-controls__label">Pad Start</label>
        <input
          type="range"
          className="interpolation-controls__range"
          min={0}
          max={0.5}
          step={0.01}
          value={paddingStart}
          onChange={(e) => onPaddingChange(Number(e.target.value), paddingEnd)}
        />
        <span className="interpolation-controls__value">{Math.round(paddingStart * 100)}%</span>
      </div>

      <div className="interpolation-controls__field">
        <label className="interpolation-controls__label">Pad End</label>
        <input
          type="range"
          className="interpolation-controls__range"
          min={0}
          max={0.5}
          step={0.01}
          value={paddingEnd}
          onChange={(e) => onPaddingChange(paddingStart, Number(e.target.value))}
        />
        <span className="interpolation-controls__value">{Math.round(paddingEnd * 100)}%</span>
      </div>

      <button className="interpolation-controls__reset" onClick={onResetAll}>
        Reset All Overrides
      </button>
    </div>
  );
}
