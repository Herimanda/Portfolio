import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import logo from "../assets/images/Dafa-logo.svg";
import pdp from "../assets/images/pdp.jpg";
import iconReact from "../assets/images/react-svgrepo-com.svg";
import iconCss from "../assets/images/css-3-svgrepo-com.svg";
import iconDocker from "../assets/images/docker-svgrepo-com.svg";
import iconK8s from "../assets/images/kubernetes-svgrepo-com.svg";
import iconLaravel from "../assets/images/laravel-svgrepo-com.svg";
import iconMongo from "../assets/images/mongodb-svgrepo-com.svg";
import iconNode from "../assets/images/node-js-svgrepo-com.svg";
import iconPython from "../assets/images/python-svgrepo-com.svg";
import iconRest from "../assets/images/rest-api-svgrepo-com.svg";
import iconVmware from "../assets/images/software-vmware-workstation-svgrepo-com.svg";
import iconTailwind from "../assets/images/tailwind-svgrepo-com.svg";
import iconTs from "../assets/images/typescript-official-svgrepo-com.svg";

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
      { name: "React JS", level: 90, icon: iconReact },
      { name: "TypeScript", level: 80, icon: iconTs },
      { name: "Tailwind CSS", level: 78, icon: iconTailwind },
      { name: "CSS / HTML", level: 80, icon: iconCss },
    ],
  },
  {
    label: "Backend",
    color: "violet",
    icon: "◉",
    items: [
      { name: "Node.js / Express", level: 88, icon: iconNode },
      { name: "Laravel", level: 78, icon: iconLaravel },
      { name: "REST API Design", level: 90, icon: iconRest },
      { name: "Python / FastAPI", level: 70, icon: iconPython },
    ],
  },
  {
    label: "Infra",
    color: "green",
    icon: "◌",
    items: [
      { name: "MongoDB", level: 80, icon: iconMongo },
      { name: "Docker", level: 74, icon: iconDocker },
      { name: "K8s", level: 72, icon: iconK8s },
      { name: "VmWare", level: 75, icon: iconVmware },
    ],
  },
];

const EXPERIENCE = [
  {
    year: "Avril 2026 – Présent",
    role: "Administrateur Système et Réseau et Full-Stack Dev",
    company: "Bpo Concept",
    desc: "Administrateur système et réseau ainsi que developpeur full-stack MERN.",
  },
  {
    year: "Juin 2025 – Novembre 2025",
    role: "Stagiaire Administrateur Système et Réseau",
    company: "Ministère de la Jeunesse et des Sports",
    desc: "Deploiement et administration d'une infrastructure réseau et système sécurisée.",
  },
  {
    year: "Septembre 2022 – Novembre 2023",
    role: "Stagiaire Administrateur Système et Réseau",
    company:
      "Ministère de l'Enseignement Technique et de la Formation Professionnelle",
    desc: "Maintenance et supervision du park informatique avec Centreon.",
  },
];

const NAV_SECTIONS = [
  { id: "hero", label: "Accueil" },
  { id: "projects", label: "Projets" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Parcours" },
  { id: "contact", label: "Contact" },
];

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

function SectionLabel({ children, color }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        color,
        letterSpacing: "0.12em",
        margin: "0 0 10px",
      }}
    >
      // {children}
    </p>
  );
}

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

// ─── THREE.JS ORBITAL (HERO) — badges ride the rings ──────────────
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

    // Ring data: radius, tilt, color, opacity, speed
    const ringDefs = [
      {
        r: 1.6,
        tilt: Math.PI * 0.18,
        col: cA,
        op: dark ? 0.45 : 0.3,
        speed: 0.22,
      },
      {
        r: 2.1,
        tilt: Math.PI * 0.42,
        col: cV,
        op: dark ? 0.3 : 0.2,
        speed: -0.15,
      },
      {
        r: 2.5,
        tilt: Math.PI * 0.65,
        col: cW,
        op: dark ? 0.15 : 0.1,
        speed: 0.09,
      },
    ];
    const rings = ringDefs.map((d) => makeRing(d.r, d.tilt, d.col, d.op));
    rings.forEach((r) => scene.add(r));

    // Regular electron dots (smaller)
    const dg = new THREE.SphereGeometry(0.035, 8, 8);
    const electronDots = Array.from({ length: 5 }, (_, i) => {
      const d = new THREE.Mesh(dg, new THREE.MeshBasicMaterial({ color: cA }));
      scene.add(d);
      return { mesh: d, angle: (i / 5) * Math.PI * 2, ringIdx: 0 };
    });
    const vDots = Array.from({ length: 4 }, (_, i) => {
      const d = new THREE.Mesh(dg, new THREE.MeshBasicMaterial({ color: cV }));
      scene.add(d);
      return { mesh: d, angle: (i / 4) * Math.PI * 2 + 0.5, ringIdx: 1 };
    });

    // ── Badge electrons — CSS labels positioned from 3D world coords ──
    // Each badge rides one ring; we compute 3D position → project → CSS
    const BADGE_DEFS = [
      {
        label: "React",
        ringIdx: 0,
        startAngle: 0,
        accent: true,
        color: dark ? "#63d3ff" : "#2563eb",
      },
      {
        label: "Node.js",
        ringIdx: 0,
        startAngle: Math.PI,
        accent: true,
        color: dark ? "#63d3ff" : "#2563eb",
      },
      {
        label: "PostgreSQL",
        ringIdx: 1,
        startAngle: Math.PI * 0.5,
        accent: false,
        color: dark ? "#a78bfa" : "#7c3aed",
      },
      {
        label: "Docker",
        ringIdx: 1,
        startAngle: Math.PI * 1.5,
        accent: false,
        color: dark ? "#a78bfa" : "#7c3aed",
      },
    ];

    // Badge DOM elements — created in el
    const badgeEls = BADGE_DEFS.map((b) => {
      const div = document.createElement("div");
      div.textContent = b.label;
      div.style.cssText = `
        position:absolute; pointer-events:none; transform:translate(-50%,-50%);
        padding:4px 11px; border-radius:8px; font-size:11px; font-weight:500;
        font-family:'JetBrains Mono',monospace; letter-spacing:0.04em;
        background:${dark ? "rgba(8,12,20,0.82)" : "rgba(244,246,255,0.88)"};
        border:1px solid ${b.color}; color:${b.color};
        backdrop-filter:blur(6px); white-space:nowrap;
        transition:opacity 0.2s;
      `;
      el.appendChild(div);
      return div;
    });

    scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.4 : 0.8));
    const pl = new THREE.PointLight(cA, dark ? 2 : 1, 8);
    pl.position.set(3, 2, 2);
    scene.add(pl);
    const vl = new THREE.PointLight(cV, dark ? 1.2 : 0.6, 6);
    vl.position.set(-2, -1, 1);
    scene.add(vl);

    // Star field
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

    // Helper: get world position on a ring at a given phase angle
    const getRingWorldPos = (ringIdx, angle) => {
      const def = ringDefs[ringIdx];
      const ring = rings[ringIdx];
      // Local position on the ring (flat circle in XZ plane, tilted by rotation.x)
      const localX = Math.cos(angle) * def.r;
      const localZ = Math.sin(angle) * def.r;
      // Apply ring's tilt (rotation.x only for these rings) and rotation.z (animation)
      const tilt = def.tilt;
      const localY = localZ * Math.sin(tilt);
      const localZt = localZ * Math.cos(tilt);
      // ring.rotation.z is the animated spin — apply it
      const rz = ring.rotation.z;
      const wx = localX * Math.cos(rz) - localY * Math.sin(rz);
      const wy = localX * Math.sin(rz) + localY * Math.cos(rz);
      const wz = localZt;
      return new THREE.Vector3(wx, wy, wz);
    };

    let raf;
    const clk = new THREE.Clock();
    const vec = new THREE.Vector3();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clk.getElapsedTime();

      core.rotation.y = t * 0.12;
      core.rotation.x = t * 0.05;
      wire.rotation.y = -t * 0.08;
      wire.rotation.x = t * 0.04;

      rings[0].rotation.z = t * ringDefs[0].speed;
      rings[1].rotation.z = t * ringDefs[1].speed;
      rings[2].rotation.z = t * ringDefs[2].speed;

      // Regular electron dots on ring 0
      electronDots.forEach((d, i) => {
        const a = d.angle + t * 0.5;
        d.mesh.position.set(
          Math.cos(a) * 1.6,
          Math.sin(a) * 1.6 * Math.sin(rings[0].rotation.x),
          Math.sin(a) * 1.6 * Math.cos(rings[0].rotation.x),
        );
      });
      // Regular electron dots on ring 1
      vDots.forEach((d, i) => {
        const a = d.angle + t * 0.3;
        d.mesh.position.set(
          Math.cos(a) * 2.1,
          Math.sin(a) * 2.1 * Math.sin(rings[1].rotation.x),
          Math.sin(a) * 2.1 * Math.cos(rings[1].rotation.x),
        );
      });

      // Camera parallax
      camera.position.x +=
        (mouseRef.current.x * 0.5 - camera.position.x) * 0.04;
      camera.position.y +=
        (mouseRef.current.y * 0.3 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // ── Project badge 3D positions → CSS ──
      const rect = el.getBoundingClientRect();
      const W = rect.width,
        H = rect.height;

      BADGE_DEFS.forEach((b, i) => {
        const ringDef = ringDefs[b.ringIdx];
        const ring = rings[b.ringIdx];
        const speed = b.ringIdx === 0 ? 0.5 : 0.3;
        // Same angle logic as the dots — badge has a fixed offset from its startAngle
        const angle = b.startAngle + t * speed;

        // Reproduce the dot positioning math exactly
        const tilt = ring.rotation.x; // static tilt
        const rz = ring.rotation.z; // animated spin
        const r = ringDef.r;

        // Local on ring (XZ plane before tilt)
        const lx = Math.cos(angle) * r;
        const lz = Math.sin(angle) * r;

        // Apply tilt (rotation.x)
        const ly = lz * Math.sin(tilt);
        const lzT = lz * Math.cos(tilt);

        // Apply spin (rotation.z)
        const wx = lx * Math.cos(rz) - ly * Math.sin(rz);
        const wy = lx * Math.sin(rz) + ly * Math.cos(rz);
        const wz = lzT;

        vec.set(wx, wy, wz);
        vec.project(camera);

        const screenX = (vec.x * 0.5 + 0.5) * W;
        const screenY = (1 - (vec.y * 0.5 + 0.5)) * H;

        // Depth-based opacity: hide when behind the scene (z > 1 in clip space means behind near plane)
        const depth = vec.z; // -1 (front) to 1 (back) in NDC
        const opacity =
          depth < 0.98 ? Math.max(0.35, 1 - (depth + 1) * 0.4) : 0;

        badgeEls[i].style.left = `${screenX}px`;
        badgeEls[i].style.top = `${screenY}px`;
        badgeEls[i].style.opacity = String(opacity);
        // Slight scale based on depth
        const scale = Math.max(0.7, 1 - depth * 0.15);
        badgeEls[i].style.transform = `translate(-50%,-50%) scale(${scale})`;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("mousemove", onMouse);
      badgeEls.forEach((b) => {
        if (el.contains(b)) el.removeChild(b);
      });
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [dark]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
}

// ─── EXPERIENCE 3D — Career Graph / Node network ──────────────────
function CareerGraphScene({ dark }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth,
      H = el.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.5);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const cA = dark ? 0x63d3ff : 0x2563eb;
    const cV = dark ? 0xa78bfa : 0x7c3aed;
    const cG = dark ? 0x34d399 : 0x059669;

    // Three main career milestone nodes on a curved path
    const nodePositions = [
      new THREE.Vector3(-1.8, -1.4, 0), // 2019
      new THREE.Vector3(0.2, 0.2, 0.3), // 2021
      new THREE.Vector3(1.6, 1.5, -0.2), // 2023
    ];
    const nodeColors = [cG, cV, cA];
    const nodeSizes = [0.14, 0.17, 0.22];

    // Node meshes
    const nodeMeshes = nodePositions.map((pos, i) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(nodeSizes[i], 20, 20),
        new THREE.MeshStandardMaterial({
          color: nodeColors[i],
          emissive: nodeColors[i],
          emissiveIntensity: 0.5,
        }),
      );
      mesh.position.copy(pos);
      scene.add(mesh);

      // Glow ring around each node
      const ringPts = Array.from(
        { length: 65 },
        (_, j) =>
          new THREE.Vector3(
            Math.cos((j / 64) * Math.PI * 2) * nodeSizes[i] * 2.2,
            Math.sin((j / 64) * Math.PI * 2) * nodeSizes[i] * 2.2,
            0,
          ),
      );
      const ringLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(ringPts),
        new THREE.LineBasicMaterial({
          color: nodeColors[i],
          transparent: true,
          opacity: 0.4,
        }),
      );
      ringLine.position.copy(pos);
      scene.add(ringLine);

      return { mesh, ring: ringLine };
    });

    // Curved spine connecting the nodes (Catmull-Rom spline)
    const splinePts = [
      new THREE.Vector3(-2.4, -2, 0),
      ...nodePositions,
      new THREE.Vector3(2.2, 2.2, -0.3),
    ];
    const curve = new THREE.CatmullRomCurve3(splinePts);
    const splinePoints = curve.getPoints(120);
    const spineLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(splinePoints),
      new THREE.LineBasicMaterial({
        color: cA,
        transparent: true,
        opacity: dark ? 0.22 : 0.15,
      }),
    );
    scene.add(spineLine);

    // Travelling electron along the spine
    const traveler = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 12, 12),
      new THREE.MeshBasicMaterial({ color: cA }),
    );
    scene.add(traveler);

    // Secondary smaller orbiting dots around each node
    const orbitDots = nodePositions.flatMap((pos, ni) =>
      Array.from({ length: 3 }, (_, j) => ({
        pos,
        r: nodeSizes[ni] * 3.5 + j * 0.12,
        speed: 0.6 + j * 0.4,
        phase: (j / 3) * Math.PI * 2 + ni,
        color: nodeColors[ni],
        mesh: (() => {
          const m = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 8, 8),
            new THREE.MeshBasicMaterial({ color: nodeColors[ni] }),
          );
          scene.add(m);
          return m;
        })(),
      })),
    );

    // Floating data particles
    const pCount = 80;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    scene.add(
      new THREE.Points(
        pg,
        new THREE.PointsMaterial({
          color: cV,
          size: 0.018,
          transparent: true,
          opacity: dark ? 0.45 : 0.25,
        }),
      ),
    );

    scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.5 : 0.9));
    const pl = new THREE.PointLight(cA, dark ? 2.5 : 1.5, 10);
    pl.position.set(2, 2, 3);
    scene.add(pl);

    const onResize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let raf;
    const clk = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clk.getElapsedTime();

      // Slow camera drift
      camera.position.x = Math.sin(t * 0.1) * 0.3;
      camera.position.y = Math.cos(t * 0.08) * 0.2;
      camera.lookAt(0, 0, 0);

      // Pulsating nodes
      nodeMeshes.forEach(({ mesh, ring }, i) => {
        const pulse = 1 + Math.sin(t * 1.5 + i * 1.2) * 0.12;
        mesh.scale.setScalar(pulse);
        ring.scale.setScalar(pulse * 1.1);
        ring.rotation.z = t * (0.3 + i * 0.15);
      });

      // Travelling electron
      const travT = (t * 0.18) % 1;
      const travPos = curve.getPoint(travT);
      traveler.position.copy(travPos);
      // Glow pulse
      const gp = 0.8 + Math.sin(t * 4) * 0.2;
      traveler.scale.setScalar(gp);

      // Orbit dots
      orbitDots.forEach((d) => {
        const a = d.phase + t * d.speed;
        d.mesh.position.set(
          d.pos.x + Math.cos(a) * d.r,
          d.pos.y + Math.sin(a) * d.r,
          d.pos.z + Math.sin(a * 0.7) * 0.1,
        );
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [dark]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}

// ─── CONTACT 3D — Signal / Pulse wave ─────────────────────────────
function SignalScene({ dark }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth,
      H = el.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 100);
    camera.position.set(0, 0, 6);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const cA = dark ? 0x63d3ff : 0x2563eb;
    const cV = dark ? 0xa78bfa : 0x7c3aed;

    // Central transmitter sphere
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 32, 32),
      new THREE.MeshStandardMaterial({
        color: dark ? 0x0d1a2e : 0xdde5ff,
        metalness: 0.8,
        roughness: 0.15,
        emissive: cA,
        emissiveIntensity: dark ? 0.12 : 0.05,
      }),
    );
    scene.add(core);

    // Inner wireframe on core
    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.47, 1),
      new THREE.MeshBasicMaterial({
        color: cA,
        wireframe: true,
        transparent: true,
        opacity: dark ? 0.2 : 0.12,
      }),
    );
    scene.add(coreWire);

    // Expanding wave rings — pool of 5, recycled
    const WAVE_COUNT = 5;
    const waveRings = Array.from({ length: WAVE_COUNT }, (_, i) => {
      const pts = Array.from(
        { length: 129 },
        (_, j) =>
          new THREE.Vector3(
            Math.cos((j / 128) * Math.PI * 2),
            Math.sin((j / 128) * Math.PI * 2),
            0,
          ),
      );
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({
          color: i % 2 === 0 ? cA : cV,
          transparent: true,
          opacity: 0,
        }),
      );
      scene.add(line);
      return { line, phase: i / WAVE_COUNT }; // staggered start
    });

    // Directional signal beams (4 directions)
    const beamDirs = [
      new THREE.Vector3(1, 0.4, 0),
      new THREE.Vector3(-0.8, 0.6, 0.3),
      new THREE.Vector3(0.3, -1, 0.2),
      new THREE.Vector3(-0.5, -0.7, -0.3),
    ].map((v) => v.normalize());

    const beamMeshes = beamDirs.map((dir, i) => {
      const pts = [new THREE.Vector3(0, 0, 0), dir.clone().multiplyScalar(2.8)];
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({
          color: i % 2 === 0 ? cA : cV,
          transparent: true,
          opacity: dark ? 0.18 : 0.12,
        }),
      );
      scene.add(line);

      // Dot at end of beam
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? cA : cV }),
      );
      dot.position.copy(dir.clone().multiplyScalar(2.8));
      scene.add(dot);
      return { line, dot, dir };
    });

    // Floating data packets along beams
    const packets = beamDirs.map((dir, i) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.06, 0.06),
        new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? cA : cV }),
      );
      scene.add(mesh);
      return {
        mesh,
        dir,
        phase: (i / beamDirs.length) * Math.PI * 2,
        speed: 0.5 + i * 0.15,
      };
    });

    // Particle field
    const pCount = 60;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const th = Math.random() * Math.PI * 2,
        ph = Math.acos(2 * Math.random() - 1),
        r = 2.5 + Math.random() * 2;
      pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pPos[i * 3 + 2] = r * Math.cos(ph);
    }
    const ppg = new THREE.BufferGeometry();
    ppg.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    scene.add(
      new THREE.Points(
        ppg,
        new THREE.PointsMaterial({
          color: cV,
          size: 0.022,
          transparent: true,
          opacity: dark ? 0.4 : 0.22,
        }),
      ),
    );

    scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.4 : 0.8));
    const pl = new THREE.PointLight(cA, dark ? 2.5 : 1.5, 9);
    pl.position.set(2, 1, 3);
    scene.add(pl);
    const vl = new THREE.PointLight(cV, dark ? 1.5 : 0.8, 7);
    vl.position.set(-2, -1, 1);
    scene.add(vl);

    const onResize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let raf;
    const clk = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clk.getElapsedTime();

      // Core rotation
      core.rotation.y = t * 0.2;
      coreWire.rotation.y = -t * 0.12;
      coreWire.rotation.x = t * 0.08;

      // Core pulse
      const corePulse = 1 + Math.sin(t * 2.2) * 0.06;
      core.scale.setScalar(corePulse);

      // Slow camera drift
      camera.position.x = Math.sin(t * 0.12) * 0.5;
      camera.position.y = Math.cos(t * 0.09) * 0.35;
      camera.lookAt(0, 0, 0);

      // Expanding wave rings
      waveRings.forEach(({ line, phase }) => {
        const progress = (t * 0.4 + phase) % 1;
        const maxR = 3.2;
        const r = progress * maxR;
        const opacity = dark
          ? Math.sin(progress * Math.PI) * 0.55
          : Math.sin(progress * Math.PI) * 0.3;
        line.scale.setScalar(r);
        line.material.opacity = opacity;
        // Tilt the rings slightly for depth
        line.rotation.x = Math.PI * 0.1 + phase * 0.3;
        line.rotation.z = phase * 0.5;
      });

      // Data packets travelling along beams
      packets.forEach((p) => {
        const prog = (t * p.speed + p.phase / (Math.PI * 2)) % 1;
        const dist = prog * 2.8;
        p.mesh.position.copy(p.dir.clone().multiplyScalar(dist));
        p.mesh.rotation.x = t * 2;
        p.mesh.rotation.y = t * 1.5;
        p.mesh.material.opacity = Math.sin(prog * Math.PI);
        p.mesh.material.transparent = true;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
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

// ─── SKILLS SECTION ───────────────────────────────────────────────
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
    "PostgreSQL",
    "Prisma",
    "Vitest",
    "Nx",
    "Mysql",
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
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: t.text,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    style={{ width: 20, height: 20, objectFit: "contain" }}
                  />
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
        @keyframes navGlow { 0%,100%{opacity:0.5} 50%{opacity:1} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(99,211,255,0.18); border-radius: 99px; }

        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 50%; right: 50%;
          height: 1.5px;
          background: var(--nav-accent);
          border-radius: 99px;
          transition: left 0.25s ease, right 0.25s ease, opacity 0.25s ease;
          opacity: 0;
        }
        .nav-link:hover::after { left: 14px; right: 14px; opacity: 1; }
        .nav-link.active::after { left: 14px; right: 14px; opacity: 1; }

        .theme-switch {
          position: relative;
          width: 52px; height: 28px;
          border-radius: 99px;
          cursor: pointer;
          border: none;
          transition: background 0.3s;
          flex-shrink: 0;
        }
        .theme-switch-thumb {
          position: absolute;
          top: 3px;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
          transition: left 0.3s cubic-bezier(0.34,1.56,0.64,1);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; line-height: 1;
        }

        .pdp-img {
          -webkit-mask-image: radial-gradient(ellipse 85% 85% at 50% 45%, black 55%, transparent 100%);
          mask-image: radial-gradient(ellipse 85% 85% at 50% 45%, black 55%, transparent 100%);
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: scrolled ? 62 : 72,
          transition:
            "height 0.3s ease, background 0.3s, border-color 0.3s, box-shadow 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px, 5vw, 64px)",
        }}
      >
        {/* Background layer — separate div for smooth blur transition */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            background: scrolled
              ? dark
                ? "rgba(6,9,18,0.88)"
                : "rgba(248,250,255,0.88)"
              : "transparent",
            backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
            WebkitBackdropFilter: scrolled
              ? "blur(24px) saturate(1.6)"
              : "none",
            transition: "background 0.35s, backdrop-filter 0.35s",
          }}
        />

        {/* Bottom border with glow — only when scrolled */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: scrolled
              ? dark
                ? `linear-gradient(90deg, transparent 0%, rgba(99,211,255,0.25) 30%, rgba(167,139,250,0.25) 70%, transparent 100%)`
                : `linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.2) 30%, rgba(124,58,237,0.2) 70%, transparent 100%)`
              : "transparent",
            transition: "background 0.35s",
          }}
        />

        {/* ── Logo ── */}
        <button
          onClick={() => scrollTo("hero")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: -2,
                borderRadius: 10,
                background: `radial-gradient(circle, ${dark ? "rgba(99,211,255,0.18)" : "rgba(37,99,235,0.12)"} 0%, transparent 70%)`,
                opacity: scrolled ? 0 : 1,
                transition: "opacity 0.4s",
              }}
            />
            <img
              src={logo}
              alt="Logo"
              style={{
                width: 46,
                height: 46,
                objectFit: "contain",
                position: "relative",
                zIndex: 1,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              textAlign: "left",
            }}
          >
            <span
              style={{
                fontSize: 13.5,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: t.text,
                lineHeight: 1.2,
              }}
            >
              HERIMANDA
            </span>
            <span
              style={{
                fontSize: 10,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.12em",
                color: t.accent,
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              Fiononantsoa
            </span>
          </div>
        </button>

        {/* ── Nav links — flat, no pill container ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_SECTIONS.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
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
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = t.text;
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = t.textMuted;
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Right side: status dot + theme switch ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Theme switch */}
          <button
            className="theme-switch"
            onClick={() => setDark((d) => !d)}
            style={{
              background: dark
                ? "linear-gradient(135deg, #0d1a2e, #1a2d4a)"
                : "linear-gradient(135deg, #c8d8ff, #e8efff)",
              boxShadow: dark
                ? "inset 0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,211,255,0.15)"
                : "inset 0 1px 3px rgba(0,0,40,0.12), 0 0 0 1px rgba(37,99,235,0.18)",
            }}
            aria-label="Toggle theme"
          >
            <div className="theme-switch-thumb" style={{ left: dark ? 3 : 27 }}>
              {dark ? "🌙" : "☀️"}
            </div>
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
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
          maxWidth: 1340,
          margin: "0 auto",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 32,
            }}
          >
            {/* PDP — larger, radial fade to remove bg, conic glow ring */}
            <div
              style={{
                position: "relative",
                flexShrink: 0,
                width: 108,
                height: 108,
              }}
            >
              {/* Animated glow ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -3,
                  borderRadius: "50%",
                  background: `conic-gradient(from 0deg, ${t.accent}, ${t.violet}, ${t.green}, ${t.accent})`,
                  animation: "spin 5s linear infinite",
                  opacity: 0.7,
                }}
              />
              {/* Mask ring to show only the edge as a thin line */}
              <div
                style={{
                  position: "absolute",
                  inset: -3,
                  borderRadius: "50%",
                  background: t.bg,
                  WebkitMask:
                    "radial-gradient(circle, transparent 44px, black 46px)",
                  mask: "radial-gradient(circle, transparent 44px, black 46px)",
                }}
              />
              {/* Image container */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: 108,
                  height: 108,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: dark
                    ? "radial-gradient(circle at 40% 35%, #1a2d4a, #080c14)"
                    : "radial-gradient(circle at 40% 35%, #dde5ff, #f4f6ff)",
                }}
              >
                <img
                  src={pdp}
                  alt="Photo de profil"
                  className="pdp-img"
                  style={{
                    width: "100%",
                    height: "120%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    display: "block",
                  }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 700,
                  color: t.text,
                  letterSpacing: "-0.01em",
                }}
              >
                HERIMANDA Fiononantsoa
              </div>
              <div style={{ fontSize: 13, color: t.textMuted, marginTop: 3 }}>
                Développeur Full-Stack · Remote
              </div>
              <div style={{ display: "flex", gap: 7, marginTop: 10 }}>
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
            2 ans d'expérience. Je conçois des APIs robustes, des interfaces
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
              ["2+", "ans d'expérience"],
              ["15+", "projets réalisés"],
              ["4", "techno maîtrisées"],
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

        {/* 3D orbital — badges are now rendered inside the canvas container */}
        <div
          style={{ height: "clamp(340px, 44vw, 560px)", position: "relative" }}
        >
          <OrbitalScene dark={dark} />
        </div>
      </section>

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

      <div style={{ width: "100%", height: 1, background: t.divider }} />

      {/* ══ PROJECTS ══ */}
      <section
        id="projects"
        ref={(el) => (sectionRefs.current.projects = el)}
        style={{
          padding: "100px clamp(24px, 4vw, 48px)",
          maxWidth: 1340,
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
                +10 projets open-source
              </div>
            </div>
            <a
              href="https://github.com/Herimanda"
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

      {/* ══ SKILLS ══ */}
      <section
        id="skills"
        ref={(el) => (sectionRefs.current.skills = el)}
        style={{
          padding: "100px clamp(24px, 4vw, 48px)",
          maxWidth: 1340,
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

      {/* ══ EXPERIENCE — split layout: timeline left, 3D graph right ══ */}
      <section
        id="experience"
        ref={(el) => (sectionRefs.current.experience = el)}
        style={{
          padding: "100px clamp(24px, 4vw, 48px)",
          maxWidth: 1340,
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* LEFT — Timeline */}
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
                          style={{
                            fontWeight: 600,
                            fontSize: 16,
                            color: t.text,
                          }}
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

          {/* RIGHT — Career graph 3D */}
          <FadeSection
            style={{
              height: 420,
              overflow: "hidden",
              background: dark ? "rgba(8,12,20,0.6)" : "rgba(244,246,255,0.6)",
            }}
          >
            <CareerGraphScene dark={dark} />
          </FadeSection>
        </div>
      </section>

      <div style={{ width: "100%", height: 1, background: t.divider }} />

      {/* ══ CONTACT — split layout: 3D signal left, card right ══ */}
      <section
        id="contact"
        ref={(el) => (sectionRefs.current.contact = el)}
        style={{
          padding: "100px clamp(24px, 4vw, 48px)",
          maxWidth: 1340,
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
        </FadeSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 100,
            alignItems: "center",
          }}
        >
          {/* LEFT — Signal 3D */}
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

          {/* RIGHT — Contact card */}
          <FadeSection>
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
                  value: "herimanda23@gmail.com",
                  href: "mailto:herimanda23@gmail.com",
                  icon: "✉",
                },
                {
                  label: "LinkedIn",
                  value: "linkedin.com/in/Herimanda",
                  href: "#",
                  icon: "in",
                },
                {
                  label: "GitHub",
                  value: "https://github.com/Herimanda",
                  href: "https://github.com/Herimanda",
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
                    <div
                      style={{ fontSize: 14, color: t.text, fontWeight: 500 }}
                    >
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
                  — Remote ou Antananarivo . Je recherche un poste full-stack ou
                  une collaboration sur un produit ambitieux.
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
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
        built with React · Three.js · love &nbsp;·&nbsp; © 2025 Dafa
      </footer>

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
