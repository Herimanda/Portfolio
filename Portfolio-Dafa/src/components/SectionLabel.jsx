// ─── SECTION LABEL ────────────────────────────────────────────────
export function SectionLabel({ children, color }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        color,
        letterSpacing: "0.12em",
        margin: "0 0 10px",
      }}
    >
      // {children}
    </p>
  );
}