import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── CAREER GRAPH (desktop only) ─────────────────────────────────
export function CareerGraphScene({ dark }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;
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

    const nodePositions = [
      new THREE.Vector3(-1.8, -1.4, 0),
      new THREE.Vector3(0.2, 0.2, 0.3),
      new THREE.Vector3(1.6, 1.5, -0.2),
    ];
    const nodeColors = [cG, cV, cA];
    const nodeSizes = [0.14, 0.17, 0.22];

    const nodeMeshes = nodePositions.map((pos, i) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(nodeSizes[i], 20, 20),
        new THREE.MeshStandardMaterial({ color: nodeColors[i], emissive: nodeColors[i], emissiveIntensity: 0.5 })
      );
      mesh.position.copy(pos);
      scene.add(mesh);

      const ringPts = Array.from({ length: 65 }, (_, j) =>
        new THREE.Vector3(Math.cos((j / 64) * Math.PI * 2) * nodeSizes[i] * 2.2, Math.sin((j / 64) * Math.PI * 2) * nodeSizes[i] * 2.2, 0)
      );
      const ringLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(ringPts),
        new THREE.LineBasicMaterial({ color: nodeColors[i], transparent: true, opacity: 0.4 })
      );
      ringLine.position.copy(pos);
      scene.add(ringLine);
      return { mesh, ring: ringLine };
    });

    const splinePts = [new THREE.Vector3(-2.4, -2, 0), ...nodePositions, new THREE.Vector3(2.2, 2.2, -0.3)];
    const curve = new THREE.CatmullRomCurve3(splinePts);
    const splinePoints = curve.getPoints(120);
    const spineLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(splinePoints),
      new THREE.LineBasicMaterial({ color: cA, transparent: true, opacity: dark ? 0.22 : 0.15 })
    );
    scene.add(spineLine);

    const traveler = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), new THREE.MeshBasicMaterial({ color: cA }));
    scene.add(traveler);

    const orbitDots = nodePositions.flatMap((pos, ni) =>
      Array.from({ length: 3 }, (_, j) => ({
        pos, r: nodeSizes[ni] * 3.5 + j * 0.12, speed: 0.6 + j * 0.4, phase: (j / 3) * Math.PI * 2 + ni, color: nodeColors[ni],
        mesh: (() => {
          const m = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), new THREE.MeshBasicMaterial({ color: nodeColors[ni] }));
          scene.add(m);
          return m;
        })(),
      }))
    );

    const pCount = 80;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: cV, size: 0.018, transparent: true, opacity: dark ? 0.45 : 0.25 })));

    scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.5 : 0.9));
    const pl = new THREE.PointLight(cA, dark ? 2.5 : 1.5, 10);
    pl.position.set(2, 2, 3);
    scene.add(pl);

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
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
      camera.position.x = Math.sin(t * 0.1) * 0.3;
      camera.position.y = Math.cos(t * 0.08) * 0.2;
      camera.lookAt(0, 0, 0);
      nodeMeshes.forEach(({ mesh, ring }, i) => {
        const pulse = 1 + Math.sin(t * 1.5 + i * 1.2) * 0.12;
        mesh.scale.setScalar(pulse);
        ring.scale.setScalar(pulse * 1.1);
        ring.rotation.z = t * (0.3 + i * 0.15);
      });
      const travT = (t * 0.18) % 1;
      traveler.position.copy(curve.getPoint(travT));
      traveler.scale.setScalar(0.8 + Math.sin(t * 4) * 0.2);
      orbitDots.forEach((d) => {
        const a = d.phase + t * d.speed;
        d.mesh.position.set(d.pos.x + Math.cos(a) * d.r, d.pos.y + Math.sin(a) * d.r, d.pos.z + Math.sin(a * 0.7) * 0.1);
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