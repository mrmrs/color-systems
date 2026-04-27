import { useMemo } from "react";
import type { ContrastAlgorithm } from "../../types";
import {
  colorFromCoords,
  colorToHex,
  colorToP3CssString,
  contrastWithWhite,
  contrastWithBlack,
  contrastBetween,
  deltaE,
} from "../../lib/color";
import { ResetButton } from "../shared/ResetButton";
import "./StepCell.css";

interface StepCellProps {
  index: number;
  color: [number, number, number];
  alpha: number;
  isOverridden: boolean;
  prevColor: [number, number, number] | null;
  nextColor: [number, number, number] | null;
  /** All resolved colors in the scale, indexed by step index */
  allColors: [number, number, number][];
  contrastAlgorithm: ContrastAlgorithm;
  onReset: () => void;
  onClick: () => void;
}

const THRESHOLDS: Record<ContrastAlgorithm, number> = {
  APCA: 75,
  WCAG21: 4.5,
};

export function StepCell({
  index,
  color,
  alpha,
  isOverridden,
  prevColor,
  nextColor,
  allColors,
  contrastAlgorithm,
  onReset,
  onClick,
}: StepCellProps) {
  const c = useMemo(() => colorFromCoords(color, alpha), [color, alpha]);
  const hex = useMemo(() => colorToHex(c), [c]);
  const p3 = useMemo(() => colorToP3CssString(c), [c]);

  const cWhite = useMemo(() => contrastWithWhite(c, contrastAlgorithm), [c, contrastAlgorithm]);
  const cBlack = useMemo(() => contrastWithBlack(c, contrastAlgorithm), [c, contrastAlgorithm]);

  const threshold = THRESHOLDS[contrastAlgorithm];
  const passesWhite = cWhite >= threshold;
  const passesBlack = cBlack >= threshold;

  // Compute which other steps in the scale this color is accessible with
  const accessibleWith = useMemo(() => {
    const passing: number[] = [];
    for (let i = 0; i < allColors.length; i++) {
      if (i === index) continue;
      const other = colorFromCoords(allColors[i]);
      const score = contrastBetween(c, other, contrastAlgorithm);
      if (score >= threshold) {
        passing.push(i);
      }
    }
    return passing;
  }, [c, allColors, index, contrastAlgorithm, threshold]);

  const dPrev = useMemo(() => {
    if (!prevColor) return null;
    return deltaE(c, colorFromCoords(prevColor));
  }, [c, prevColor]);

  const dNext = useMemo(() => {
    if (!nextColor) return null;
    return deltaE(c, colorFromCoords(nextColor));
  }, [c, nextColor]);

  const formatContrast = (v: number) =>
    contrastAlgorithm === "APCA" ? v.toFixed(1) : v.toFixed(2);

  return (
    <div
      className={`step-cell ${isOverridden ? "step-cell--overridden" : ""}`}
      onClick={onClick}
    >
      <div className="step-cell__color" style={{ backgroundColor: hex }}>
        <style>{`
          .step-cell__color[style*="${hex}"] {
            background-color: ${p3};
          }
        `}</style>
        <div className="step-cell__a11y">
          {accessibleWith.map((i) => {
            const tagColor = colorFromCoords(allColors[i]);
            const bgHex = colorToHex(tagColor);
            const bgP3 = colorToP3CssString(tagColor);
            return (
              <span
                key={i}
                className="step-cell__a11y-tag step-cell__a11y-tag--step"
                title={`Accessible with step ${i}`}
                style={{ "--tag-color": bgP3, backgroundColor: bgHex } as React.CSSProperties}
              />
            );
          })}
        </div>
       <div style={{ padding: '4px' }}> 
          {passesWhite && <span className="step-cell__a11y-tag step-cell__a11y-tag--white" title="Accessible on white" />}
          {passesBlack && <span className="step-cell__a11y-tag step-cell__a11y-tag--black" title="Accessible on black" />}
        </div>
      </div>
      <div className="step-cell__info">
        <span className="step-cell__index">{index}</span>
        <span className="step-cell__hex">{hex}</span>
        <div className="step-cell__meta">
          <div className="step-cell__contrast">
            <span className="step-cell__meta-label">W</span>
            <span>{formatContrast(cWhite)}</span>
          </div>
          <div className="step-cell__contrast">
            <span className="step-cell__meta-label">B</span>
            <span>{formatContrast(cBlack)}</span>
          </div>
          <div className="step-cell__distances">
            <span className="step-cell__delta" title="ΔE to previous">
              {dPrev !== null ? `↑${dPrev.toFixed(1)}` : "—"}
            </span>
            <span className="step-cell__delta" title="ΔE to next">
              {dNext !== null ? `↓${dNext.toFixed(1)}` : "—"}
            </span>
          </div>
        </div>
      </div>
      {isOverridden && (
        <div className="step-cell__reset">
          <ResetButton onClick={onReset} />
        </div>
      )}
      {isOverridden && <div className="step-cell__override-dot" />}
    </div>
  );
}
