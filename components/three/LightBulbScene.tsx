"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * A single light bulb rendered with three.js. It sits dark until the visitor
 * hovers (or taps / focuses) it, then the filament and the room light up.
 * Frames are only drawn while the light is changing, so it idles at zero cost.
 */
export default function LightBulbScene({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const requestRenderRef = useRef<() => void>();
  const litRef = useRef(false);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // No WebGL — the static frame around the canvas still reads fine.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.25, 9.5);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    // Soft studio reflections so the glass reads as glass.
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    disposables.push(envTexture, pmrem);

    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(3, 5, 6);
    scene.add(key, new THREE.AmbientLight(0xffffff, 0.35));

    const bulb = new THREE.Group();
    bulb.position.y = -0.2;
    scene.add(bulb);

    // --- Glass envelope (classic A-shape, revolved from a profile) ---------
    const glassProfile = [
      [0.001, 2.15], [0.42, 2.09], [0.78, 1.88], [1.02, 1.54], [1.16, 1.12],
      [1.18, 0.62], [1.08, 0.18], [0.84, -0.18], [0.62, -0.46], [0.54, -0.62],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const glassMaterial = track(
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.06,
        metalness: 0,
        transmission: 0.92,
        thickness: 0.45,
        ior: 1.45,
        transparent: true,
        side: THREE.DoubleSide,
        emissive: new THREE.Color(0xffc978),
        emissiveIntensity: 0,
      })
    );
    const glass = new THREE.Mesh(track(new THREE.LatheGeometry(glassProfile, 64)), glassMaterial);
    bulb.add(glass);

    // --- Filament ---------------------------------------------------------
    const filamentPoints: THREE.Vector3[] = [new THREE.Vector3(-0.34, -0.42, 0)];
    for (let i = 0; i <= 10; i++) {
      filamentPoints.push(new THREE.Vector3(-0.3 + (i * 0.06), 0.28 + (i % 2 === 0 ? 0.34 : 0), 0));
    }
    filamentPoints.push(new THREE.Vector3(0.34, -0.42, 0));
    const filamentMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0x6b6355,
        emissive: new THREE.Color(0xffb347),
        emissiveIntensity: 0,
        roughness: 0.5,
        metalness: 0.4,
      })
    );
    const filament = new THREE.Mesh(
      track(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(filamentPoints), 180, 0.035, 8)),
      filamentMaterial
    );
    bulb.add(filament);

    // Stem and support posts
    const stemMaterial = track(new THREE.MeshStandardMaterial({ color: 0xd8d4cc, roughness: 0.35, metalness: 0.2 }));
    const stem = new THREE.Mesh(track(new THREE.CylinderGeometry(0.16, 0.24, 0.55, 20)), stemMaterial);
    stem.position.y = -0.62;
    bulb.add(stem);

    // --- Screw base -------------------------------------------------------
    const baseProfile: THREE.Vector2[] = [];
    for (let i = 0; i <= 26; i++) {
      const t = i / 26;
      const y = -0.52 - t * 0.82;
      const wave = Math.sin(t * Math.PI * 7) * 0.025;
      baseProfile.push(new THREE.Vector2(0.5 + wave, y));
    }
    baseProfile.push(new THREE.Vector2(0.3, -1.42), new THREE.Vector2(0.001, -1.5));
    const base = new THREE.Mesh(
      track(new THREE.LatheGeometry(baseProfile, 48)),
      track(new THREE.MeshStandardMaterial({ color: 0xb2b6bd, roughness: 0.32, metalness: 0.95 }))
    );
    bulb.add(base);

    // --- Emitted light + halo --------------------------------------------
    const bulbLight = new THREE.PointLight(0xffc06a, 0, 26, 2);
    bulbLight.position.set(0, 0.55, 0);
    bulb.add(bulbLight);

    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = haloCanvas.height = 128;
    const ctx = haloCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(255,206,140,0.95)");
      gradient.addColorStop(0.4, "rgba(255,186,110,0.35)");
      gradient.addColorStop(1, "rgba(255,180,100,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const haloTexture = track(new THREE.CanvasTexture(haloCanvas));
    const haloMaterial = track(
      new THREE.SpriteMaterial({ map: haloTexture, blending: THREE.AdditiveBlending, transparent: true, opacity: 0, depthWrite: false })
    );
    const halo = new THREE.Sprite(haloMaterial);
    halo.scale.setScalar(7.5);
    halo.position.set(0, 0.55, 0);
    bulb.add(halo);

    // --- Sizing -----------------------------------------------------------
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // Keep the whole bulb in frame on narrow viewports.
      const fitHeight = 4.4 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      camera.position.z = Math.max(fitHeight, fitHeight / camera.aspect) * 0.62;
      requestRender();
    };

    // --- Render on demand -------------------------------------------------
    let brightness = 0;
    let frame = 0;
    let running = false;

    const draw = () => {
      const target = litRef.current ? 1 : 0;
      const step = reduceMotion ? 1 : 0.08;
      brightness += (target - brightness) * step;
      if (Math.abs(target - brightness) < 0.002) brightness = target;

      const eased = brightness * brightness;
      bulbLight.intensity = eased * 34;
      filamentMaterial.emissiveIntensity = brightness * 9;
      glassMaterial.emissiveIntensity = eased * 0.55;
      glassMaterial.transmission = 0.92 - eased * 0.25;
      haloMaterial.opacity = eased * 0.9;
      halo.scale.setScalar(6.5 + eased * 1.6);

      renderer.render(scene, camera);

      if (brightness !== target) {
        frame = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const requestRender = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) requestRender();
    });
    observer.observe(mount);

    // Lets the hover handlers below kick off a render when the state flips.
    requestRenderRef.current = requestRender;

    return () => {
      cancelAnimationFrame(frame);
      requestRenderRef.current = undefined;
      resizeObserver.disconnect();
      observer.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const setLitState = (next: boolean) => {
    litRef.current = next;
    setLit(next);
    requestRenderRef.current?.();
  };

  return (
    <button
      type="button"
      aria-pressed={lit}
      aria-label={lit ? "Turn the light bulb off" : "Turn the light bulb on"}
      onMouseEnter={() => setLitState(true)}
      onMouseLeave={() => setLitState(false)}
      onFocus={() => setLitState(true)}
      onBlur={() => setLitState(false)}
      onClick={() => setLitState(!lit)}
      className={`group relative block w-full h-full cursor-pointer ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: lit ? 1 : 0,
          background: "radial-gradient(circle at 50% 42%, rgb(255 198 120 / 0.28), transparent 62%)",
        }}
      />
      <div ref={mountRef} className="absolute inset-0" />
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-widest text-ink/40 transition-opacity duration-300 group-hover:opacity-0">
        Hover to light up
      </span>
    </button>
  );
}
