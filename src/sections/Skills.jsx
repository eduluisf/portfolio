import { useEffect, useRef, useState } from "react";
import styles from "./Skills.module.css";

export default function Skills() {
  const slides = [
    {
      key: "ai",
      brand: "AI",
      title: "AI playground",
      desc:
        "Modelos, visión por computador y tooling para flujos 3D. Experimentos y prototipos aplicados a educación y producción.",
      href: "/projects?tag=ai",
      // Si luego añades imágenes reales, pásalas aquí:
      images: [] // ["./assets/ai-1.webp", "./assets/ai-2.webp", ...]
    },
    {
      key: "design",
      brand: "Design",
      title: "Design playground",
      desc:
        "Exploraciones de UI/visual con foco en sistemas, tipografía y motion. Layouts, iconografía y microinteracciones.",
      href: "/projects?tag=design",
      images: []
    },
    {
      key: "dev",
      brand: "Code",
      title: "Programming",
      desc:
        "Apps y utilidades en React, gráficos en tiempo real y tooling para pipelines creativos.",
      href: "/projects?tag=dev",
      images: []
    }
  ];

  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 1; // margen por redondeo
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => updateEdges();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollByAmount = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth; // una “pantalla”
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Skills · Highlights</h2>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Anterior"
            onClick={() => scrollByAmount(-1)}
            disabled={atStart}
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Siguiente"
            onClick={() => scrollByAmount(1)}
            disabled={atEnd}
          >
            ›
          </button>
        </div>
      </div>

      <div
        className={styles.viewport}
        role="region"
        aria-roledescription="carousel"
        aria-label="Skills showcase"
      >
        <div className={styles.track} ref={trackRef} role="list">
          {slides.map((s, i) => (
            <article
              key={s.key}
              className={`${styles.slide} ${styles[s.key] || ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${slides.length}`}
            >
              {/* Panel de texto */}
              <div className={styles.panel}>
                <span className={styles.brand}>{s.brand}</span>
                <h3 className={styles.headline}>{s.title}</h3>
                <p className={styles.lead}>{s.desc}</p>
                <a href={s.href} className={styles.cta} aria-label={`Explorar ${s.title}`}>
                  Explore →
                </a>
              </div>

              {/* Collage derecha (si no hay imágenes, se crean placeholders) */}
              <div className={styles.collage} aria-hidden="true">
                {(s.images?.length ? s.images : Array.from({ length: 8 })).map((src, idx) => (
                  src ? (
                    <img key={idx} src={src} alt="" className={styles.thumb} />
                  ) : (
                    <div key={idx} className={styles.thumb} />
                  )
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
