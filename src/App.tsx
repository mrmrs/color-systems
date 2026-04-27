import { useState, useCallback } from "react";
import { ScaleProvider, useScaleState, useScaleDispatch } from "./state/ScaleContext";
import { useLiveCssVariables } from "./hooks/useLiveCssVariables";
import { ScaleEditor } from "./components/ScaleEditor/ScaleEditor";
import { ScaleList } from "./components/ScaleList/ScaleList";
import { Preview } from "./components/Preview/Preview";
import { ThemeEditor } from "./components/ThemeEditor/ThemeEditor";
import type { ColorScale } from "./types";
import "./App.css";

function AppContent() {
  const state = useScaleState();
  const dispatch = useScaleDispatch();
  const [view, setView] = useState<"editor" | "preview" | "split">("editor");

  // Inject all scale colors + semantic theme tokens as live CSS variables
  useLiveCssVariables(state);

  const handleAddScale = useCallback(() => {
    const newScale: ColorScale = {
      id: crypto.randomUUID(),
      name: `scale-${state.scales.length + 1}`,
      anchors: [
        { id: crypto.randomUUID(), color: [0, 0, 0], alpha: 1, position: 0 },
        { id: crypto.randomUUID(), color: [1, 1, 1], alpha: 1, position: 1 },
      ],
      stepCount: 12,
      interpolationSpace: "oklch",
      hueInterpolation: "shorter",
      paddingStart: 0.05,
      paddingEnd: 0.05,
    };
    dispatch({ type: "ADD_SCALE", scale: newScale });
  }, [state.scales.length, dispatch]);

  return (
    <div className="app">
      {(view === "editor" || view === "split") && (
        <ScaleList
          scales={state.scales}
          selectedScaleId={state.selectedScaleId}
          onSelectScale={(id) => dispatch({ type: "SELECT_SCALE", scaleId: id })}
          onAddScale={handleAddScale}
          onRemoveScale={(id) => dispatch({ type: "REMOVE_SCALE", scaleId: id })}
          onRenameScale={(id, name) => dispatch({ type: "RENAME_SCALE", scaleId: id, name })}
          onResetDefaults={() => dispatch({ type: "RESET_DEFAULTS" })}
        />
      )}
      {(view === "editor" || view === "split") && <ScaleEditor />}
      {(view === "preview" || view === "split") && <Preview />}
      {(view === "preview" || view === "split") && <ThemeEditor />}

      {/* View toggle */}
      <div className="app__view-toggle">
        <button
          className={`app__view-btn ${view === "editor" ? "app__view-btn--active" : ""}`}
          onClick={() => setView("editor")}
        >
          Editor
        </button>
        <button
          className={`app__view-btn ${view === "split" ? "app__view-btn--active" : ""}`}
          onClick={() => setView("split")}
        >
          Split
        </button>
        <button
          className={`app__view-btn ${view === "preview" ? "app__view-btn--active" : ""}`}
          onClick={() => setView("preview")}
        >
          Preview
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ScaleProvider>
      <AppContent />
    </ScaleProvider>
  );
}

export default App;
