import type { ColorScale } from "../../types";
import { colorFromCoords, colorToHex } from "../../lib/color";
import "./ScaleList.css";

interface ScaleListProps {
  scales: ColorScale[];
  selectedScaleId: string;
  onSelectScale: (id: string) => void;
  onAddScale: () => void;
  onRemoveScale: (id: string) => void;
  onRenameScale: (id: string, name: string) => void;
  onResetDefaults: () => void;
}

export function ScaleList({
  scales,
  selectedScaleId,
  onSelectScale,
  onAddScale,
  onRemoveScale,
  onRenameScale,
  onResetDefaults,
}: ScaleListProps) {
  return (
    <div className="scale-list">
      <div className="scale-list__header">
        <h2 className="scale-list__title">Scales</h2>
        <button className="scale-list__add" onClick={onAddScale} title="Add scale">
          +
        </button>
      </div>
      <div className="scale-list__items">
        {scales.map((scale) => {
          const isSelected = scale.id === selectedScaleId;
          // Create a mini preview gradient
          const sorted = [...scale.anchors].sort((a, b) => a.position - b.position);
          const gradient = sorted.length >= 2
            ? `linear-gradient(to right, ${sorted.map((a) => colorToHex(colorFromCoords(a.color))).join(", ")})`
            : sorted.length === 1
              ? colorToHex(colorFromCoords(sorted[0].color))
              : "#ccc";

          return (
            <div
              key={scale.id}
              className={`scale-list__item ${isSelected ? "scale-list__item--selected" : ""}`}
              onClick={() => onSelectScale(scale.id)}
            >
              <div className="scale-list__preview" style={{ background: gradient }} />
              <input
                className="scale-list__name"
                value={scale.name}
                onChange={(e) => onRenameScale(scale.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              {scales.length > 1 && (
                <button
                  className="scale-list__remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveScale(scale.id);
                  }}
                  title="Remove scale"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="scale-list__footer">
        <button
          className="scale-list__reset-defaults"
          onClick={() => {
            if (window.confirm("Reset all scales to defaults? This will replace your current scales.")) {
              onResetDefaults();
            }
          }}
        >
          Reset to defaults
        </button>
      </div>
    </div>
  );
}
