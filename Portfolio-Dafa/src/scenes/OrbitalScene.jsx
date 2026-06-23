import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── THREE.JS ORBITAL (HERO) ──────────────────────────────────────
export function OrbitalScene({ dark }) {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;
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
      new THREE.MeshStandardMaterial({ color: dark ? 0x0d1a2e : 0xdde5ff, metalness: 0.7, roughness: 0.2 })
    );
    scene.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.87, 2),
      new THREE.MeshBasicMaterial({ color: cA, wireframe: true, opacity: dark ? 0.15 : 0.1, transparent: true })
    );
    scene.add(wire);

    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 32, 32),
      new THREE.MeshBasicMaterial({ color: cA, transparent: true, opacity: dark ? 0.04 : 0.03, side: THREE.BackSide })
    ));

    const makeRing = (r, tilt, col, op) => {
      const pts = Array.from({ length: 129 }, (_, i) =>
        new THREE.Vector3(Math.cos((i / 128) * Math.PI * 2) * r, 0, Math.sin((i / 128) * Math.PI * 2) * r)
      );
      const ring = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op })
      );
      ring.rotation.x = tilt;
      return ring;
    };

    const ringDefs = [
      { r: 1.6, tilt: Math.PI * 0.18, col: cA, op: dark ? 0.45 : 0.3, speed: 0.22 },
      { r: 2.1, tilt: Math.PI * 0.42, col: cV, op: dark ? 0.3 : 0.2, speed: -0.15 },
      { r: 2.5, tilt: Math.PI * 0.65, col: cW, op: dark ? 0.15 : 0.1, speed: 0.09 },
    ];
    const rings = ringDefs.map((d) => makeRing(d.r, d.tilt, d.col, d.op));
    rings.forEach((r) => scene.add(r));

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

    const BADGE_DEFS = [
      { label: "React", ringIdx: 0, startAngle: 0, accent: true, color: dark ? "#63d3ff" : "#2563eb" },
      { label: "Node.js", ringIdx: 0, startAngle: Math.PI, accent: true, color: dark ? "#63d3ff" : "#2563eb" },
      { label: "PostgreSQL", ringIdx: 1, startAngle: Math.PI * 0.5, accent: false, color: dark ? "#a78bfa" : "#7c3aed" },
      { label: "Docker", ringIdx: 1, startAngle: Math.PI * 1.5, accent: false, color: dark ? "#a78bfa" : "#7c3aed" },
    ];

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

    const pos = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) {
      const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), r = 3.2 + Math.random() * 2.8;
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph);
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: cA, size: 0.025, transparent: true, opacity: dark ? 0.5 : 0.3 })));

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
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

      electronDots.forEach((d) => {
        const a = d.angle + t * 0.5;
        d.mesh.position.set(Math.cos(a) * 1.6, Math.sin(a) * 1.6 * Math.sin(rings[0].rotation.x), Math.sin(a) * 1.6 * Math.cos(rings[0].rotation.x));
      });
      vDots.forEach((d) => {
        const a = d.angle + t * 0.3;
        d.mesh.position.set(Math.cos(a) * 2.1, Math.sin(a) * 2.1 * Math.sin(rings[1].rotation.x), Math.sin(a) * 2.1 * Math.cos(rings[1].rotation.x));
      });

      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (mouseRef.current.y * 0.3 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      const rect = el.getBoundingClientRect();
      const W = rect.width, H = rect.height;

      BADGE_DEFS.forEach((b, i) => {
        const ringDef = ringDefs[b.ringIdx];
        const ring = rings[b.ringIdx];
        const speed = b.ringIdx === 0 ? 0.5 : 0.3;
        const angle = b.startAngle + t * speed;
        const tilt = ring.rotation.x;
        const rz = ring.rotation.z;
        const r = ringDef.r;
        const lx = Math.cos(angle) * r;
        const lz = Math.sin(angle) * r;
        const ly = lz * Math.sin(tilt);
        const lzT = lz * Math.cos(tilt);
        const wx = lx * Math.cos(rz) - ly * Math.sin(rz);
        const wy = lx * Math.sin(rz) + ly * Math.cos(rz);
        const wz = lzT;
        vec.set(wx, wy, wz);
        vec.project(camera);
        const screenX = (vec.x * 0.5 + 0.5) * W;
        const screenY = (1 - (vec.y * 0.5 + 0.5)) * H;
        const depth = vec.z;
        const opacity = depth < 0.98 ? Math.max(0.35, 1 - (depth + 1) * 0.4) : 0;
        badgeEls[i].style.left = `${screenX}px`;
        badgeEls[i].style.top = `${screenY}px`;
        badgeEls[i].style.opacity = String(opacity);
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
      badgeEls.forEach((b) => { if (el.contains(b)) el.removeChild(b); });
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [dark]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%", position: "relative" }} />;
}