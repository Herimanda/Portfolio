import { useState, useEffect, useRef, useCallback } from "react";
import { TOKENS } from "../data/tokens";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Badge } from "./Badge";

// ─── PROJECT MODAL ────────────────────────────────────────────────
export function ProjectModal({ project, dark, onClose }) {
  const t = TOKENS[dark ? "dark" : "light"];
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [slide, setSlide] = useState(0);
  const [sliding, setSliding] = useState(false);
  const total = project.screenshots.length;
  const touchStart = useRef(null);

  const go = useCallback(
    (dir) => {
      if (sliding) return;
      setSliding(true);
      setTimeout(() => {
        setSlide((s) => (s + dir + total) % total);
        setSliding(false);
      }, 200);
    },
    [sliding, total]
  );

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, go]);

  const accent = project.tags.length % 2 === 0 ? t.accent : t.violet;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(14px)",
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        padding: isMobile ? 0 : 20,
        animation: "fadeIn 0.18s ease",
      }}
    >
      <div
        style={{
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: isMobile ? "20px 20px 0 0" : 20,
          width: "100%",
          maxWidth: isMobile ? "100%" : 860,
          maxHeight: isMobile ? "92vh" : "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          animation: "slideUp 0.24s ease",
          boxShadow: dark
            ? "0 0 60px rgba(99,211,255,0.07), 0 32px 80px rgba(0,0,0,0.6)"
            : "0 32px 80px rgba(0,0,30,0.18)",
        }}
      >
        {/* ── Carrousel ── */}
        <div
          style={{
            position: "relative",
            aspectRatio: "900/500",
            background: "#030609",
            flexShrink: 0,
            overflow: "hidden",
          }}
          onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStart.current !== null) {
              const dx = e.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
              touchStart.current = null;
            }
          }}
        >
          <img
            key={slide}
            src={project.screenshots[slide]}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: sliding ? 0 : 1,
              transition: "opacity 0.18s",
            }}
          />
          {total > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 38, height: 38, borderRadius: "50%", border: "none", cursor: "pointer", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", color: "#fff", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
              >‹</button>
              <button
                onClick={() => go(1)}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 38, height: 38, borderRadius: "50%", border: "none", cursor: "pointer", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", color: "#fff", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
              >›</button>
            </>
          )}

          {/* Dots */}
          <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
            {project.screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                style={{ width: i === slide ? 22 : 7, height: 7, borderRadius: 99, border: "none", cursor: "pointer", background: i === slide ? accent : "rgba(255,255,255,0.3)", transition: "all 0.25s", padding: 0 }}
              />
            ))}
          </div>

          {/* Counter */}
          <div style={{ position: "absolute", top: 12, right: 12, padding: "3px 10px", borderRadius: 20, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", fontSize: 11, color: "rgba(255,255,255,0.65)", fontFamily: "monospace" }}>
            {slide + 1} / {total}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            style={{ position: "absolute", top: 12, left: 12, width: 30, height: 30, borderRadius: "50%", border: "none", cursor: "pointer", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.8)", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
          >✕</button>
        </div>

        {/* ── Miniatures (desktop) ── */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 7, padding: "9px 18px", background: dark ? "#060a10" : "#edf0ff", borderBottom: `1px solid ${t.border}`, overflowX: "auto" }}>
            {project.screenshots.map((src, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                style={{ width: 76, height: 44, flexShrink: 0, border: `2px solid ${i === slide ? accent : "transparent"}`, borderRadius: 6, overflow: "hidden", cursor: "pointer", padding: 0, opacity: i === slide ? 1 : 0.45, transition: "all 0.2s" }}
              >
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
        )}

        {/* ── Contenu texte ── */}
        <div style={{ padding: isMobile ? "18px 18px 32px" : "22px 26px 26px", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
            <div>
              <p style={{ margin: "0 0 3px", fontSize: 11, fontFamily: "monospace", color: t.textFaint, letterSpacing: "0.07em" }}>
                {project.role} · {project.year}
              </p>
              <h2 style={{ margin: 0, fontSize: isMobile ? 18 : 21, fontWeight: 700, letterSpacing: "-0.02em", color: t.text }}>
                {project.title}
              </h2>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: t.textMuted }}>{project.subtitle}</p>
            </div>
            <a
              href={project.github}
              style={{ padding: "7px 14px", borderRadius: 8, textDecoration: "none", background: t.bg, border: `1px solid ${t.border}`, fontSize: 12, color: t.textMuted, fontWeight: 500 }}
            >
              GitHub →
            </a>
          </div>
          <p style={{ margin: "0 0 18px", fontSize: 14, lineHeight: 1.75, color: t.textMuted }}>{project.longDesc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map((tag, i) => (
              <Badge key={tag} dark={dark} accent={i % 2 === 0}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}