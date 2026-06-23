import { useEffect, useState } from "react";
import { TOKENS } from "../data/tokens";
import { NAV_SECTIONS } from "../data/experience";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { logo } from "../data/assets";

// ─── NAVBAR ───────────────────────────────────────────────────────
export function Navbar({ dark, setDark, activeSection, scrollTo }) {
  const t = TOKENS[dark ? "dark" : "light"];
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu au scroll
  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false);
      window.addEventListener("scroll", close, { passive: true, once: true });
      return () => window.removeEventListener("scroll", close);
    }
  }, [menuOpen]);

  const handleNav = (id) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: scrolled ? 62 : 72,
        transition: "height 0.3s ease, background 0.3s, border-color 0.3s, box-shadow 0.3s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 64px)",
      }}
    >
      {/* Fond glassmorphism */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background: scrolled ? (dark ? "rgba(6,9,18,0.88)" : "rgba(248,250,255,0.88)") : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          transition: "background 0.35s, backdrop-filter 0.35s",
        }}
      />
      {/* Bordure bas dégradée */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: scrolled
            ? dark
              ? "linear-gradient(90deg,transparent 0%,rgba(99,211,255,0.25) 30%,rgba(167,139,250,0.25) 70%,transparent 100%)"
              : "linear-gradient(90deg,transparent 0%,rgba(37,99,235,0.2) 30%,rgba(124,58,237,0.2) 70%,transparent 100%)"
            : "transparent",
          transition: "background 0.35s",
        }}
      />

      {/* ── Logo ── */}
      <button
        onClick={() => handleNav("hero")}
        style={{ display: "flex", alignItems: "center", gap: 11, background: "none", border: "none", cursor: "pointer", padding: "4px 0", flexShrink: 0 }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: -2,
              borderRadius: 10,
              background: `radial-gradient(circle,${dark ? "rgba(99,211,255,0.18)" : "rgba(37,99,235,0.12)"} 0%,transparent 70%)`,
              opacity: scrolled ? 0 : 1,
              transition: "opacity 0.4s",
            }}
          />
          <img src={logo} alt="Logo" style={{ width: 46, height: 46, objectFit: "contain", position: "relative", zIndex: 1 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, textAlign: "left" }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "-0.02em", color: t.text, lineHeight: 1.2 }}>HERIMANDA</span>
          <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em", color: t.accent, lineHeight: 1 }}>Fiononantsoa</span>
        </div>
      </button>

      {/* ── Liens desktop ── */}
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_SECTIONS.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`nav-link${active ? " active" : ""}`}
                style={{
                  "--nav-accent": t.accent,
                  background: "transparent",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  padding: "7px 14px",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  color: active ? t.accent : t.textMuted,
                  fontFamily: "inherit",
                  transition: "color 0.2s",
                  letterSpacing: active ? "-0.01em" : "0",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = t.text; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = t.textMuted; }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Droite : switch thème + hamburger ── */}
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 14 }}>
        <button
          className="theme-switch"
          onClick={() => setDark((d) => !d)}
          style={{
            background: dark
              ? "linear-gradient(135deg, #0d1a2e, #1a2d4a)"
              : "linear-gradient(135deg, #c8d8ff, #e8efff)",
            boxShadow: dark
              ? "inset 0 1px 3px rgba(0,0,0,0.5),0 0 0 1px rgba(99,211,255,0.15)"
              : "inset 0 1px 3px rgba(0,0,40,0.12),0 0 0 1px rgba(37,99,235,0.18)",
          }}
          aria-label="Toggle theme"
        >
          <div className="theme-switch-thumb" style={{ left: dark ? 3 : 27 }}>{dark ? "🌙" : "☀️"}</div>
        </button>

        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            style={{ background: "transparent", border: `1px solid ${t.border}`, borderRadius: 8, cursor: "pointer", padding: "6px 10px", display: "flex", flexDirection: "column", gap: 5, alignItems: "center", justifyContent: "center" }}
          >
            <span style={{ display: "block", width: 20, height: 1.5, background: menuOpen ? t.accent : t.textMuted, borderRadius: 99, transition: "transform 0.25s, opacity 0.25s", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 20, height: 1.5, background: menuOpen ? t.accent : t.textMuted, borderRadius: 99, transition: "opacity 0.25s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 20, height: 1.5, background: menuOpen ? t.accent : t.textMuted, borderRadius: 99, transition: "transform 0.25s, opacity 0.25s", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        )}
      </div>

      {/* ── Menu mobile dropdown ── */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: dark ? "rgba(8,12,20,0.97)" : "rgba(248,250,255,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${t.border}`,
            padding: "8px 16px 16px",
            animation: "slideDown 0.2s ease",
            zIndex: 201,
          }}
        >
          {NAV_SECTIONS.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 14px",
                  background: active ? t.accentGlow : "transparent",
                  border: `1px solid ${active ? t.accent : "transparent"}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: active ? 600 : 400,
                  color: active ? t.accent : t.textMuted,
                  fontFamily: "inherit",
                  marginBottom: 4,
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}