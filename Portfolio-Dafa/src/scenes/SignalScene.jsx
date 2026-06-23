import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── SIGNAL SCENE (desktop only) ─────────────────────────────────
export function SignalScene({ dark }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;
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

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 32, 32),
      new THREE.MeshStandardMaterial({ color: dark ? 0x0d1a2e : 0xdde5ff, metalness: 0.8, roughness: 0.15, emissive: cA, emissiveIntensity: dark ? 0.12 : 0.05 })
    );
    scene.add(core);

    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.47, 1),
      new THREE.MeshBasicMaterial({ color: cA, wireframe: true, transparent: true, opacity: dark ? 0.2 : 0.12 })
    );
    scene.add(coreWire);

    const WAVE_COUNT = 5;
    const waveRings = Array.from({ length: WAVE_COUNT }, (_, i) => {
      const pts = Array.from({ length: 129 }, (_, j) =>
        new THREE.Vector3(Math.cos((j / 128) * Math.PI * 2), Math.sin((j / 128) * Math.PI * 2), 0)
      );
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: i % 2 === 0 ? cA : cV, transparent: true, opacity: 0 })
      );
      scene.add(line);
      return { line, phase: i / WAVE_COUNT };
    });

    const beamDirs = [
      new THREE.Vector3(1, 0.4, 0), new THREE.Vector3(-0.8, 0.6, 0.3),
      new THREE.Vector3(0.3, -1, 0.2), new THREE.Vector3(-0.5, -0.7, -0.3),
    ].map((v) => v.normalize());

    beamDirs.forEach((dir, i) => {
      const pts = [new THREE.Vector3(0, 0, 0), dir.clone().multiplyScalar(2.8)];
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: i % 2 === 0 ? cA : cV, transparent: true, opacity: dark ? 0.18 : 0.12 })
      );
      scene.add(line);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? cA : cV }));
      dot.position.copy(dir.clone().multiplyScalar(2.8));
      scene.add(dot);
    });

    const packets = beamDirs.map((dir, i) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? cA : cV }));
      scene.add(mesh);
      return { mesh, dir, phase: (i / beamDirs.length) * Math.PI * 2, speed: 0.5 + i * 0.15 };
    });

    const pCount = 60;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), r = 2.5 + Math.random() * 2;
      pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pPos[i * 3 + 2] = r * Math.cos(ph);
    }
    const ppg = new THREE.BufferGeometry();
    ppg.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    scene.add(new THREE.Points(ppg, new THREE.PointsMaterial({ color: cV, size: 0.022, transparent: true, opacity: dark ? 0.4 : 0.22 })));

    scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.4 : 0.8));
    const pl = new THREE.PointLight(cA, dark ? 2.5 : 1.5, 9);
    pl.position.set(2, 1, 3);
    scene.add(pl);
    const vl = new THREE.PointLight(cV, dark ? 1.5 : 0.8, 7);
    vl.position.set(-2, -1, 1);
    scene.add(vl);

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
      core.rotation.y = t * 0.2;
      coreWire.rotation.y = -t * 0.12;
      coreWire.rotation.x = t * 0.08;
      core.scale.setScalar(1 + Math.sin(t * 2.2) * 0.06);
      camera.position.x = Math.sin(t * 0.12) * 0.5;
      camera.position.y = Math.cos(t * 0.09) * 0.35;
      camera.lookAt(0, 0, 0);
      waveRings.forEach(({ line, phase }) => {
        const progress = (t * 0.4 + phase) % 1;
        const r = progress * 3.2;
        line.scale.setScalar(r);
        line.material.opacity = dark ? Math.sin(progress * Math.PI) * 0.55 : Math.sin(progress * Math.PI) * 0.3;
        line.rotation.x = Math.PI * 0.1 + phase * 0.3;
        line.rotation.z = phase * 0.5;
      });
      packets.forEach((p) => {
        const prog = (t * p.speed + p.phase / (Math.PI * 2)) % 1;
        p.mesh.position.copy(p.dir.clone().multiplyScalar(prog * 2.8));
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