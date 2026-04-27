import { useState, useCallback, useMemo } from "react";
import Color from "colorjs.io";
import type { PickerMode } from "../../types";
import { colorFromCoords, colorToOklch, colorToHsl, colorToHex, colorToP3CssString, isInSrgbGamut, parseColorString, colorToP3Coords } from "../../lib/color";
import { OklchPicker } from "./OklchPicker";
import { HslPicker } from "./HslPicker";
import { RgbSliders } from "./RgbSliders";
import "./ColorPicker.css";

interface ColorPickerProps {
  color: [number, number, number];
  alpha?: number;
  onChange: (color: [number, number, number], alpha?: number) => void;
  onClose?: () => void;
}

export function ColorPicker({ color, alpha = 1, onChange, onClose }: ColorPickerProps) {
  const [mode, setMode] = useState<PickerMode>("oklch");
  const [textInput, setTextInput] = useState("");

  const colorObj = useMemo(() => colorFromCoords(color, alpha), [color, alpha]);
  const oklch = useMemo(() => colorToOklch(colorObj), [colorObj]);
  const hsl = useMemo(() => colorToHsl(colorObj), [colorObj]);
  const hex = useMemo(() => colorToHex(colorObj), [colorObj]);
  const p3Str = useMemo(() => colorToP3CssString(colorObj), [colorObj]);
  const inSrgb = useMemo(() => isInSrgbGamut(colorObj), [colorObj]);

  const [hue, setHue] = useState(oklch.h);

  const handleOklchChange = useCallback(
    (l: number, c: number, h: number) => {
      try {
        const newColor = new Color("oklch", [l, c, h]);
        const p3 = colorToP3Coords(newColor);
        setHue(h);
        onChange(p3, alpha);
      } catch { /* ignore invalid */ }
    },
    [alpha, onChange]
  );

  const handleHslChange = useCallback(
    (h: number, s: number, l: number) => {
      try {
        const newColor = new Color("hsl", [h, s, l]);
        const p3 = colorToP3Coords(newColor);
        setHue(h);
        onChange(p3, alpha);
      } catch { /* ignore */ }
    },
    [alpha, onChange]
  );

  const handleRgbChange = useCallback(
    (r: number, g: number, b: number) => {
      onChange([r, g, b], alpha);
    },
    [alpha, onChange]
  );

  const handleHueSlider = useCallback(
    (newHue: number) => {
      setHue(newHue);
      if (mode === "oklch") {
        handleOklchChange(oklch.l, oklch.c, newHue);
      } else if (mode === "hsl") {
        handleHslChange(newHue, hsl.s, hsl.l);
      }
    },
    [mode, oklch, hsl, handleOklchChange, handleHslChange]
  );

  const handleAlphaChange = useCallback(
    (newAlpha: number) => {
      onChange(color, newAlpha);
    },
    [color, onChange]
  );

  const handleTextSubmit = useCallback(() => {
    const parsed = parseColorString(textInput);
    if (parsed) {
      const p3 = colorToP3Coords(parsed);
      onChange(p3, parsed.alpha);
      setTextInput("");
    }
  }, [textInput, onChange]);

  return (
    <div className="color-picker">
      {/* Mode tabs */}
      <div className="color-picker__tabs">
        {(["oklch", "hsl", "rgb"] as PickerMode[]).map((m) => (
          <button
            key={m}
            className={`color-picker__tab ${mode === m ? "color-picker__tab--active" : ""}`}
            onClick={() => setMode(m)}
          >
            {m.toUpperCase()}
          </button>
        ))}
        {onClose && (
          <button className="color-picker__close" onClick={onClose}>
            ×
          </button>
        )}
      </div>

      {/* Picker area */}
      <div className="color-picker__body">
        {mode === "oklch" && (
          <OklchPicker
            lightness={oklch.l}
            chroma={oklch.c}
            hue={hue}
            onChange={handleOklchChange}
          />
        )}
        {mode === "hsl" && (
          <HslPicker
            hue={hue}
            saturation={hsl.s}
            lightness={hsl.l}
            onChange={handleHslChange}
          />
        )}
        {mode === "rgb" && (
          <RgbSliders
            r={color[0]}
            g={color[1]}
            b={color[2]}
            onChange={handleRgbChange}
          />
        )}
      </div>

      {/* Hue slider (for oklch and hsl modes) */}
      {mode !== "rgb" && (
        <div className="color-picker__slider-row">
          <label className="color-picker__slider-label">Hue</label>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={hue}
            onChange={(e) => handleHueSlider(Number(e.target.value))}
            className="color-picker__hue-slider"
          />
          <span className="color-picker__slider-value">{Math.round(hue)}°</span>
        </div>
      )}

      {/* Alpha slider */}
      <div className="color-picker__slider-row">
        <label className="color-picker__slider-label">Alpha</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={alpha}
          onChange={(e) => handleAlphaChange(Number(e.target.value))}
          className="color-picker__alpha-slider"
        />
        <span className="color-picker__slider-value">{Math.round(alpha * 100)}%</span>
      </div>

      {/* Color preview + values */}
      <div className="color-picker__preview-row">
        <div
          className="color-picker__preview-swatch"
          style={{ backgroundColor: hex }}
        >
          <style>{`
            .color-picker__preview-swatch {
              background-color: ${p3Str} !important;
            }
          `}</style>
        </div>
        <div className="color-picker__values">
          <div className="color-picker__value-line">
            <span className="color-picker__value-label">HEX</span>
            <code>{hex}</code>
          </div>
          <div className="color-picker__value-line">
            <span className="color-picker__value-label">P3</span>
            <code>{p3Str}</code>
          </div>
          {!inSrgb && (
            <div className="color-picker__gamut-warning">
              ⚠ Outside sRGB gamut
            </div>
          )}
        </div>
      </div>

      {/* Text input */}
      <div className="color-picker__text-input">
        <input
          type="text"
          placeholder="Enter color (hex, p3, oklch...)"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
          className="color-picker__input"
        />
      </div>
    </div>
  );
}
