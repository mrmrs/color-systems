import { useCallback } from "react";
import Color from "colorjs.io";
import { ColorPlane } from "./ColorPlane";

interface HslPickerProps {
  hue: number;
  saturation: number; // 0-100
  lightness: number; // 0-100
  onChange: (h: number, s: number, l: number) => void;
}

export function HslPicker({ hue, saturation, lightness, onChange }: HslPickerProps) {
  const renderPixel = useCallback(
    (x: number, y: number) => {
      const s = x * 100;
      const l = (1 - y) * 100;
      try {
        const color = new Color("hsl", [hue, s, l]);
        return color;
      } catch {
        return null;
      }
    },
    [hue]
  );

  const handleChange = useCallback(
    (x: number, y: number) => {
      const s = x * 100;
      const l = (1 - y) * 100;
      onChange(hue, s, l);
    },
    [hue, onChange]
  );

  const planeX = saturation / 100;
  const planeY = 1 - lightness / 100;

  return (
    <div className="hsl-picker">
      <ColorPlane
        x={planeX}
        y={planeY}
        renderPixel={renderPixel}
        onChange={handleChange}
      />
      <div className="picker-labels">
        <span>Saturation →</span>
        <span>↑ Lightness</span>
      </div>
    </div>
  );
}
