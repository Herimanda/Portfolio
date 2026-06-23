import { useState, useEffect } from "react";
import { TOKENS } from "../data/tokens";
import { SKILLS_GROUPS, SKILL_TOOLS } from "../data/skills";
import { useMediaQuery } from "../hooks/useMediaQuery";

// ─── SKILLS CONTENT ───────────────────────────────────────────────
export function SkillsContent({ dark }) {
  const t = TOKENS[dark ? "dark" : "light"];
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeGroup, setActiveGroup] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const id = setTimeout(() => setAnimated(true), 60);
    return () => clearTimeout(id);
  }, [activeGroup]);

  const colMap = {
    accent: { fill: t.accent, glow: t.accentGlow, border: t.accent },
    violet: { fill: t.violet, glow: t.violetGlow, border: t.violet },
    green:  { fill: t.green,  glow: t.greenGlow,  border: t.green  },
  };

  return (
    <>
      {/* ── Onglets ── */}
      <div
        style={{
          display: "flex",
          gap: 0,
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          padding: 4,
          marginBottom: 32,
          width: "fit-content",
          overflowX: "auto",
          maxWidth: "100%",
        }}
      >
        {SKILLS_GROUPS.map((g, i) => {
          const col = colMap[g.color];
          const active = activeGroup === i;
          return (
            <button
              key={g.label}
              onClick={() => setActiveGroup(i)}
              style={{
                padding: isMobile ? "8px 14px" : "8px 20px",
                borderRadius: 9,
                border: active ? `1px solid ${col.border}` : "1px solid transparent",
                cursor: "pointer",
                background: active ? col.glow : "transparent",
                color: active ? col.fill : t.textMuted,
                fontSize: isMobile ? 12 : 13,
                fontWeight: 500,
                fontFamily: "inherit",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 7,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 16 }}>{g.icon}</span>
              {g.label}
            </button>
          );
        })}
      </div>

      {/* ── Barres de compétences ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {SKILLS_GROUPS[activeGroup].items.map((skill, i) => {
          const col = colMap[SKILLS_GROUPS[activeGroup].color];
          return (
            <div
              key={skill.name}
              style={{
                padding: "18px 20px",
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: 14,
                position: "relative",
                overflow: "hidden",
                animation: animated ? `fadeSlideIn 0.28s ease ${i * 0.06}s both` : "none",
              }}
            >
              {/* Fond progression */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: col.glow,
                  width: animated ? `${skill.level}%` : "0%",
                  transition: "width 0.95s cubic-bezier(0.4,0,0.2,1)",
                  borderRadius: "14px 0 0 14px",
                }}
              />
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: t.text, display: "flex", alignItems: "center", gap: 8 }}>
                    <img src={skill.icon} alt={skill.name} style={{ width: 20, height: 20, objectFit: "contain" }} />
                    {skill.name}
                  </span>
                  <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: col.fill, fontFamily: "'JetBrains Mono', monospace" }}>
                    {skill.level}<span style={{ fontSize: 13, fontWeight: 400, color: t.textFaint }}>%</span>
                  </span>
                </div>
                <div style={{ height: 3, borderRadius: 99, background: t.border, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 99,
                      background: `linear-gradient(90deg, ${col.fill}, ${t.accent === col.fill ? t.violet : t.accent})`,
                      width: animated ? `${skill.level}%` : "0%",
                      transition: `width 0.95s cubic-bezier(0.4,0,0.2,1) ${i * 0.06}s`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Outils supplémentaires ── */}
      <p style={{ fontSize: 11, fontFamily: "monospace", color: t.textFaint, letterSpacing: "0.08em", marginBottom: 12 }}>
        // ALSO USING
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {SKILL_TOOLS.map((tool, i) => (
          <span
            key={tool}
            style={{ padding: "6px 14px", borderRadius: 8, background: t.surface, border: `1px solid ${t.border}`, fontSize: 12, color: t.textMuted, fontFamily: "'JetBrains Mono', monospace", transition: "all 0.18s", cursor: "default" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = i % 3 === 0 ? t.accent : i % 3 === 1 ? t.violet : t.green;
              e.currentTarget.style.color = t.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = t.border;
              e.currentTarget.style.color = t.textMuted;
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </>
  );
}