import { TOKENS } from "../data/tokens";

// ─── FOOTER ───────────────────────────────────────────────────────
export function Footer({ dark }) {
  const t = TOKENS[dark ? "dark" : "light"];
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "24px 24px",
        borderTop: `1px solid ${t.border}`,
        fontSize: 11,
        color: t.textFaint,
        fontFamily: "monospace",
      }}
    >
      built with React · Three.js · love &nbsp;·&nbsp; © 2025 Dafa
    </footer>
  );
}