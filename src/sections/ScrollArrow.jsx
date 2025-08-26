// ScrollArrow.jsx (simple)
import { useEffect, useState } from "react";
import styles from "./ScrollArrow.module.css";
import { ReactComponent as ArrowIcon } from "../assets/arrow.svg";

/**
 * Minimal floating arrow:
 * - Points down; on click scrolls to nextId or by one viewport.
 * - When near bottom, flips up; on click scrolls to top.
 */
export default function ScrollArrow({ nextId = "about", threshold = 64 }) {
  const [pointUp, setPointUp] = useState(false);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollBottom = window.innerHeight + window.scrollY;
      const pageHeight = Math.max(doc.scrollHeight, document.body.scrollHeight);
      setPointUp(scrollBottom >= pageHeight - threshold);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [threshold]);

  const onClick = () => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const behavior = prefersReduced ? "auto" : "smooth";

    if (pointUp) {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    if (nextId) {
      const el = document.getElementById(nextId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior });
        return;
      }
    }
    // fallback: scroll by one viewport
    window.scrollBy({ top: window.innerHeight, behavior });
  };

  const label = pointUp ? "Subir al inicio" : "Bajar";

  return (
    <button
      type="button"
      className={`${styles.arrow} ${pointUp ? styles.up : styles.down}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <span className={styles.float}>
        <ArrowIcon className={styles.icon} aria-hidden="true" />
      </span>
    </button>
  );
}
