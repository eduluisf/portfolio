import { useEffect, useState } from "react";
import styles from "./ScrollArrow.module.css";
import { scrollToId } from "../utils/scrollToId";
import { ReactComponent as ArrowIcon } from "../assets/arrow.svg"; // <- tu SVG

/**
 * Flecha fija que cambia de dirección según scroll.
 * @param {string} nextId - id de la próxima sección a la que bajar (por defecto "about").
 * @param {number} threshold - tolerancia en px para considerar “llegué al fondo”.
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
    if (pointUp) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (nextId) {
      scrollToId(nextId);
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  const label = pointUp ? "Subir al inicio" : "Bajar a la siguiente sección";

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
