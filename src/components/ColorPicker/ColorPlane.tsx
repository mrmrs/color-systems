import { useRef, useEffect, useCallback, useState } from "react";
import Color from "colorjs.io";

interface ColorPlaneProps {
  /** Current X value 0-1 */
  x: number;
  /** Current Y value 0-1 */
  y: number;
  /** Renders a color for each pixel given (x, y) in 0-1 range. Returns CSS color string. */
  renderPixel: (x: number, y: number) => Color | null;
  onChange: (x: number, y: number) => void;
  width?: number;
  height?: number;
}

const RESOLUTION = 64;

function channel(value: number | null | undefined): number {
  return value ?? 0;
}

export function ColorPlane({
  x,
  y,
  renderPixel,
  onChange,
  width = 256,
  height = 256,
}: ColorPlaneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Render the color plane to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(RESOLUTION, RESOLUTION);
    const data = imageData.data;

    for (let py = 0; py < RESOLUTION; py++) {
      for (let px = 0; px < RESOLUTION; px++) {
        const nx = px / (RESOLUTION - 1);
        const ny = py / (RESOLUTION - 1);
        const color = renderPixel(nx, ny);
        const idx = (py * RESOLUTION + px) * 4;

        if (color) {
          try {
            const srgb = color.to("srgb");
            data[idx] = Math.round(Math.max(0, Math.min(1, channel(srgb.coords[0]))) * 255);
            data[idx + 1] = Math.round(Math.max(0, Math.min(1, channel(srgb.coords[1]))) * 255);
            data[idx + 2] = Math.round(Math.max(0, Math.min(1, channel(srgb.coords[2]))) * 255);
            data[idx + 3] = 255;
          } catch {
            data[idx] = data[idx + 1] = data[idx + 2] = 128;
            data[idx + 3] = 255;
          }
        } else {
          // Out of gamut — render as transparent with checkerboard
          data[idx] = data[idx + 1] = data[idx + 2] = 200;
          data[idx + 3] = 40;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [renderPixel]);

  const getCoords = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)),
      };
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      const coords = getCoords(e.clientX, e.clientY);
      onChange(coords.x, coords.y);
    },
    [getCoords, onChange]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const coords = getCoords(e.clientX, e.clientY);
      onChange(coords.x, coords.y);
    },
    [isDragging, getCoords, onChange]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="color-plane"
      style={{ width, height, position: "relative" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <canvas
        ref={canvasRef}
        width={RESOLUTION}
        height={RESOLUTION}
        style={{
          width: "100%",
          height: "100%",
          imageRendering: "auto",
          borderRadius: "var(--radius-sm, 4px)",
        }}
      />
      {/* Crosshair indicator */}
      <div
        className="color-plane__cursor"
        style={{
          left: `${x * 100}%`,
          top: `${y * 100}%`,
        }}
      />
    </div>
  );
}
