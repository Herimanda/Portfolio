import { TOKENS } from "../data/tokens";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { FadeSection } from "../components/FadeSection";
import { SectionLabel } from "../components/SectionLabel";
import { SkillsContent } from "../components/SkillsContent";

// ─── SKILLS SECTION ───────────────────────────────────────────────
export function SkillsSection({ dark, sectionRef }) {
  const t = TOKENS[dark ? "dark" : "light"];
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: isMobile ? "64px 20px" : "100px clamp(24px,4vw,48px)",
        maxWidth: 1340,
        margin: "0 auto",
      }}
    >
      <FadeSection>
        <div style={{ marginBottom: 40 }}>
          <SectionLabel color={t.violet}>TECH STACK</SectionLabel>
          <h2
            style={{
              fontSize: isMobile ? "clamp(24px,6vw,36px)" : "clamp(28px,3.5vw,42px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: t.text,
            }}
          >
            Compétences
          </h2>
        </div>
        <SkillsContent dark={dark} />
      </FadeSection>
    </section>
  );
}