import { colorFromCoords, colorToHex, colorToP3CssString } from "../../lib/color";

interface SwatchProps {
  color: [number, number, number];
  alpha?: number;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function Swatch({ color, alpha = 1, size, className, style, onClick, children }: SwatchProps) {
  const c = colorFromCoords(color, alpha);
  const hex = colorToHex(c);
  const p3 = colorToP3CssString(c);

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        backgroundColor: hex,
        ...style,
        ...(size != null ? { width: size, height: size } : {}),
      }}
      data-p3={p3}
    >
      <style>{`
        [data-p3="${p3}"] {
          background-color: ${p3};
        }
      `}</style>
      {children}
    </div>
  );
}
