import { useRef, useCallback, useState } from "react";
import type { AnchorStop } from "../../types";
import { colorFromCoords, colorToHex, colorToP3CssString } from "../../lib/color";
import "./GradientBar.css";

interface GradientBarProps {
  anchors: AnchorStop[];
  onMoveAnchor: (anchorId: string, position: number) => void;
  onSelectAnchor: (anchorId: string) => void;
  onAddAnchor: (position: number) => void;
  selectedAnchorId: string | null;
}

export function GradientBar({
  anchors,
  onMoveAnchor,
  onSelectAnchor,
  onAddAnchor,
  selectedAnchorId,
}: GradientBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);

  const getPosition = useCallback(
    (clientX: number) => {
      if (!barRef.current) return 0;
      const rect = barRef.current.getBoundingClientRect();
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    },
    []
  );

  const handlePointerDown = useCallback(
    (anchorId: string, e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(anchorId);
      onSelectAnchor(anchorId);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [onSelectAnchor]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      onMoveAnchor(dragging, getPosition(e.clientX));
    },
    [dragging, onMoveAnchor, getPosition]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  const handleBarDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      const pos = getPosition(e.clientX);
      onAddAnchor(pos);
    },
    [getPosition, onAddAnchor]
  );

  // Build CSS gradient from anchor stops
  const sorted = [...anchors].sort((a, b) => a.position - b.position);
  const gradientStops = sorted
    .map((a) => {
      const hex = colorToHex(colorFromCoords(a.color, a.alpha));
      return `${hex} ${(a.position * 100).toFixed(1)}%`;
    })
    .join(", ");

  const p3GradientStops = sorted
    .map((a) => {
      const p3 = colorToP3CssString(colorFromCoords(a.color, a.alpha));
      return `${p3} ${(a.position * 100).toFixed(1)}%`;
    })
    .join(", ");

  return (
    <div
      className="gradient-bar"
      ref={barRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={handleBarDoubleClick}
    >
      <div
        className="gradient-bar__track"
        style={{
          background: `linear-gradient(to right, ${gradientStops})`,
        }}
      >
        <style>{`
          @supports (color: color(display-p3 0 0 0)) {
            .gradient-bar__track {
              background: linear-gradient(to right, ${p3GradientStops}) !important;
            }
          }
        `}</style>
      </div>

      {sorted.map((anchor) => (
        <button
          key={anchor.id}
          className={`gradient-bar__handle ${
            selectedAnchorId === anchor.id ? "gradient-bar__handle--selected" : ""
          }`}
          style={{
            left: `${anchor.position * 100}%`,
            backgroundColor: colorToHex(colorFromCoords(anchor.color, anchor.alpha)),
          }}
          onPointerDown={(e) => handlePointerDown(anchor.id, e)}
          onClick={(e) => {
            e.stopPropagation();
            onSelectAnchor(anchor.id);
          }}
          aria-label={`Anchor stop at ${(anchor.position * 100).toFixed(0)}%`}
        />
      ))}

      <div className="gradient-bar__hint">Double-click to add a stop</div>
    </div>
  );
}
