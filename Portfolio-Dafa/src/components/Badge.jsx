import { TOKENS } from "../data/tokens";

// ─── BADGE ────────────────────────────────────────────────────────
export function Badge({ children, dark, accent = false }) {
  const t = TOKENS[dark ? "dark" : "light"];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.05em",
        background: accent ? t.accentGlow : t.violetGlow,
        color: accent ? t.accent : t.violet,
        border: `1px solid ${accent ? t.accent : t.violet}`,
      }}
    >
      {children}
    </span>
  );
}