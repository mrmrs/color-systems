import { useMemo } from "react";
import type { ColorScale } from "../../types";
import { generateAllScalesCssExport } from "../../lib/export";
import { CopyButton } from "../shared/CopyButton";
import "./ExportDialog.css";

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  scales: ColorScale[];
  allOverrides: Record<string, Record<number, { color: [number, number, number]; alpha: number }>>;
}

export function ExportDialog({ isOpen, onClose, scales, allOverrides }: ExportDialogProps) {
  const css = useMemo(
    () => generateAllScalesCssExport(scales, allOverrides),
    [scales, allOverrides]
  );

  if (!isOpen) return null;

  return (
    <div className="export-overlay" onClick={onClose}>
      <div className="export-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="export-dialog__header">
          <h3 className="export-dialog__title">Export CSS Variables — All Scales ({scales.length})</h3>
          <div className="export-dialog__actions">
            <CopyButton text={css} label="Copy CSS" />
            <button className="export-dialog__close" onClick={onClose}>
              ×
            </button>
          </div>
        </div>
        <pre className="export-dialog__code">
          <code>{css}</code>
        </pre>
      </div>
    </div>
  );
}
