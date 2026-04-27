import type { AnchorStop } from "../../types";
import { colorFromCoords, colorToHex } from "../../lib/color";
import "./AnchorList.css";

interface AnchorListProps {
  anchors: AnchorStop[];
  selectedAnchorId: string | null;
  onSelectAnchor: (id: string) => void;
  onRemoveAnchor: (id: string) => void;
  onMoveAnchor: (id: string, position: number) => void;
}

export function AnchorList({
  anchors,
  selectedAnchorId,
  onSelectAnchor,
  onRemoveAnchor,
  onMoveAnchor,
}: AnchorListProps) {
  const sorted = [...anchors].sort((a, b) => a.position - b.position);

  return (
    <div className="anchor-list">
      <div className="anchor-list__label">Anchor Stops</div>
      <div className="anchor-list__items">
        {sorted.map((anchor) => {
          const hex = colorToHex(colorFromCoords(anchor.color, anchor.alpha));
          const isSelected = anchor.id === selectedAnchorId;
          return (
            <div
              key={anchor.id}
              className={`anchor-list__item ${isSelected ? "anchor-list__item--selected" : ""}`}
              onClick={() => onSelectAnchor(anchor.id)}
            >
              <div
                className="anchor-list__swatch"
                style={{ backgroundColor: hex }}
              />
              <input
                type="number"
                className="anchor-list__position"
                min="0"
                max="100"
                step="1"
                value={Math.round(anchor.position * 100)}
                onChange={(e) =>
                  onMoveAnchor(anchor.id, Number(e.target.value) / 100)
                }
                onClick={(e) => e.stopPropagation()}
              />
              <span className="anchor-list__percent">%</span>
              {anchors.length > 2 && (
                <button
                  className="anchor-list__remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveAnchor(anchor.id);
                  }}
                  title="Remove stop"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
