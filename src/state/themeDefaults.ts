import type { SemanticToken, ThemeState, TokenRef } from "../types";

function t(
  id: string,
  label: string,
  group: string,
  light: TokenRef,
  dark: TokenRef,
  candidates: TokenRef[] = []
): SemanticToken {
  // Auto-include light and dark in candidates if not already present
  const all = [light, dark, ...candidates];
  const unique = all.filter(
    (c, i) => all.findIndex((x) => x.scale === c.scale && x.step === c.step) === i
  );
  return { id, label, group, light, dark, candidates: unique };
}

export function createDefaultTheme(): ThemeState {
  return {
    mode: "light",
    tokens: [
      // ── Backgrounds ──
      t("bg",          "Page Background",     "bg",
        { scale: "gray", step: 11 },  { scale: "gray", step: 0 },
        [{ scale: "slate", step: 11 }, { scale: "slate", step: 10 }, { scale: "gray", step: 10 }]),

      t("bg-surface",  "Surface / Card",      "bg",
        { scale: "gray", step: 11 },  { scale: "gray", step: 1 },
        [{ scale: "slate", step: 11 }, { scale: "slate", step: 1 }, { scale: "gray", step: 10 }]),

      t("bg-muted",    "Muted Background",    "bg",
        { scale: "slate", step: 10 }, { scale: "slate", step: 1 },
        [{ scale: "gray", step: 10 }, { scale: "gray", step: 9 }, { scale: "slate", step: 9 }]),

      // ── Text ──
      t("text",        "Primary Text",        "text",
        { scale: "slate", step: 1 },  { scale: "slate", step: 10 },
        [{ scale: "slate", step: 0 }, { scale: "gray", step: 0 }, { scale: "gray", step: 1 }]),

      t("text-secondary", "Secondary Text",   "text",
        { scale: "slate", step: 4 },  { scale: "slate", step: 7 },
        [{ scale: "slate", step: 5 }, { scale: "gray", step: 4 }, { scale: "gray", step: 5 }]),

      t("text-muted",  "Muted Text",          "text",
        { scale: "slate", step: 6 },  { scale: "slate", step: 5 },
        [{ scale: "slate", step: 7 }, { scale: "gray", step: 6 }, { scale: "gray", step: 7 }]),

      // ── Borders ──
      t("border",      "Default Border",      "border",
        { scale: "slate", step: 9 },  { scale: "slate", step: 2 },
        [{ scale: "slate", step: 8 }, { scale: "gray", step: 9 }, { scale: "gray", step: 8 }]),

      t("border-strong", "Strong Border",     "border",
        { scale: "slate", step: 7 },  { scale: "slate", step: 4 },
        [{ scale: "slate", step: 6 }, { scale: "gray", step: 7 }]),

      // ── Accents ──
      t("primary",     "Primary / CTA",       "accent",
        { scale: "blue", step: 4 },   { scale: "blue", step: 5 },
        [{ scale: "blue", step: 3 }, { scale: "blue", step: 5 }, { scale: "blue", step: 6 },
         { scale: "indigo", step: 4 }, { scale: "indigo", step: 5 }]),

      t("primary-hover", "Primary Hover",     "accent",
        { scale: "blue", step: 3 },   { scale: "blue", step: 4 },
        [{ scale: "blue", step: 2 }, { scale: "blue", step: 4 }, { scale: "indigo", step: 3 }]),

      t("primary-text", "Text on Primary",    "accent",
        { scale: "gray", step: 11 },  { scale: "gray", step: 11 },
        [{ scale: "blue", step: 10 }, { scale: "blue", step: 11 }]),

      // ── Feedback ──
      t("success",     "Success",             "feedback",
        { scale: "green", step: 4 },  { scale: "green", step: 5 },
        [{ scale: "green", step: 3 }, { scale: "green", step: 5 }, { scale: "green", step: 6 },
         { scale: "teal", step: 4 }]),

      t("success-bg",  "Success Background",  "feedback",
        { scale: "green", step: 9 },  { scale: "green", step: 1 },
        [{ scale: "green", step: 10 }, { scale: "green", step: 8 }]),

      t("warning",     "Warning",             "feedback",
        { scale: "orange", step: 4 }, { scale: "orange", step: 5 },
        [{ scale: "orange", step: 3 }, { scale: "gold", step: 4 }, { scale: "yellow", step: 4 }]),

      t("warning-bg",  "Warning Background",  "feedback",
        { scale: "orange", step: 9 }, { scale: "orange", step: 1 },
        [{ scale: "orange", step: 10 }, { scale: "gold", step: 9 }]),

      t("danger",      "Danger / Error",      "feedback",
        { scale: "red", step: 4 },    { scale: "red", step: 5 },
        [{ scale: "red", step: 3 }, { scale: "red", step: 5 }, { scale: "red", step: 6 },
         { scale: "magenta", step: 4 }]),

      t("danger-bg",   "Danger Background",   "feedback",
        { scale: "red", step: 9 },    { scale: "red", step: 1 },
        [{ scale: "red", step: 10 }, { scale: "red", step: 8 }]),

      t("info",        "Info",                "feedback",
        { scale: "cyan", step: 4 },   { scale: "cyan", step: 5 },
        [{ scale: "cyan", step: 3 }, { scale: "blue", step: 5 }]),

      t("info-bg",     "Info Background",     "feedback",
        { scale: "cyan", step: 9 },   { scale: "cyan", step: 1 },
        [{ scale: "blue", step: 9 }, { scale: "cyan", step: 10 }]),
    ],
  };
}
