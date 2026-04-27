import { useMemo, useState, useCallback } from "react";
import type { ColorScale } from "../../types";
import { useScaleState, useScaleDispatch, useSelectedScale, useSelectedOverrides } from "../../state/ScaleContext";
import { multiStopInterpolate } from "../../lib/interpolation";
import { GradientBar } from "../GradientBar/GradientBar";
import { StepGrid } from "./StepGrid";
import { InterpolationControls } from "./InterpolationControls";
import { AnchorList } from "./AnchorList";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { ExportDialog } from "../ExportDialog/ExportDialog";
import "./ScaleEditor.css";

export function ScaleEditor() {
  const state = useScaleState();
  const scale = useSelectedScale();
  const overrides = useSelectedOverrides();
  const dispatch = useScaleDispatch();

  const [selectedAnchorId, setSelectedAnchorId] = useState<string | null>(
    scale?.anchors[0]?.id ?? null
  );
  const [editingStepIndex, setEditingStepIndex] = useState<number | null>(null);
  const [showExport, setShowExport] = useState(false);

  const steps = useMemo(() => {
    if (!scale) return [];
    return multiStopInterpolate(
      scale.anchors,
      scale.stepCount,
      scale.interpolationSpace,
      scale.hueInterpolation,
      scale.paddingStart,
      scale.paddingEnd
    );
  }, [scale?.anchors, scale?.stepCount, scale?.interpolationSpace, scale?.hueInterpolation, scale?.paddingStart, scale?.paddingEnd]);

  const selectedAnchor = scale?.anchors.find((a) => a.id === selectedAnchorId) ?? null;

  const handleMoveAnchor = useCallback(
    (anchorId: string, position: number) => {
      if (!scale) return;
      dispatch({ type: "MOVE_ANCHOR", scaleId: scale.id, anchorId, position });
    },
    [scale, dispatch]
  );

  const handleAddAnchor = useCallback(
    (position: number) => {
      if (!scale) return;
      // Interpolate color at this position for a good starting point
      const t = position;
      const step = steps[Math.round(t * (steps.length - 1))];
      const color = step ? step.interpolatedColor : [0.5, 0.5, 0.5] as [number, number, number];

      const anchor = {
        id: crypto.randomUUID(),
        color: color as [number, number, number],
        alpha: 1,
        position,
      };
      dispatch({ type: "ADD_ANCHOR", scaleId: scale.id, anchor });
      setSelectedAnchorId(anchor.id);
    },
    [scale, steps, dispatch]
  );

  const handleRemoveAnchor = useCallback(
    (anchorId: string) => {
      if (!scale) return;
      dispatch({ type: "REMOVE_ANCHOR", scaleId: scale.id, anchorId });
      if (selectedAnchorId === anchorId) {
        setSelectedAnchorId(scale.anchors[0]?.id ?? null);
      }
    },
    [scale, selectedAnchorId, dispatch]
  );

  const handleAnchorColorChange = useCallback(
    (color: [number, number, number], alpha?: number) => {
      if (!scale || !selectedAnchorId) return;
      dispatch({
        type: "UPDATE_ANCHOR_COLOR",
        scaleId: scale.id,
        anchorId: selectedAnchorId,
        color,
        alpha,
      });
    },
    [scale, selectedAnchorId, dispatch]
  );

  const handleStepClick = useCallback((index: number) => {
    setEditingStepIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleStepColorChange = useCallback(
    (color: [number, number, number], alpha?: number) => {
      if (!scale || editingStepIndex === null) return;
      dispatch({
        type: "OVERRIDE_STEP",
        scaleId: scale.id,
        stepIndex: editingStepIndex,
        color,
        alpha,
      });
    },
    [scale, editingStepIndex, dispatch]
  );

  const handleStepReset = useCallback(
    (index: number) => {
      if (!scale) return;
      dispatch({ type: "RESET_STEP", scaleId: scale.id, stepIndex: index });
      if (editingStepIndex === index) setEditingStepIndex(null);
    },
    [scale, editingStepIndex, dispatch]
  );

  if (!scale) {
    return <div className="scale-editor__empty">No scale selected</div>;
  }

  // Get the current color for the editing step
  const editingStep = editingStepIndex !== null ? steps[editingStepIndex] : null;
  const editingColor = editingStepIndex !== null
    ? overrides[editingStepIndex]?.color ?? editingStep?.interpolatedColor ?? [0, 0, 0]
    : null;
  const editingAlpha = editingStepIndex !== null
    ? overrides[editingStepIndex]?.alpha ?? editingStep?.interpolatedAlpha ?? 1
    : 1;

  return (
    <div className="scale-editor">
      <div className="scale-editor__toolbar">
        <h2 className="scale-editor__name">{scale.name}</h2>
        <div className="scale-editor__toolbar-actions">
          <div className="scale-editor__contrast-toggle">
            <span className="scale-editor__contrast-label">Contrast</span>
            <button
              className={`scale-editor__algo-btn ${state.contrastAlgorithm === "APCA" ? "scale-editor__algo-btn--active" : ""}`}
              onClick={() => dispatch({ type: "SET_CONTRAST_ALGORITHM", algorithm: "APCA" })}
            >
              APCA
            </button>
            <button
              className={`scale-editor__algo-btn ${state.contrastAlgorithm === "WCAG21" ? "scale-editor__algo-btn--active" : ""}`}
              onClick={() => dispatch({ type: "SET_CONTRAST_ALGORITHM", algorithm: "WCAG21" })}
            >
              WCAG
            </button>
          </div>
          <button className="scale-editor__export-btn" onClick={() => setShowExport(true)}>
            Export CSS
          </button>
        </div>
      </div>

      <div className="scale-editor__gradient-section">
        <GradientBar
          anchors={scale.anchors}
          onMoveAnchor={handleMoveAnchor}
          onSelectAnchor={setSelectedAnchorId}
          onAddAnchor={handleAddAnchor}
          selectedAnchorId={selectedAnchorId}
        />
      </div>

      <div className="scale-editor__controls-section">
        <AnchorList
          anchors={scale.anchors}
          selectedAnchorId={selectedAnchorId}
          onSelectAnchor={setSelectedAnchorId}
          onRemoveAnchor={handleRemoveAnchor}
          onMoveAnchor={handleMoveAnchor}
        />
        <InterpolationControls
          interpolationSpace={scale.interpolationSpace}
          hueInterpolation={scale.hueInterpolation}
          stepCount={scale.stepCount}
          paddingStart={scale.paddingStart}
          paddingEnd={scale.paddingEnd}
          onSpaceChange={(space) =>
            dispatch({ type: "SET_INTERPOLATION_SPACE", scaleId: scale.id, space })
          }
          onHueChange={(hue) =>
            dispatch({ type: "SET_HUE_INTERPOLATION", scaleId: scale.id, hue })
          }
          onStepCountChange={(stepCount) =>
            dispatch({ type: "SET_STEP_COUNT", scaleId: scale.id, stepCount })
          }
          onPaddingChange={(paddingStart, paddingEnd) =>
            dispatch({ type: "SET_PADDING", scaleId: scale.id, paddingStart, paddingEnd })
          }
          onResetAll={() => dispatch({ type: "RESET_ALL_STEPS", scaleId: scale.id })}
        />
      </div>

      <div className="scale-editor__steps-section">
        <StepGrid
          steps={steps}
          overrides={overrides}
          contrastAlgorithm={state.contrastAlgorithm}
          onStepClick={handleStepClick}
          onStepReset={handleStepReset}
        />
      </div>

      {/* Anchor color picker panel */}
      {selectedAnchor && (
        <div className="scale-editor__picker-panel">
          <div className="scale-editor__picker-header">
            <span className="scale-editor__picker-title">
              Anchor Stop — {Math.round(selectedAnchor.position * 100)}%
            </span>
          </div>
          <ColorPicker
            color={selectedAnchor.color}
            alpha={selectedAnchor.alpha}
            onChange={handleAnchorColorChange}
          />
        </div>
      )}

      {/* Step override color picker */}
      {editingStepIndex !== null && editingColor && (
        <div className="scale-editor__picker-panel scale-editor__picker-panel--step">
          <div className="scale-editor__picker-header">
            <span className="scale-editor__picker-title">
              Step {editingStepIndex} Override
            </span>
            <button
              className="scale-editor__picker-close"
              onClick={() => setEditingStepIndex(null)}
            >
              ×
            </button>
          </div>
          <ColorPicker
            color={editingColor as [number, number, number]}
            alpha={editingAlpha}
            onChange={handleStepColorChange}
          />
        </div>
      )}

      <ExportDialog
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        scales={state.scales}
        allOverrides={state.overrides}
      />
    </div>
  );
}
