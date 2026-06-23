import { TOKENS } from "../data/tokens";
import { EXPERIENCE } from "../data/experience";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { FadeSection } from "../components/FadeSection";
import { SectionLabel } from "../components/SectionLabel";
import { CareerGraphScene } from "../scenes/CareerGraphScene";

// ─── EXPERIENCE SECTION ───────────────────────────────────────────
export function ExperienceSection({ dark, sectionRef }) {
  const t = TOKENS[dark ? "dark" : "light"];
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        padding: isMobile ? "64px 20px" : "100px clamp(24px,4vw,48px)",
        maxWidth: 1340,
        margin: "0 auto",
      }}
    >
      <FadeSection>
        <div style={{ marginBottom: 40 }}>
          <SectionLabel color={t.accent}>PARCOURS</SectionLabel>
          <h2
            style={{
              fontSize: isMobile ? "clamp(24px,6vw,36px)" : "clamp(28px,3.5vw,42px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: t.text,
            }}
          >
            Expérience
          </h2>
        </div>
      </FadeSection>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 0 : 60,
          alignItems: "center",
        }}
      >
        {/* ── Timeline ── */}
        <div style={{ position: "relative" }}>
          <div
            style={{ position: "absolute", left: 16, top: 8, bottom: 0, width: 1, background: t.border }}
          />
          {EXPERIENCE.map((exp, i) => (
            <FadeSection key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div style={{ display: "flex", gap: isMobile ? 20 : 28, marginBottom: 28 }}>
                {/* Dot */}
                <div style={{ width: 33, flexShrink: 0, paddingTop: 6, display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: i === 0 ? t.accent : t.bg,
                      border: `2px solid ${i === 0 ? t.accent : t.textFaint}`,
                      boxShadow: i === 0 ? `0 0 14px ${t.accent}` : "none",
                      flexShrink: 0,
                    }}
                  />
                </div>
                {/* Carte */}
                <div
                  style={{
                    flex: 1,
                    padding: "16px 18px",
                    background: t.surface,
                    border: `1px solid ${t.border}`,
                    borderRadius: 14,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: isMobile ? 14 : 16, color: t.text }}>{exp.role}</div>
                      <div style={{ fontSize: 13, color: t.accent, marginTop: 2, fontWeight: 500 }}>{exp.company}</div>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "monospace",
                        color: t.textFaint,
                        padding: "4px 10px",
                        background: t.accentGlow,
                        borderRadius: 6,
                        alignSelf: "flex-start",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {exp.year}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.68, color: t.textMuted }}>{exp.desc}</p>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* ── Scène 3D (desktop seulement) ── */}
        {!isMobile && (
          <FadeSection
            style={{
              height: 420,
              overflow: "hidden",
              background: dark ? "rgba(8,12,20,0.6)" : "rgba(244,246,255,0.6)",
              borderRadius: 16,
            }}
          >
            <CareerGraphScene dark={dark} />
          </FadeSection>
        )}
      </div>
    </section>
  );
}