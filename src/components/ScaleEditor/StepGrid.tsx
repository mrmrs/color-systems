import { useMemo } from "react";
import type { ScaleStep, ContrastAlgorithm } from "../../types";
import { StepCell } from "./StepCell";
import "./StepGrid.css";

interface StepGridProps {
  steps: ScaleStep[];
  overrides: Record<number, { color: [number, number, number]; alpha: number }>;
  contrastAlgorithm: ContrastAlgorithm;
  onStepClick: (index: number) => void;
  onStepReset: (index: number) => void;
}

function resolveColor(
  step: ScaleStep,
  overrides: Record<number, { color: [number, number, number]; alpha: number }>
): [number, number, number] {
  const override = overrides[step.index];
  return override ? override.color : step.interpolatedColor;
}

export function StepGrid({ steps, overrides, contrastAlgorithm, onStepClick, onStepReset }: StepGridProps) {
  // Pre-compute all resolved colors once so we can pass the full array to each cell
  const allColors = useMemo(
    () => steps.map((step) => resolveColor(step, overrides)),
    [steps, overrides]
  );

  return (
    <div className="step-grid">
      {steps.map((step, i) => {
        const override = overrides[step.index];
        const color = allColors[i];
        const alpha = override ? override.alpha : step.interpolatedAlpha;

        return (
          <StepCell
            key={step.index}
            index={step.index}
            color={color}
            alpha={alpha}
            isOverridden={!!override}
            prevColor={i > 0 ? allColors[i - 1] : null}
            nextColor={i < allColors.length - 1 ? allColors[i + 1] : null}
            allColors={allColors}
            contrastAlgorithm={contrastAlgorithm}
            onReset={() => onStepReset(step.index)}
            onClick={() => onStepClick(step.index)}
          />
        );
      })}
    </div>
  );
}
