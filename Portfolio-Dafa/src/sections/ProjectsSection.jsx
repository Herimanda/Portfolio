import { TOKENS } from "../data/tokens";
import { PROJECTS } from "../data/projects.";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { FadeSection } from "../components/FadeSection";
import { SectionLabel } from "../components/SectionLabel";
import { ProjectCard } from "../components/ProjectCard";

// ─── PROJECTS SECTION ─────────────────────────────────────────────
export function ProjectsSection({ dark, sectionRef, onOpenModal }) {
  const t = TOKENS[dark ? "dark" : "light"];
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: isMobile ? "64px 20px" : "100px clamp(24px,4vw,48px)",
        maxWidth: 1340,
        margin: "0 auto",
      }}
    >
      <FadeSection>
        <div style={{ marginBottom: 40 }}>
          <SectionLabel color={t.accent}>SELECTED WORK</SectionLabel>
          <h2
            style={{
              fontSize: isMobile ? "clamp(24px,6vw,36px)" : "clamp(28px,3.5vw,42px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: t.text,
              marginBottom: 12,
            }}
          >
            Projets récents
          </h2>
          <p style={{ color: t.textMuted, fontSize: 15, maxWidth: 480 }}>
            Cliquez sur un projet pour voir les détails et les screenshots.
          </p>
        </div>
      </FadeSection>

      {/* ── Grille de cartes ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(290px,1fr))",
          gap: 16,
        }}
      >
        {PROJECTS.map((p, i) => (
          <FadeSection key={p.title} style={{ transitionDelay: `${i * 0.08}s` }}>
            <ProjectCard project={p} dark={dark} index={i} onOpen={onOpenModal} />
          </FadeSection>
        ))}
      </div>

      {/* ── Lien GitHub global ── */}
      <FadeSection style={{ marginTop: 36 }}>
        <div
          style={{
            padding: isMobile ? "16px 18px" : "20px 28px",
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: t.text }}>Voir tout sur GitHub</div>
            <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>+10 projets open-source</div>
          </div>
          <a
            href="https://github.com/Herimanda"
            style={{ padding: "9px 20px", borderRadius: 8, background: t.accentGlow, border: `1px solid ${t.accent}`, color: t.accent, fontSize: 13, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap" }}
          >
            github.com →
          </a>
        </div>
      </FadeSection>
    </section>
  );
}