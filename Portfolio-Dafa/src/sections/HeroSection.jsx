import { TOKENS } from "../data/tokens";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Badge } from "../components/Badge";
import { OrbitalScene } from "../scenes/OrbitalScene";
import { pdp } from "../data/assets";

// ─── HERO SECTION ─────────────────────────────────────────────────
export function HeroSection({ dark, sectionRef, scrollTo }) {
  const t = TOKENS[dark ? "dark" : "light"];
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        alignItems: "center",
        gap: isMobile ? 0 : 40,
        padding: isMobile ? "88px 20px 40px" : "80px clamp(24px, 6vw, 100px) 60px",
        maxWidth: 1340,
        margin: "0 auto",
      }}
    >
      <div>
        {/* ── Photo de profil + identité ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <div style={{ position: "relative", flexShrink: 0, width: isMobile ? 80 : 108, height: isMobile ? 80 : 108 }}>
            <div
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: "50%",
                background: `conic-gradient(from 0deg,${t.accent},${t.violet},${t.green},${t.accent})`,
                animation: "spin 5s linear infinite",
                opacity: 0.7,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: "50%",
                background: t.bg,
                WebkitMask: "radial-gradient(circle,transparent 44px,black 46px)",
                mask: "radial-gradient(circle,transparent 44px,black 46px)",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: isMobile ? 80 : 108,
                height: isMobile ? 80 : 108,
                borderRadius: "50%",
                overflow: "hidden",
                background: dark
                  ? "radial-gradient(circle at 40% 35%,#1a2d4a,#080c14)"
                  : "radial-gradient(circle at 40% 35%,#dde5ff,#f4f6ff)",
              }}
            >
              <img
                src={pdp}
                alt="Photo de profil"
                className="pdp-img"
                style={{ width: "100%", height: "120%", objectFit: "cover", objectPosition: "top center", display: "block" }}
              />
            </div>
          </div>

          <div>
            <div style={{ fontSize: isMobile ? 16 : 19, fontWeight: 700, color: t.text, letterSpacing: "-0.01em" }}>
              HERIMANDA Fiononantsoa
            </div>
            <div style={{ fontSize: 13, color: t.textMuted, marginTop: 3 }}>Développeur Full-Stack · Remote</div>
            <div style={{ display: "flex", gap: 7, marginTop: 10, flexWrap: "wrap" }}>
              <Badge dark={dark} accent>Disponible de suite</Badge>
              <Badge dark={dark}>Full-Stack Dev</Badge>
            </div>
          </div>
        </div>

        {/* ── Headline ── */}
        <h1
          style={{
            fontSize: isMobile ? "clamp(28px,8vw,42px)" : "clamp(36px,4.5vw,60px)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: t.text,
            marginBottom: 16,
          }}
        >
          Je construis des{" "}
          <span
            style={{
              backgroundImage: `linear-gradient(135deg,${t.accent},${t.violet})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            systèmes élégants
          </span>{" "}
          de bout en bout
        </h1>

        <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.7, color: t.textMuted, maxWidth: 440, marginBottom: 28 }}>
          2 ans d'expérience. Je conçois des APIs robustes, des interfaces fluides et des architectures pensées pour durer.
        </p>

        {/* ── CTA ── */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
          <button
            onClick={() => scrollTo("projects")}
            style={{ padding: "13px 24px", borderRadius: 10, background: `linear-gradient(135deg,${t.accent},${t.violet})`, border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          >
            Voir mes projets →
          </button>
          <button
            onClick={() => scrollTo("contact")}
            style={{ padding: "12px 20px", borderRadius: 10, background: "transparent", border: `1px solid ${t.border}`, color: t.text, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.border)}
          >
            Me contacter
          </button>
        </div>

        {/* ── Stats ── */}
        <div style={{ display: "flex", gap: isMobile ? 24 : 36 }}>
          {[
            ["2+", "ans d'expérience"],
            ["15+", "projets réalisés"],
            ["4",   "techno maîtrisées"],
          ].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, color: t.accent, letterSpacing: "-0.02em" }}>{n}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scène 3D ── */}
      <div style={{ height: isMobile ? "260px" : "clamp(340px, 44vw, 560px)", position: "relative", marginTop: isMobile ? 24 : 0 }}>
        <OrbitalScene dark={dark} />
      </div>
    </section>
  );
}