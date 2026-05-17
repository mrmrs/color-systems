import { useCallback } from "react";
import Color from "colorjs.io";
import { ColorPlane } from "./ColorPlane";

interface OklchPickerProps {
  /** Lightness 0-1 */
  lightness: number;
  /** Chroma 0-0.4 */
  chroma: number;
  /** Hue 0-360 */
  hue: number;
  onChange: (l: number, c: number, h: number) => void;
}

const MAX_CHROMA = 0.4;

export function OklchPicker({ lightness, chroma, hue, onChange }: OklchPickerProps) {
  const renderPixel = useCallback(
    (x: number, y: number) => {
      const c = x * MAX_CHROMA;
      const l = 1 - y; // top = light, bottom = dark
      try {
        const color = new Color("oklch", [l, c, hue]);
        if (color.inGamut("p3")) return color;
        return null;
      } catch {
        return null;
      }
    },
    [hue]
  );

  const handleChange = useCallback(
    (x: number, y: number) => {
      const c = x * MAX_CHROMA;
      const l = 1 - y;
      onChange(l, c, hue);
    },
    [hue, onChange]
  );

  const planeX = chroma / MAX_CHROMA;
  const planeY = 1 - lightness;

  return (
    <div className="oklch-picker">
      <ColorPlane
        x={planeX}
        y={planeY}
        renderPixel={renderPixel}
        onChange={handleChange}
      />
      <div className="picker-labels">
        <span>Chroma →</span>
        <span>↑ Lightness</span>
      </div>
    </div>
  );
}
