import "./ColorPicker.css";

interface RgbSlidersProps {
  r: number;
  g: number;
  b: number;
  onChange: (r: number, g: number, b: number) => void;
}

export function RgbSliders({ r, g, b, onChange }: RgbSlidersProps) {
  return (
    <div className="rgb-sliders">
      <div className="rgb-sliders__channel">
        <label className="rgb-sliders__label">
          <span>R</span>
          <span className="rgb-sliders__value">{r.toFixed(3)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={r}
          onChange={(e) => onChange(Number(e.target.value), g, b)}
          className="rgb-sliders__input rgb-sliders__input--red"
          style={{
            background: `linear-gradient(to right, color(display-p3 0 ${g} ${b}), color(display-p3 1 ${g} ${b}))`,
          }}
        />
      </div>
      <div className="rgb-sliders__channel">
        <label className="rgb-sliders__label">
          <span>G</span>
          <span className="rgb-sliders__value">{g.toFixed(3)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={g}
          onChange={(e) => onChange(r, Number(e.target.value), b)}
          className="rgb-sliders__input rgb-sliders__input--green"
          style={{
            background: `linear-gradient(to right, color(display-p3 ${r} 0 ${b}), color(display-p3 ${r} 1 ${b}))`,
          }}
        />
      </div>
      <div className="rgb-sliders__channel">
        <label className="rgb-sliders__label">
          <span>B</span>
          <span className="rgb-sliders__value">{b.toFixed(3)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={b}
          onChange={(e) => onChange(r, g, Number(e.target.value))}
          className="rgb-sliders__input rgb-sliders__input--blue"
          style={{
            background: `linear-gradient(to right, color(display-p3 ${r} ${g} 0), color(display-p3 ${r} ${g} 1))`,
          }}
        />
      </div>
    </div>
  );
}
