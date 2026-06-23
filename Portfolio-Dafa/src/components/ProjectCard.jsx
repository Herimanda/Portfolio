import { useState } from "react";
import { TOKENS } from "../data/tokens";
import { Badge } from "./Badge";

// ─── PROJECT CARD ─────────────────────────────────────────────────
export function ProjectCard({ project, dark, index, onOpen }) {
  const t = TOKENS[dark ? "dark" : "light"];
  const [hovered, setHovered] = useState(false);
  const isAccent = index % 2 === 0;

  return (
    <div
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? t.surfaceHover : t.surface,
        border: `1px solid ${hovered ? t.borderHover : t.border}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 16px 40px ${isAccent ? "rgba(99,211,255,0.09)" : "rgba(167,139,250,0.09)"}`
          : "none",
      }}
    >
      {/* ── Aperçu image ── */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "#03060c" }}>
        <img
          src={project.screenshots[0]}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.4s ease",
            opacity: hovered ? 1 : 0.82,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${dark ? "rgba(13,19,32,0.88)" : "rgba(255,255,255,0.35)"} 0%, transparent 55%)`,
          }}
        />
        <div style={{ position: "absolute", top: 10, right: 10, padding: "3px 9px", borderRadius: 99, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", fontSize: 10, color: "rgba(255,255,255,0.65)", fontFamily: "monospace" }}>
          {project.screenshots.length} screens
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0, transition: "opacity 0.22s" }}>
          <div style={{ padding: "8px 20px", borderRadius: 99, background: isAccent ? t.accent : t.violet, color: "#fff", fontSize: 12, fontWeight: 600 }}>
            Voir le projet →
          </div>
        </div>
      </div>

      {/* ── Contenu texte ── */}
      <div style={{ padding: "18px 20px 16px" }}>
        <div
          style={{
            width: hovered ? 40 : 20,
            height: 2,
            borderRadius: 99,
            marginBottom: 11,
            background: `linear-gradient(90deg, ${isAccent ? t.accent : t.violet}, ${isAccent ? t.violet : t.accent})`,
            transition: "width 0.3s ease",
          }}
        />
        <h3 style={{ margin: "0 0 5px", fontSize: 16, fontWeight: 600, color: t.text }}>{project.title}</h3>
        <p style={{ margin: "0 0 13px", fontSize: 13, lineHeight: 1.6, color: t.textMuted }}>{project.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.tags.slice(0, 3).map((tag, i) => (
            <Badge key={tag} dark={dark} accent={i % 2 === 0}>{tag}</Badge>
          ))}
          {project.tags.length > 3 && (
            <span style={{ fontSize: 11, color: t.textFaint, alignSelf: "center", fontFamily: "monospace" }}>
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}