import Color from "colorjs.io";

export function createP3Color(r: number, g: number, b: number, alpha = 1): Color {
  const c = new Color("p3", [r, g, b]);
  c.alpha = alpha;
  return c;
}

export function colorFromCoords(coords: [number, number, number], alpha = 1): Color {
  return createP3Color(coords[0], coords[1], coords[2], alpha);
}

export function colorToP3Coords(color: Color): [number, number, number] {
  const p3 = color.to("p3");
  return [p3.coords[0], p3.coords[1], p3.coords[2]];
}

export function colorToHex(color: Color): string {
  const srgb = color.to("srgb");
  if (!srgb.inGamut()) {
    srgb.toGamut({ space: "srgb" });
  }
  return srgb.toString({ format: "hex" });
}

export function colorToP3CssString(color: Color): string {
  const p3 = color.to("p3");
  const [r, g, b] = p3.coords;
  if (p3.alpha < 1) {
    return `color(display-p3 ${round(r)} ${round(g)} ${round(b)} / ${round(p3.alpha)})`;
  }
  return `color(display-p3 ${round(r)} ${round(g)} ${round(b)})`;
}

export function colorToOklch(color: Color): { l: number; c: number; h: number } {
  const oklch = color.to("oklch");
  return {
    l: oklch.coords[0],
    c: oklch.coords[1],
    h: oklch.coords[2] || 0,
  };
}

export function oklchToColor(l: number, c: number, h: number): Color {
  return new Color("oklch", [l, c, h]);
}

export function colorToHsl(color: Color): { h: number; s: number; l: number } {
  const hsl = color.to("hsl");
  return {
    h: hsl.coords[0] || 0,
    s: hsl.coords[1],
    l: hsl.coords[2],
  };
}

export function hslToColor(h: number, s: number, l: number): Color {
  return new Color("hsl", [h, s, l]);
}

export function isInSrgbGamut(color: Color): boolean {
  return color.to("srgb").inGamut();
}

export function isInP3Gamut(color: Color): boolean {
  return color.to("p3").inGamut();
}

export function parseColorString(str: string): Color | null {
  try {
    return new Color(str);
  } catch {
    return null;
  }
}

export function contrastWithWhite(color: Color, algorithm: "APCA" | "WCAG21"): number {
  const white = new Color("p3", [1, 1, 1]);
  try {
    return Math.abs(color.contrast(white, algorithm));
  } catch {
    return 0;
  }
}

export function contrastWithBlack(color: Color, algorithm: "APCA" | "WCAG21"): number {
  const black = new Color("p3", [0, 0, 0]);
  try {
    return Math.abs(color.contrast(black, algorithm));
  } catch {
    return 0;
  }
}

export function contrastBetween(c1: Color, c2: Color, algorithm: "APCA" | "WCAG21"): number {
  try {
    return Math.abs(c1.contrast(c2, algorithm));
  } catch {
    return 0;
  }
}

export function deltaE(c1: Color, c2: Color): number {
  try {
    return c1.deltaE(c2, "2000");
  } catch {
    return 0;
  }
}

function round(n: number, decimals = 4): number {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}
