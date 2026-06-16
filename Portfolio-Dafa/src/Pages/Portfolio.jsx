import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

// ─── DESIGN TOKENS ────────────────────────────────────────────────
const TOKENS = {
  dark: {
    bg: "#080c14",
    surface: "#0d1320",
    surfaceHover: "#121a2e",
    border: "rgba(99,211,255,0.12)",
    borderHover: "rgba(99,211,255,0.3)",
    text: "#e8f0fe",
    textMuted: "#7a8ab0",
    textFaint: "#3d4f72",
    accent: "#63d3ff",
    accentGlow: "rgba(99,211,255,0.10)",
    violet: "#a78bfa",
    violetGlow: "rgba(167,139,250,0.10)",
    green: "#34d399",
    greenGlow: "rgba(52,211,153,0.10)",
    divider: "rgba(99,211,255,0.06)",
  },
  light: {
    bg: "#f4f6ff",
    surface: "#ffffff",
    surfaceHover: "#eef1ff",
    border: "rgba(80,100,255,0.13)",
    borderHover: "rgba(80,100,255,0.32)",
    text: "#0f1729",
    textMuted: "#4a5580",
    textFaint: "#9aa3c2",
    accent: "#2563eb",
    accentGlow: "rgba(37,99,235,0.08)",
    violet: "#7c3aed",
    violetGlow: "rgba(124,58,237,0.08)",
    green: "#059669",
    greenGlow: "rgba(5,150,105,0.08)",
    divider: "rgba(80,100,255,0.07)",
  },
};

// ─── SCREENSHOT PLACEHOLDERS ──────────────────────────────────────
const makeScreenshot = (label, c1, c2, idx) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520">
  <defs><linearGradient id="g${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient></defs>
  <rect width="900" height="520" fill="url(#g${idx})"/>
  <rect x="0" y="0" width="900" height="44" fill="rgba(0,0,0,0.3)"/>
  <circle cx="24" cy="22" r="7" fill="#ff5f56"/><circle cx="46" cy="22" r="7" fill="#ffbd2e"/><circle cx="68" cy="22" r="7" fill="#27c93f"/>
  <rect x="200" y="12" width="500" height="20" rx="10" fill="rgba(255,255,255,0.1)"/>
  <rect x="40" y="80" width="200" height="360" rx="8" fill="rgba(0,0,0,0.2)"/>
  <rect x="56" y="100" width="168" height="20" rx="4" fill="rgba(255,255,255,0.15)"/>
  <rect x="56" y="132" width="120" height="12" rx="3" fill="rgba(255,255,255,0.08)"/>
  <rect x="56" y="152" width="140" height="12" rx="3" fill="rgba(255,255,255,0.08)"/>
  <rect x="260" y="80" width="600" height="180" rx="8" fill="rgba(0,0,0,0.2)"/>
  <rect x="280" y="100" width="200" height="16" rx="3" fill="rgba(255,255,255,0.2)"/>
  <rect x="280" y="126" width="340" height="10" rx="3" fill="rgba(255,255,255,0.1)"/>
  <rect x="260" y="278" width="185" height="160" rx="8" fill="rgba(0,0,0,0.18)"/>
  <rect x="455" y="278" width="185" height="160" rx="8" fill="rgba(0,0,0,0.18)"/>
  <rect x="650" y="278" width="185" height="160" rx="8" fill="rgba(0,0,0,0.18)"/>
  <text x="450" y="490" font-family="monospace" font-size="16" fill="rgba(255,255,255,0.3)" text-anchor="middle">${label}</text>
</svg>`)}`;

// ─── DATA ─────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Nexus API Platform",
    subtitle: "Plateforme API haute performance",
    desc: "Plateforme RESTful & GraphQL haute performance avec rate limiting, auth JWT, logs temps réel et dashboard analytics.",
    longDesc:
      "Nexus est une plateforme API conçue pour les équipes engineering qui ont besoin de fiabilité à grande échelle. Elle expose un endpoint GraphQL unifié par-dessus plusieurs microservices, avec un système de rate limiting par tenant, authentification JWT avec rotation automatique des clés, et un moteur de logs temps réel basé sur WebSocket.",
    tags: ["Node.js", "GraphQL", "PostgreSQL", "Redis", "Docker"],
    role: "Lead Backend",
    year: "2024",
    github: "#",
    live: "#",
    screenshots: [
      makeScreenshot("Dashboard — Vue principale", "#0d1a2e", "#1a2a4a", 0),
      makeScreenshot("API Explorer — GraphQL", "#0a1f1a", "#123028", 1),
      makeScreenshot("Analytics — Métriques live", "#1a0d2e", "#2a1a4a", 2),
    ],
  },
  {
    title: "Orbit CMS",
    subtitle: "CMS headless nouvelle génération",
    desc: "CMS headless avec éditeur rich-text, versioning, workflows d'approbation et CDN intégré.",
    longDesc:
      "Orbit CMS répond au besoin des équipes éditoriales de gérer du contenu structuré sans couplage au frontend. L'éditeur rich-text supporte les blocs custom, les médias embarqués et la collaboration temps réel. Le système de versioning permet de comparer et restaurer n'importe quelle révision.",
    tags: ["React", "Next.js", "Prisma", "S3", "TypeScript"],
    role: "Full-Stack",
    year: "2023",
    github: "#",
    live: "#",
    screenshots: [
      makeScreenshot("Éditeur de contenu", "#1a1208", "#2a2010", 3),
      makeScreenshot("Gestion des médias", "#081218", "#102030", 4),
      makeScreenshot("Workflows", "#180820", "#280a30", 5),
    ],
  },
  {
    title: "Pulse Dashboard",
    subtitle: "Monitoring microservices temps réel",
    desc: "Dashboard de monitoring : métriques, alertes intelligentes, traçage distribué et logs agrégés.",
    longDesc:
      "Pulse agrège métriques Prometheus, traces OpenTelemetry et logs structurés dans une interface unifiée. Les alertes sont configurables par seuil, avec escalade automatique et intégration Slack/PagerDuty. Le traçage distribué permet de suivre une requête à travers tous les services impliqués.",
    tags: ["Vue 3", "WebSocket", "InfluxDB", "Docker", "Prometheus"],
    role: "Frontend Lead",
    year: "2023",
    github: "#",
    live: "#",
    screenshots: [
      makeScreenshot("Overview — Santé globale", "#0a1a0a", "#122212", 6),
      makeScreenshot("Trace Explorer", "#080e1a", "#101830", 7),
      makeScreenshot("Alerting", "#1a0a0a", "#2a1010", 8),
    ],
  },
  {
    title: "Stellar Auth",
    subtitle: "SDK d'authentification open-source",
    desc: "SDK multi-langages : OAuth2, OIDC, MFA, sessions sécurisées et rotation automatique des clés.",
    longDesc:
      "Stellar Auth implémente les specs OAuth2 et OIDC complètes, avec MFA TOTP/WebAuthn, gestion de sessions multi-devices, et rotation automatique des clés RSA. Le SDK est disponible pour Node.js, Python, Go et Ruby.",
    tags: ["TypeScript", "OAuth2", "JWT", "Crypto", "Node.js"],
    role: "Author & Maintainer",
    year: "2022",
    github: "#",
    live: "#",
    screenshots: [
      makeScreenshot("Documentation interactive", "#0a0a1a", "#12103a", 9),
      makeScreenshot("Flows OAuth2", "#0a1210", "#102018", 10),
      makeScreenshot("SDK Playground", "#100a1a", "#1e1030", 11),
    ],
  },
];

const SKILLS_GROUPS = [
  {
    label: "Frontend",
    color: "accent",
    icon: "◈",
    items: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 85 },
      { name: "Vue 3", level: 78 },
      { name: "CSS / Animation", level: 80 },
    ],
  },
  {
    label: "Backend",
    color: "violet",
    icon: "◉",
    items: [
      { name: "Node.js / Express", level: 88 },
      { name: "GraphQL", level: 78 },
      { name: "REST API Design", level: 90 },
      { name: "Python / FastAPI", level: 70 },
    ],
  },
  {
    label: "Infra",
    color: "green",
    icon: "◌",
    items: [
      { name: "PostgreSQL", level: 80 },
      { name: "Docker / K8s", level: 74 },
      { name: "Redis", level: 72 },
      { name: "AWS / Vercel", level: 75 },
    ],
  },
];

const EXPERIENCE = [
  {
    year: "2023 – Présent",
    role: "Senior Full-Stack Dev",
    company: "TechNova",
    desc: "Lead technique sur une plateforme SaaS B2B — architecture microservices, API design, mentoring équipe de 6 devs.",
  },
  {
    year: "2021 – 2023",
    role: "Full-Stack Developer",
    company: "Meridian Labs",
    desc: "Développement de features produit en React + Rails, mise en place CI/CD, optimisation performances.",
  },
  {
    year: "2019 – 2021",
    role: "Frontend Developer",
    company: "Pixel & Co",
    desc: "Interfaces réactives, design system interne, intégrations API tierces.",
  },
];

const PROFILE_SRC = null; // Remplace par ton URL de photo

// ─── NAV SECTIONS ─────────────────────────────────────────────────
const NAV_SECTIONS = [
  { id: "hero", label: "Accueil" },
  { id: "projects", label: "Projets" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Parcours" },
  { id: "contact", label: "Contact" },
];

// ─── AVATAR ───────────────────────────────────────────────────────
function Avatar({ size = 72, dark, glowing }) {
  const t = TOKENS[dark ? "dark" : "light"];
  return (
    <div
      style={{ position: "relative", width: size, height: size, flexShrink: 0 }}
    >
      {glowing && (
        <div
          style={{
            position: "absolute",
            inset: -3,
            borderRadius: "50%",
            background: `conic-gradient(${t.accent}, ${t.violet}, ${t.accent})`,
            animation: "spin 4s linear infinite",
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: `2px solid ${t.border}`,
          overflow: "hidden",
          background: `linear-gradient(135deg, ${t.accentGlow}, ${t.violetGlow})`,
        }}
      >
        {PROFILE_SRC ? (
          <img
            src={PROFILE_SRC}
            alt="Profil"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <svg viewBox="0 0 88 88" style={{ width: "100%", height: "100%" }}>
            <rect width="88" height="88" fill={dark ? "#0d1a2e" : "#dde5ff"} />
            <circle
              cx="44"
              cy="32"
              r="16"
              fill={dark ? "#1a2d4a" : "#b8c8ff"}
            />
            <ellipse
              cx="44"
              cy="80"
              rx="26"
              ry="20"
              fill={dark ? "#1a2d4a" : "#b8c8ff"}
            />
            <text
              x="44"
              y="38"
              textAnchor="middle"
              fontSize="17"
              fontWeight="700"
              fill={dark ? "#63d3ff" : "#2563eb"}
              fontFamily="monospace"
            >
              AD
            </text>
          </svg>
        )}
      </div>
    </div>
  );
}

// ─── BADGE ────────────────────────────────────────────────────────
function Badge({ children, dark, accent = false }) {
  const t = TOKENS[dark ? "dark" : "light"];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.05em",
        background: accent ? t.accentGlow : t.violetGlow,
        color: accent ? t.accent : t.violet,
        border: `1px solid ${accent ? t.accent : t.violet}`,
      }}
    >
      {children}
    </span>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────
function SectionLabel({ children, color }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        color,
        letterSpacing: "0.12em",
        marginBottom: 10,
        margin: "0 0 10px",
      }}
    >
      // {children}
    </p>
  );
}

// ─── USE IN-VIEW ──────────────────────────────────────────────────
function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.15,
      ...options,
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

// ─── FADE-IN SECTION WRAPPER ──────────────────────────────────────
function FadeSection({ children, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── THREE.JS ORBITAL ─────────────────────────────────────────────
function OrbitalScene({ dark }) {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth,
      H = el.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const cA = dark ? 0x63d3ff : 0x2563eb;
    const cV = dark ? 0xa78bfa : 0x7c3aed;
    const cW = dark ? 0xc8d8ff : 0x0f1729;

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.85, 4),
      new THREE.MeshStandardMaterial({
        color: dark ? 0x0d1a2e : 0xdde5ff,
        metalness: 0.7,
        roughness: 0.2,
      }),
    );
    scene.add(core);
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.87, 2),
      new THREE.MeshBasicMaterial({
        color: cA,
        wireframe: true,
        opacity: dark ? 0.15 : 0.1,
        transparent: true,
      }),
    );
    scene.add(wire);
    scene.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1.05, 32, 32),
        new THREE.MeshBasicMaterial({
          color: cA,
          transparent: true,
          opacity: dark ? 0.04 : 0.03,
          side: THREE.BackSide,
        }),
      ),
    );

    const makeRing = (r, tilt, col, op) => {
      const pts = Array.from(
        { length: 129 },
        (_, i) =>
          new THREE.Vector3(
            Math.cos((i / 128) * Math.PI * 2) * r,
            0,
            Math.sin((i / 128) * Math.PI * 2) * r,
          ),
      );
      const ring = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({
          color: col,
          transparent: true,
          opacity: op,
        }),
      );
      ring.rotation.x = tilt;
      return ring;
    };
    const rings = [
      makeRing(1.6, Math.PI * 0.18, cA, dark ? 0.45 : 0.3),
      makeRing(2.1, Math.PI * 0.42, cV, dark ? 0.3 : 0.2),
      makeRing(2.5, Math.PI * 0.65, cW, dark ? 0.15 : 0.1),
    ];
    rings.forEach((r) => scene.add(r));

    const dg = new THREE.SphereGeometry(0.045, 8, 8);
    const dots = Array.from({ length: 6 }, (_, i) => {
      const d = new THREE.Mesh(dg, new THREE.MeshBasicMaterial({ color: cA }));
      scene.add(d);
      return { mesh: d, angle: (i / 6) * Math.PI * 2 };
    });
    const vDots = Array.from({ length: 4 }, (_, i) => {
      const d = new THREE.Mesh(dg, new THREE.MeshBasicMaterial({ color: cV }));
      scene.add(d);
      return { mesh: d, angle: (i / 4) * Math.PI * 2 + 0.5 };
    });

    scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.4 : 0.8));
    const pl = new THREE.PointLight(cA, dark ? 2 : 1, 8);
    pl.position.set(3, 2, 2);
    scene.add(pl);
    const vl = new THREE.PointLight(cV, dark ? 1.2 : 0.6, 6);
    vl.position.set(-2, -1, 1);
    scene.add(vl);

    const pos = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) {
      const th = Math.random() * Math.PI * 2,
        ph = Math.acos(2 * Math.random() - 1),
        r = 3.2 + Math.random() * 2.8;
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph);
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    scene.add(
      new THREE.Points(
        pg,
        new THREE.PointsMaterial({
          color: cA,
          size: 0.025,
          transparent: true,
          opacity: dark ? 0.5 : 0.3,
        }),
      ),
    );

    const onResize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    const onMouse = (e) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };
    el.addEventListener("mousemove", onMouse);

    let raf;
    const clk = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clk.getElapsedTime();
      core.rotation.y = t * 0.12;
      core.rotation.x = t * 0.05;
      wire.rotation.y = -t * 0.08;
      wire.rotation.x = t * 0.04;
      rings[0].rotation.z = t * 0.22;
      rings[1].rotation.z = -t * 0.15;
      rings[2].rotation.z = t * 0.09;
      dots.forEach((d) => {
        const a = d.angle + t * 0.5;
        d.mesh.position.set(
          Math.cos(a) * 1.6,
          Math.sin(a) * 1.6 * Math.sin(rings[0].rotation.x),
          Math.sin(a) * 1.6 * Math.cos(rings[0].rotation.x),
        );
      });
      vDots.forEach((d) => {
        const a = d.angle + t * 0.3;
        d.mesh.position.set(
          Math.cos(a) * 2.1,
          Math.sin(a) * 2.1 * Math.sin(rings[1].rotation.x),
          Math.sin(a) * 2.1 * Math.cos(rings[1].rotation.x),
        );
      });
      camera.position.x +=
        (mouseRef.current.x * 0.5 - camera.position.x) * 0.04;
      camera.position.y +=
        (mouseRef.current.y * 0.3 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("mousemove", onMouse);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [dark]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}

// ─── PROJECT MODAL ────────────────────────────────────────────────
function ProjectModal({ project, dark, onClose }) {
  const t = TOKENS[dark ? "dark" : "light"];
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
    [sliding, total],
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
  const accentGlow =
    project.tags.length % 2 === 0 ? t.accentGlow : t.violetGlow;

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
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "fadeIn 0.18s ease",
      }}
    >
      <div
        style={{
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 20,
          width: "100%",
          maxWidth: 860,
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          animation: "slideUp 0.24s ease",
          boxShadow: dark
            ? "0 0 60px rgba(99,211,255,0.07), 0 32px 80px rgba(0,0,0,0.6)"
            : "0 32px 80px rgba(0,0,30,0.18)",
        }}
      >
        {/* Carousel */}
        <div
          style={{
            position: "relative",
            aspectRatio: "900/500",
            background: "#030609",
            flexShrink: 0,
            overflow: "hidden",
          }}
          onTouchStart={(e) => {
            touchStart.current = e.touches[0].clientX;
          }}
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
              objectFit: "cover",
              opacity: sliding ? 0 : 1,
              transition: "opacity 0.18s",
            }}
          />
          {total > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(6px)",
                  color: "#fff",
                  fontSize: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background .18s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(99,211,255,0.28)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(0,0,0,0.55)")
                }
              >
                ‹
              </button>
              <button
                onClick={() => go(1)}
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(6px)",
                  color: "#fff",
                  fontSize: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background .18s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(99,211,255,0.28)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(0,0,0,0.55)")
                }
              >
                ›
              </button>
            </>
          )}
          <div
            style={{
              position: "absolute",
              bottom: 14,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 6,
            }}
          >
            {project.screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                style={{
                  width: i === slide ? 22 : 7,
                  height: 7,
                  borderRadius: 99,
                  border: "none",
                  cursor: "pointer",
                  background: i === slide ? accent : "rgba(255,255,255,0.3)",
                  transition: "all 0.25s",
                  padding: 0,
                }}
              />
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              padding: "3px 10px",
              borderRadius: 20,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              fontSize: 11,
              color: "rgba(255,255,255,0.65)",
              fontFamily: "monospace",
            }}
          >
            {slide + 1} / {total}
          </div>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              color: "rgba(255,255,255,0.8)",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(200,50,50,0.55)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(0,0,0,0.55)")
            }
          >
            ✕
          </button>
        </div>
        {/* Thumbnails */}
        <div
          style={{
            display: "flex",
            gap: 7,
            padding: "9px 18px",
            background: dark ? "#060a10" : "#edf0ff",
            borderBottom: `1px solid ${t.border}`,
            overflowX: "auto",
          }}
        >
          {project.screenshots.map((src, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              style={{
                width: 76,
                height: 44,
                flexShrink: 0,
                border: `2px solid ${i === slide ? accent : "transparent"}`,
                borderRadius: 6,
                overflow: "hidden",
                cursor: "pointer",
                padding: 0,
                opacity: i === slide ? 1 : 0.45,
                transition: "all 0.2s",
              }}
            >
              <img
                src={src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
        {/* Info */}
        <div style={{ padding: "22px 26px 26px", overflowY: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 14,
              marginBottom: 14,
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 3px",
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: t.textFaint,
                  letterSpacing: "0.07em",
                }}
              >
                {project.role} · {project.year}
              </p>
              <h2
                style={{
                  margin: 0,
                  fontSize: 21,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: t.text,
                }}
              >
                {project.title}
              </h2>
              <p
                style={{ margin: "3px 0 0", fontSize: 13, color: t.textMuted }}
              >
                {project.subtitle}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <a
                href={project.github}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  textDecoration: "none",
                  background: t.bg,
                  border: `1px solid ${t.border}`,
                  fontSize: 12,
                  color: t.textMuted,
                  fontWeight: 500,
                }}
              >
                GitHub →
              </a>
              <a
                href={project.live}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  textDecoration: "none",
                  background: accentGlow,
                  border: `1px solid ${accent}`,
                  fontSize: 12,
                  color: accent,
                  fontWeight: 500,
                }}
              >
                Live →
              </a>
            </div>
          </div>
          <p
            style={{
              margin: "0 0 18px",
              fontSize: 14,
              lineHeight: 1.75,
              color: t.textMuted,
            }}
          >
            {project.longDesc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map((tag, i) => (
              <Badge key={tag} dark={dark} accent={i % 2 === 0}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────
function ProjectCard({ project, dark, index, onOpen }) {
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
      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          overflow: "hidden",
          background: "#03060c",
        }}
      >
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
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "3px 9px",
            borderRadius: 99,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            fontSize: 10,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "monospace",
          }}
        >
          {project.screenshots.length} screens
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.22s",
          }}
        >
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 99,
              background: isAccent ? t.accent : t.violet,
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Voir le projet →
          </div>
        </div>
      </div>
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
        <h3
          style={{
            margin: "0 0 5px",
            fontSize: 16,
            fontWeight: 600,
            color: t.text,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            margin: "0 0 13px",
            fontSize: 13,
            lineHeight: 1.6,
            color: t.textMuted,
          }}
        >
          {project.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.tags.slice(0, 3).map((tag, i) => (
            <Badge key={tag} dark={dark} accent={i % 2 === 0}>
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <span
              style={{
                fontSize: 11,
                color: t.textFaint,
                alignSelf: "center",
                fontFamily: "monospace",
              }}
            >
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SKILLS SECTION CONTENT ───────────────────────────────────────
function SkillsContent({ dark }) {
  const t = TOKENS[dark ? "dark" : "light"];
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
    green: { fill: t.green, glow: t.greenGlow, border: t.green },
  };
  const tools = [
    "Git",
    "CI/CD",
    "AWS",
    "Vercel",
    "Figma",
    "Supabase",
    "MongoDB",
    "Prisma",
    "Jest",
    "Vitest",
    "Nx",
    "pnpm",
  ];

  return (
    <>
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
                padding: "8px 20px",
                borderRadius: 9,
                border: active
                  ? `1px solid ${col.border}`
                  : "1px solid transparent",
                cursor: "pointer",
                background: active ? col.glow : "transparent",
                color: active ? col.fill : t.textMuted,
                fontSize: 13,
                fontWeight: 500,
                fontFamily: "inherit",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <span style={{ fontSize: 16 }}>{g.icon}</span>
              {g.label}
            </button>
          );
        })}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
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
                animation: animated
                  ? `fadeSlideIn 0.28s ease ${i * 0.06}s both`
                  : "none",
              }}
            >
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{ fontSize: 14, fontWeight: 600, color: t.text }}
                  >
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: col.fill,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {skill.level}
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        color: t.textFaint,
                      }}
                    >
                      %
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    height: 3,
                    borderRadius: 99,
                    background: t.border,
                    overflow: "hidden",
                  }}
                >
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
      <p
        style={{
          fontSize: 11,
          fontFamily: "monospace",
          color: t.textFaint,
          letterSpacing: "0.08em",
          marginBottom: 12,
        }}
      >
        // ALSO USING
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {tools.map((tool, i) => (
          <span
            key={tool}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: t.surface,
              border: `1px solid ${t.border}`,
              fontSize: 12,
              color: t.textMuted,
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.18s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor =
                i % 3 === 0 ? t.accent : i % 3 === 1 ? t.violet : t.green;
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

// ─── MAIN APP ─────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef({});
  const t = TOKENS[dark ? "dark" : "light"];

  // Track scroll for nav highlight + background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
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
  }, []);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        fontFamily: "'Inter', system-ui, sans-serif",
        transition: "background 0.35s, color 0.35s",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: auto; }
        ::selection { background: rgba(99,211,255,0.22); }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(99,211,255,0.18); border-radius: 99px; }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: 60,
          background: scrolled
            ? dark
              ? "rgba(8,12,20,0.92)"
              : "rgba(244,246,255,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? `1px solid ${t.border}`
            : "1px solid transparent",
          transition:
            "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px, 5vw, 60px)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Avatar size={28} dark={dark} />
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: t.text,
            }}
          >
            Alex Dubois
          </span>
        </button>

        {/* Nav links — pill indicator */}
        <div
          style={{
            display: "flex",
            gap: 2,
            background: dark ? "rgba(13,19,32,0.6)" : "rgba(255,255,255,0.6)",
            padding: 4,
            borderRadius: 12,
            border: `1px solid ${t.border}`,
            backdropFilter: "blur(8px)",
          }}
        >
          {NAV_SECTIONS.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: active
                    ? dark
                      ? "rgba(99,211,255,0.12)"
                      : "rgba(37,99,235,0.09)"
                    : "transparent",
                  border: active
                    ? `1px solid ${t.accent}`
                    : "1px solid transparent",
                  borderRadius: 8,
                  cursor: "pointer",
                  padding: "6px 14px",
                  fontSize: 12.5,
                  fontWeight: active ? 600 : 400,
                  color: active ? t.accent : t.textMuted,
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setDark((d) => !d)}
          style={{
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 8,
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: 15,
            transition: "all 0.2s",
            color: t.text,
          }}
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </nav>

      {/* ══════════════════════════════════════════════════════════
           ██  HERO
      ══════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        ref={(el) => (sectionRefs.current.hero = el)}
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: 40,
          padding: "80px clamp(24px, 6vw, 100px) 60px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <Avatar size={72} dark={dark} glowing />
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>
                Alex Dubois
              </div>
              <div style={{ fontSize: 13, color: t.textMuted, marginTop: 3 }}>
                Développeur Full-Stack · Remote
              </div>
              <div style={{ display: "flex", gap: 7, marginTop: 8 }}>
                <Badge dark={dark} accent>
                  Available for hire
                </Badge>
                <Badge dark={dark}>Full-Stack Dev</Badge>
              </div>
            </div>
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 4.5vw, 60px)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: t.text,
              marginBottom: 20,
            }}
          >
            Je construis des{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${t.accent}, ${t.violet})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              systèmes élégants
            </span>{" "}
            de bout en bout
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: t.textMuted,
              maxWidth: 440,
              marginBottom: 36,
            }}
          >
            5 ans d'expérience. Je conçois des APIs robustes, des interfaces
            fluides et des architectures pensées pour durer.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 52,
            }}
          >
            <button
              onClick={() => scrollTo("projects")}
              style={{
                padding: "13px 28px",
                borderRadius: 10,
                background: `linear-gradient(135deg, ${t.accent}, ${t.violet})`,
                border: "none",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Voir mes projets →
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                padding: "12px 24px",
                borderRadius: 10,
                background: "transparent",
                border: `1px solid ${t.border}`,
                color: t.text,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = t.accent)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = t.border)
              }
            >
              Me contacter
            </button>
          </div>

          <div style={{ display: "flex", gap: 36 }}>
            {[
              ["5+", "ans d'expérience"],
              ["20+", "projets livrés"],
              ["8", "techno maîtrisées"],
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: t.accent,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {n}
                </div>
                <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D */}
        <div
          style={{ height: "clamp(340px, 44vw, 560px)", position: "relative" }}
        >
          <OrbitalScene dark={dark} />
          {[
            { label: "React", top: "18%", left: "8%", accent: true },
            { label: "Node.js", top: "72%", left: "5%", accent: false },
            { label: "PostgreSQL", top: "14%", right: "4%", accent: false },
            { label: "Docker", top: "78%", right: "8%", accent: true },
          ].map(({ label, accent, ...pos }) => (
            <div
              key={label}
              style={{
                position: "absolute",
                ...pos,
                padding: "5px 12px",
                background: dark
                  ? "rgba(13,19,32,0.82)"
                  : "rgba(255,255,255,0.88)",
                border: `1px solid ${accent ? t.accent : t.border}`,
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 500,
                fontFamily: "'JetBrains Mono', monospace",
                color: accent ? t.accent : t.textMuted,
                backdropFilter: "blur(8px)",
                pointerEvents: "none",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* Scroll indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: -32,
          marginBottom: 24,
          animation: "pulse 2s infinite",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={t.textFaint}
          strokeWidth="1.5"
        >
          <path
            d="M12 5v14M5 12l7 7 7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ── HORIZONTAL RULE ── */}
      <div style={{ width: "100%", height: 1, background: t.divider }} />

      {/* ══════════════════════════════════════════════════════════
           ██  PROJECTS
      ══════════════════════════════════════════════════════════ */}
      <section
        id="projects"
        ref={(el) => (sectionRefs.current.projects = el)}
        style={{
          padding: "100px clamp(20px, 6vw, 100px)",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <FadeSection>
          <div style={{ marginBottom: 48 }}>
            <SectionLabel color={t.accent}>SELECTED WORK</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 20,
          }}
        >
          {PROJECTS.map((p, i) => (
            <FadeSection
              key={p.title}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <ProjectCard
                project={p}
                dark={dark}
                index={i}
                onOpen={setActiveModal}
              />
            </FadeSection>
          ))}
        </div>

        <FadeSection style={{ marginTop: 40 }}>
          <div
            style={{
              padding: "20px 28px",
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: t.text }}>
                Voir tout sur GitHub
              </div>
              <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>
                +12 projets open-source
              </div>
            </div>
            <a
              href="https://github.com"
              style={{
                padding: "9px 20px",
                borderRadius: 8,
                background: t.accentGlow,
                border: `1px solid ${t.accent}`,
                color: t.accent,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              github.com →
            </a>
          </div>
        </FadeSection>
      </section>

      <div style={{ width: "100%", height: 1, background: t.divider }} />

      {/* ══════════════════════════════════════════════════════════
           ██  SKILLS
      ══════════════════════════════════════════════════════════ */}
      <section
        id="skills"
        ref={(el) => (sectionRefs.current.skills = el)}
        style={{
          padding: "100px clamp(20px, 6vw, 100px)",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <FadeSection>
          <div style={{ marginBottom: 48 }}>
            <SectionLabel color={t.violet}>TECH STACK</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
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

      <div style={{ width: "100%", height: 1, background: t.divider }} />

      {/* ══════════════════════════════════════════════════════════
           ██  EXPERIENCE
      ══════════════════════════════════════════════════════════ */}
      <section
        id="experience"
        ref={(el) => (sectionRefs.current.experience = el)}
        style={{
          padding: "100px clamp(20px, 6vw, 100px)",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        <FadeSection>
          <div style={{ marginBottom: 48 }}>
            <SectionLabel color={t.accent}>PARCOURS</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: t.text,
              }}
            >
              Expérience
            </h2>
          </div>
        </FadeSection>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 16,
              top: 8,
              bottom: 0,
              width: 1,
              background: t.border,
            }}
          />
          {EXPERIENCE.map((exp, i) => (
            <FadeSection key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div style={{ display: "flex", gap: 28, marginBottom: 32 }}>
                <div
                  style={{
                    width: 33,
                    flexShrink: 0,
                    paddingTop: 6,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
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
                <div
                  style={{
                    flex: 1,
                    padding: "20px 24px",
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
                      <div
                        style={{ fontWeight: 600, fontSize: 16, color: t.text }}
                      >
                        {exp.role}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: t.accent,
                          marginTop: 2,
                          fontWeight: 500,
                        }}
                      >
                        {exp.company}
                      </div>
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
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.68,
                      color: t.textMuted,
                    }}
                  >
                    {exp.desc}
                  </p>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      <div style={{ width: "100%", height: 1, background: t.divider }} />

      {/* ══════════════════════════════════════════════════════════
           ██  CONTACT
      ══════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        ref={(el) => (sectionRefs.current.contact = el)}
        style={{
          padding: "100px clamp(20px, 6vw, 100px)",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <FadeSection>
          <div style={{ marginBottom: 48 }}>
            <SectionLabel color={t.violet}>CONTACT</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
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

          <div
            style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 20,
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {[
              {
                label: "Email",
                value: "alex.dubois@dev.io",
                href: "mailto:alex.dubois@dev.io",
                icon: "✉",
              },
              {
                label: "LinkedIn",
                value: "linkedin.com/in/alexdubois",
                href: "#",
                icon: "in",
              },
              {
                label: "GitHub",
                value: "github.com/alexdubois",
                href: "#",
                icon: "⌥",
              },
            ].map(({ label, value, href, icon }) => (
              <a
                key={label}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  textDecoration: "none",
                  padding: "15px 18px",
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
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: t.textFaint,
                      marginBottom: 2,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: 14, color: t.text, fontWeight: 500 }}>
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
                  style={{ marginLeft: "auto" }}
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7v10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}

            <div
              style={{
                marginTop: 4,
                padding: "16px 18px",
                borderRadius: 12,
                background: t.accentGlow,
                border: `1px solid ${t.border}`,
              }}
            >
              <div
                style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65 }}
              >
                💼{" "}
                <strong style={{ color: t.text }}>
                  Disponible dès maintenant
                </strong>{" "}
                — Remote ou Antananarivo / Paris. Je recherche un poste
                full-stack senior ou une collaboration sur un produit ambitieux.
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          textAlign: "center",
          padding: "28px 24px",
          borderTop: `1px solid ${t.border}`,
          fontSize: 11,
          color: t.textFaint,
          fontFamily: "monospace",
        }}
      >
        built with React · Three.js · love &nbsp;·&nbsp; © 2025 Alex Dubois
      </footer>

      {/* ── MODAL ── */}
      {activeModal && (
        <ProjectModal
          project={activeModal}
          dark={dark}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
