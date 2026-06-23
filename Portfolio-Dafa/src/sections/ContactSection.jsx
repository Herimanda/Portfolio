import { TOKENS } from "../data/tokens";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { FadeSection } from "../components/FadeSection";
import { SectionLabel } from "../components/SectionLabel";
import { SignalScene } from "../scenes/SignalScene";

const CONTACTS = [
  { label: "Email",    value: "herimanda23@gmail.com",         href: "mailto:herimanda23@gmail.com",  icon: "✉"  },
  { label: "LinkedIn", value: "linkedin.com/in/Herimanda",     href: "#",                             icon: "in" },
  { label: "GitHub",   value: "github.com/Herimanda",          href: "https://github.com/Herimanda", icon: "⌥"  },
];

// ─── CONTACT SECTION ──────────────────────────────────────────────
export function ContactSection({ dark, sectionRef }) {
  const t = TOKENS[dark ? "dark" : "light"];
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: isMobile ? "64px 20px 80px" : "100px clamp(24px,4vw,48px)",
        maxWidth: 1340,
        margin: "0 auto",
      }}
    >
      <FadeSection>
        <div style={{ marginBottom: 40 }}>
          <SectionLabel color={t.violet}>CONTACT</SectionLabel>
          <h2
            style={{
              fontSize: isMobile ? "clamp(24px,6vw,36px)" : "clamp(28px,3.5vw,42px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: t.text,
              marginBottom: 12,
            }}
          >
            Travaillons ensemble
          </h2>
          <p style={{ color: t.textMuted, fontSize: 15 }}>
            Ouvert aux opportunités full-time ou freelance. Réponse sous 24h.
          </p>
        </div>
      </FadeSection>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 24 : 100,
          alignItems: "center",
        }}
      >
        {/* ── Scène 3D (desktop seulement) ── */}
        {!isMobile && (
          <FadeSection
            style={{
              height: 400,
              borderRadius: 20,
              overflow: "hidden",
              background: dark ? "rgba(8,12,20,0.6)" : "rgba(244,246,255,0.6)",
            }}
          >
            <SignalScene dark={dark} />
          </FadeSection>
        )}

        {/* ── Carte de contact ── */}
        <FadeSection>
          <div
            style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 20,
              padding: isMobile ? "24px 20px" : "32px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {CONTACTS.map(({ label, value, href, icon }) => (
              <a
                key={label}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  textDecoration: "none",
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1px solid ${t.border}`,
                  background: t.bg,
                  transition: "all 0.18s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = t.accent;
                  e.currentTarget.style.background = t.accentGlow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = t.border;
                  e.currentTarget.style.background = t.bg;
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: t.accentGlow,
                    border: `1px solid ${t.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    color: t.accent,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 13, color: t.text, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {value}
                  </div>
                </div>
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  stroke={t.textFaint}
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  style={{ marginLeft: "auto", flexShrink: 0 }}
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}

            {/* Disponibilité */}
            <div
              style={{
                marginTop: 4,
                padding: "14px 16px",
                borderRadius: 12,
                background: t.accentGlow,
                border: `1px solid ${t.border}`,
              }}
            >
              <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65 }}>
                💼 <strong style={{ color: t.text }}>Disponible dès maintenant</strong> — Remote ou Antananarivo.
                Je recherche un poste full-stack ou une collaboration sur un produit ambitieux.
              </div>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}