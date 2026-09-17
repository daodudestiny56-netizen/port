"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { readThemeHex } from "@/lib/theme";

interface BrutalistSceneProps {
  variant?: "hero" | "knot";
  /** Optional element that receives a live "FPS · TRIS" readout. */
  hudRef?: React.RefObject<HTMLSpanElement>;
  className?: string;
}

/**
 * Flat-shaded, hard-edged three.js scene in the portfolio's theme palette.
 * Drag to spin with inertia, click to punch-zoom, scroll to dolly the camera out.
 */
export default function BrutalistScene({ variant = "hero", hudRef, className = "" }: BrutalistSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const INK = readThemeHex("ink");
    const BONE = readThemeHex("bone");
    const ACCENT = readThemeHex("accent");

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // WebGL unavailable — the framed placeholder stays visible.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    // Three-step toon ramp for a printed, posterised look.
    const rampData = new Uint8Array([70, 70, 70, 255, 160, 160, 160, 255, 255, 255, 255, 255]);
    const ramp = track(new THREE.DataTexture(rampData, 3, 1, THREE.RGBAFormat));
    ramp.minFilter = THREE.NearestFilter;
    ramp.magFilter = THREE.NearestFilter;
    ramp.needsUpdate = true;

    scene.add(new THREE.AmbientLight(BONE, 1.1));
    const sun = new THREE.DirectionalLight(BONE, 2.2);
    sun.position.set(4, 6, 5);
    scene.add(sun);

    const edgeColor = variant === "knot" ? BONE : INK;

    const solid = (geometry: THREE.BufferGeometry, color: number, edgeThreshold = 1) => {
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(
        track(geometry),
        track(
          new THREE.MeshToonMaterial({
            color,
            gradientMap: ramp,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1,
          })
        )
      );
      const edges = new THREE.LineSegments(
        track(new THREE.EdgesGeometry(geometry, edgeThreshold)),
        track(new THREE.LineBasicMaterial({ color: edgeColor }))
      );
      group.add(mesh, edges);
      return group;
    };

    const wire = (geometry: THREE.BufferGeometry, color: number, opacity = 1) =>
      new THREE.LineSegments(
        track(new THREE.EdgesGeometry(track(geometry))),
        track(new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity }))
      );

    const root = new THREE.Group();
    scene.add(root);

    let core: THREE.Group;
    let cage: THREE.LineSegments;
    const orbiters: { obj: THREE.Object3D; radius: number; speed: number; phase: number; tilt: number; spin: number }[] = [];
    let fitRadius: number;

    if (variant === "hero") {
      core = solid(new THREE.IcosahedronGeometry(1.25, 0), ACCENT);
      cage = wire(new THREE.IcosahedronGeometry(2.05, 1), INK, 0.55);
      root.add(core, cage);

      const ringCurve = new THREE.EllipseCurve(0, 0, 3.05, 3.05, 0, Math.PI * 2);
      const ringGeo = track(new THREE.BufferGeometry().setFromPoints(ringCurve.getPoints(96)));
      const ring = new THREE.LineLoop(ringGeo, track(new THREE.LineDashedMaterial({ color: INK, dashSize: 0.18, gapSize: 0.12 })));
      ring.computeLineDistances();
      ring.rotation.x = Math.PI / 2.3;
      root.add(ring);

      const shapes: (() => THREE.BufferGeometry)[] = [
        () => new THREE.BoxGeometry(0.46, 0.46, 0.46),
        () => new THREE.OctahedronGeometry(0.34),
        () => new THREE.TorusGeometry(0.24, 0.1, 6, 12),
        () => new THREE.TetrahedronGeometry(0.38),
        () => new THREE.BoxGeometry(0.62, 0.2, 0.2),
        () => new THREE.CylinderGeometry(0.18, 0.18, 0.5, 6),
        () => new THREE.DodecahedronGeometry(0.3),
      ];
      shapes.forEach((make, i) => {
        const obj = solid(make(), i % 3 === 0 ? INK : BONE, 20);
        root.add(obj);
        orbiters.push({
          obj,
          radius: 3.05,
          speed: 0.22 + (i % 3) * 0.04,
          phase: (i / shapes.length) * Math.PI * 2,
          tilt: Math.PI / 2.3,
          spin: 0.6 + i * 0.15,
        });
      });

      const grid = new THREE.GridHelper(18, 18, INK, INK);
      const gridMaterial = grid.material as THREE.Material;
      gridMaterial.transparent = true;
      gridMaterial.opacity = 0.16;
      track(grid.geometry);
      track(gridMaterial);
      grid.position.y = -3.4;
      scene.add(grid);

      fitRadius = 3.6;
    } else {
      core = solid(new THREE.TorusKnotGeometry(1.15, 0.36, 72, 8, 2, 3), ACCENT, 25);
      cage = wire(new THREE.OctahedronGeometry(2.6, 0), BONE, 0.5);
      root.add(core, cage);
      fitRadius = 2.9;
    }

    // --- Sizing -----------------------------------------------------------
    let baseDistance = 10;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const halfV = THREE.MathUtils.degToRad(camera.fov / 2);
      const distV = fitRadius / Math.tan(halfV);
      const distH = fitRadius / (Math.tan(halfV) * camera.aspect);
      baseDistance = Math.max(distV, distH) * 1.08;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    // --- Interaction ------------------------------------------------------
    const pointer = { x: 0, y: 0 };
    const spin = { x: 0, y: 0, vx: 0, vy: 0 };
    let dragging = false;
    let dragMoved = 0;
    let last = { x: 0, y: 0 };
    let punch = 0;

    const onWindowPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (!dragging) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      dragMoved += Math.abs(dx) + Math.abs(dy);
      spin.vy = dx * 0.006;
      spin.vx = dy * 0.006;
      last = { x: e.clientX, y: e.clientY };
    };
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragMoved = 0;
      last = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => {
      if (dragging && dragMoved < 6) punch = 1;
      dragging = false;
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);

    // --- Loop -------------------------------------------------------------
    const clock = new THREE.Clock();
    let introZoom = reduceMotion ? 0 : 1;
    let frames = 0;
    let hudTimer = 0;

    const renderFrame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // Scroll dolly: the further the frame scrolls away, the further the camera pulls back.
      const rect = mount.getBoundingClientRect();
      const scrollProgress = THREE.MathUtils.clamp(-rect.top / Math.max(rect.height, 1), 0, 1.5);

      introZoom = THREE.MathUtils.damp(introZoom, 0, 2.2, dt);
      punch = THREE.MathUtils.damp(punch, 0, 5, dt);

      const targetZ = baseDistance * (1 + introZoom * 1.6 + scrollProgress * 0.9) - punch * 1.8;
      camera.position.z = THREE.MathUtils.damp(camera.position.z || targetZ, targetZ, 6, dt);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.9, 3, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, -pointer.y * 0.6 + 0.4, 3, dt);
      camera.lookAt(0, 0, 0);

      if (!dragging) {
        spin.vx *= 0.94;
        spin.vy *= 0.94;
      }
      spin.x += spin.vx;
      spin.y += spin.vy + (reduceMotion ? 0 : dt * 0.25);
      root.rotation.set(spin.x + (variant === "hero" ? 0.15 : 0), spin.y, 0);

      core.rotation.x += dt * 0.35;
      core.rotation.z += dt * 0.2;
      const pulse = 1 + Math.sin(t * 1.6) * 0.035 + punch * 0.35;
      core.scale.setScalar(pulse);
      cage.rotation.y -= dt * 0.18;
      cage.rotation.x -= dt * 0.08;

      orbiters.forEach((o) => {
        const a = o.phase + t * o.speed;
        const x = Math.cos(a) * o.radius;
        const y = Math.sin(a) * o.radius;
        // Same plane as the dashed ring (XY curve rotated about X by `tilt`).
        o.obj.position.set(x, y * Math.cos(o.tilt), y * Math.sin(o.tilt));
        o.obj.rotation.x += dt * o.spin;
        o.obj.rotation.y += dt * o.spin * 0.7;
      });

      renderer.render(scene, camera);

      if (hudRef?.current) {
        frames += 1;
        hudTimer += dt;
        if (hudTimer >= 0.5) {
          hudRef.current.textContent = `${Math.round(frames / hudTimer)} FPS · ${renderer.info.render.triangles} TRIS`;
          frames = 0;
          hudTimer = 0;
        }
      }
    };

    // Only render while on screen and the tab is visible.
    let onScreen = false;
    const syncLoop = () => {
      if (onScreen && !document.hidden) {
        clock.getDelta();
        renderer.setAnimationLoop(renderFrame);
      } else {
        renderer.setAnimationLoop(null);
      }
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      syncLoop();
    });
    visibilityObserver.observe(mount);
    document.addEventListener("visibilitychange", syncLoop);

    return () => {
      renderer.setAnimationLoop(null);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", syncLoop);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onWindowPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [variant, hudRef]);

  return <div ref={mountRef} className={`absolute inset-0 ${className}`} data-cursor="hover" />;
}
