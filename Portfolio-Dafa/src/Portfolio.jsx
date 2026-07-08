import { useState, useEffect, useRef } from "react";
import { TOKENS } from "./data/tokens";
import { NAV_SECTIONS } from "./data/experience";
import { globalCSS } from "./styles/GlobalStyles";

// ── Composants ──
import { Loader }        from "./components/Loader";
import { Navbar }        from "./components/Navbar";
import { Footer }        from "./components/Footer";
import { ProjectModal }  from "./components/ProjectModal";

// ── Sections ──
import { HeroSection }       from "./sections/HeroSection";
import { ProjectsSection }   from "./sections/ProjectsSection";
import { SkillsSection }     from "./sections/SkillsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ContactSection }    from "./sections/ContactSection";

// ─── PORTFOLIO (root) ─────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark]               = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [loading, setLoading]         = useState(true);   // ← loader actif au démarrage
  const sectionRefs = useRef({});
  const t = TOKENS[dark ? "dark" : "light"];

  // Détection de la section active au scroll
  useEffect(() => {
    if (loading) return;
    const onScroll = () => {
      const offset = 100;
      for (const { id } of [...NAV_SECTIONS].reverse()) {
        const el = sectionRefs.current[id];
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("hero");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading]);

  // Helper : scroll smooth vers une section
  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Ref helper pour les sections
  const ref = (id) => (el) => { sectionRefs.current[id] = el; };

  return (
    <>
      {/* ── Loader (monté tant que loading === true) ── */}
      {loading && (
        <Loader onDone={() => setLoading(false)} />
      )}

      {/*
       * Le portfolio est rendu en dessous du loader dès le départ
       * (pré-chargement des assets Three.js pendant l'animation),
       * mais invisible jusqu'à la fin grâce à opacity + pointer-events.
       */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.4s ease 0.1s",
          pointerEvents: loading ? "none" : "all",
          minHeight: "100vh",
          background: t.bg,
          color: t.text,
          fontFamily: "'Inter', system-ui, sans-serif",
          transition: loading
            ? "none"
            : "opacity 0.4s ease 0.1s, background 0.35s, color 0.35s",
        }}
      >
        <style>{globalCSS}</style>

        <Navbar
          dark={dark}
          setDark={setDark}
          activeSection={activeSection}
          scrollTo={scrollTo}
        />

        <HeroSection
          dark={dark}
          sectionRef={ref("hero")}
          scrollTo={scrollTo}
        />

        {/* Flèche de scroll */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: -32,
            marginBottom: 24,
            animation: "pulse 2s infinite",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={t.textFaint} strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={{ width: "100%", height: 1, background: t.divider }} />

        <ProjectsSection
          dark={dark}
          sectionRef={ref("projects")}
          onOpenModal={setActiveModal}
        />

        <div style={{ width: "100%", height: 1, background: t.divider }} />

        <SkillsSection
          dark={dark}
          sectionRef={ref("skills")}
        />

        <div style={{ width: "100%", height: 1, background: t.divider }} />

        <ExperienceSection
          dark={dark}
          sectionRef={ref("experience")}
        />

        <div style={{ width: "100%", height: 1, background: t.divider }} />

        <ContactSection
          dark={dark}
          sectionRef={ref("contact")}
        />

        <Footer dark={dark} />

        {activeModal && (
          <ProjectModal
            project={activeModal}
            dark={dark}
            onClose={() => setActiveModal(null)}
          />
        )}
      </div>
    </>
  );
}