// src/hooks/useGradientParallax.js
import { useEffect, useRef } from "react";

export function useGradientParallax(selector = ".body-bg") {
  const ticking = useRef(false);
  const running = useRef(false);

  useEffect(() => {
    const host = document.querySelector(selector);
    if (!host) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    const TAU = Math.PI * 2;

    const update = () => {
      ticking.current = false;
      const y = window.scrollY || 0;
      const vh = window.innerHeight || 1;
      const doc = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const progress = Math.min(1, Math.max(0, y / Math.max(1, doc - vh)));

      let s1x = 20, s1y = 40, s1rx = 60, s1ry = 40;
      let s2x = 80, s2y = 20, s2rx = 40, s2ry = 28;
      let s3x = 70, s3y = 70, s3rx = 28, s3ry = 20;

      // parallax
      s1x += Math.sin(progress * TAU) * 2;
      s1y += Math.cos(progress * TAU) * 1.5;
      s2x += Math.cos(progress * TAU * 1.2) * 3;
      s2y += Math.sin(progress * TAU * 1.1) * 2;
      s3x += Math.sin(progress * TAU * 1.5) * 4;
      s3y += Math.cos(progress * TAU * 1.3) * 3;

      // breathing (ajusta a 1 si quieres que se detenga al parar)
      const pulse1 = 1 + Math.sin(y / 400) * 0.04;
      const pulse2 = 1 + Math.sin(y / 320 + 0.7) * 0.06;
      const pulse3 = 1 + Math.sin(y / 260 + 1.2) * 0.08;

      host.style.setProperty("--s1-x", `${s1x}%`);
      host.style.setProperty("--s1-y", `${s1y}%`);
      host.style.setProperty("--s1-rx", `${(s1rx * pulse1).toFixed(2)}rem`);
      host.style.setProperty("--s1-ry", `${(s1ry * pulse1).toFixed(2)}rem`);

      host.style.setProperty("--s2-x", `${s2x}%`);
      host.style.setProperty("--s2-y", `${s2y}%`);
      host.style.setProperty("--s2-rx", `${(s2rx * pulse2).toFixed(2)}rem`);
      host.style.setProperty("--s2-ry", `${(s2ry * pulse2).toFixed(2)}rem`);

      host.style.setProperty("--s3-x", `${s3x}%`);
      host.style.setProperty("--s3-y", `${s3y}%`);
      host.style.setProperty("--s3-rx", `${(s3rx * pulse3).toFixed(2)}rem`);
      host.style.setProperty("--s3-ry", `${(s3ry * pulse3).toFixed(2)}rem`);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      running.current = true;
      requestAnimationFrame(update);
      clearTimeout(onScroll._idle);
      onScroll._idle = setTimeout(() => (running.current = false), 150);
    };

    const onResize = () => {
      if (!running.current) update();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(onScroll._idle);
    };
  }, [selector]);
}
