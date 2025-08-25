import { scrollToId } from "../utils/scrollToId";
import styles from "./Navbar.module.css";
import cvPdf from "../assets/CV_Eduardo SierraFragozo.pdf"; // <-- importa el PDF

export default function Navbar() {
  const items = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className={styles.nav}>
      <div className="brand">Eduardo Sierra</div>

      <div className="links">
        {items.map((i) => (
          <button
            key={i.id}                           // <--- agrega key
            className={styles.link}
            onClick={() => scrollToId(i.id)}
            aria-label={`Ir a ${i.label}`}
          >
            {i.label}
          </button>
        ))}
      </div>

  
      <div className={styles.download}>
        <a
          href={cvPdf}
          download="Eduardo_Sierra_CV.pdf"
          type="application/pdf"
          className={styles.download}
          aria-label="Descargar CV en PDF"
        >
          Download CV
        </a>
      </div>
    </nav>
  );
}
