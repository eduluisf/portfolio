import { useEffect, useRef } from "react";

/**
 * Parallax + breathing for 3 fixed spots.
 * refs: [ref1, ref2, ref3]
 * intensity: multiplier (1 = base, try 1.2..1.6 for more)
 */
export function useSpotsParallax(refs, intensity = 1) {
  const ticking = useRef(false);
  const running = useRef(false);

  useEffect(() => {
    const [r1, r2, r3] = refs;
    const el1 = r1?.current, el2 = r2?.current, el3 = r3?.current;
    if (!el1 || !el2 || !el3) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    const TAU = Math.PI * 2;

    // defaults
    const def = {
      s1: { x: 20, y: 25, rx: 60, ry: 40 },
      s2: { x: 80, y: 20, rx: 40, ry: 28 },
      s3: { x: 70, y: 70, rx: 28, ry: 20 },
    };

    const apply = () => {
      ticking.current = false;

      const y = window.scrollY || 0;
      const vh = window.innerHeight || 1;
      const doc = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const progress = Math.min(1, Math.max(0, y / Math.max(1, doc - vh)));

      // RANGOS MÁS VISIBLES (ajusta con intensity)
      const p1x = 3.0 * intensity, p1y = 2.2 * intensity;
      const p2x = 5.0 * intensity, p2y = 3.5 * intensity;
      const p3x = 7.0 * intensity, p3y = 5.0 * intensity;

      // desplazamiento (% viewport)
      const s1x = def.s1.x + Math.sin(progress * TAU * 1.0) * p1x;
      const s1y = def.s1.y + Math.cos(progress * TAU * 1.0) * p1y;

      const s2x = def.s2.x + Math.cos(progress * TAU * 1.15) * p2x;
      const s2y = def.s2.y + Math.sin(progress * TAU * 1.10) * p2y;

      const s3x = def.s3.x + Math.sin(progress * TAU * 1.4) * p3x;
      const s3y = def.s3.y + Math.cos(progress * TAU * 1.3) * p3y;

      // pulso de radio (más marcado)
      const pulse1 = 1 + Math.sin(y / 280) * 0.10 * intensity; // ±10%
      const pulse2 = 1 + Math.sin(y / 220 + 0.7) * 0.14 * intensity; // ±14%
      const pulse3 = 1 + Math.sin(y / 180 + 1.2) * 0.18 * intensity; // ±18%

      // escribir en style (rem/%)
      el1.style.setProperty("--x", `${s1x}%`);
      el1.style.setProperty("--y", `${s1y}%`);
      el1.style.setProperty("--rx", `${(def.s1.rx * pulse1).toFixed(2)}rem`);
      el1.style.setProperty("--ry", `${(def.s1.ry * pulse1).toFixed(2)}rem`);

      el2.style.setProperty("--x", `${s2x}%`);
      el2.style.setProperty("--y", `${s2y}%`);
      el2.style.setProperty("--rx", `${(def.s2.rx * pulse2).toFixed(2)}rem`);
      el2.style.setProperty("--ry", `${(def.s2.ry * pulse2).toFixed(2)}rem`);

      el3.style.setProperty("--x", `${s3x}%`);
      el3.style.setProperty("--y", `${s3y}%`);
      el3.style.setProperty("--rx", `${(def.s3.rx * pulse3).toFixed(2)}rem`);
      el3.style.setProperty("--ry", `${(def.s3.ry * pulse3).toFixed(2)}rem`);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      running.current = true;
      requestAnimationFrame(apply);
      clearTimeout(onScroll._idle);
      onScroll._idle = setTimeout(() => (running.current = false), 120);
    };

    const onResize = () => {
      if (!running.current) apply();
    };

    apply(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(onScroll._idle);
    };
  }, [refs, intensity]);
}
