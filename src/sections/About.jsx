import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Sobre mí</h2>

        <p className={styles.lead}>
          Docente e investigador en Inteligencia Artificial aplicada a gráficos 3D y videojuegos.
          Trabajo con Unity, visión por computador y flujos de diseño digital.
        </p>

        <ul className={styles.chips} role="list">
          {["IA", "Unity", "Computer Vision", "3D Art"].map(tag => (
            <li key={tag} className={styles.chip}>{tag}</li>
          ))}
        </ul>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.subtitle}>Ahora</h3>
            <ul className={styles.list}>
              <li>Educación y creación de contenido en IA aplicada.</li>
              <li>Prototipos con modelos generativos y pipelines 3D.</li>
              <li>Investigación en gráficos y aprendizaje profundo.</li>
            </ul>
          </div>
          <div className={styles.card}>
            <h3 className={styles.subtitle}>Antes</h3>
            <ul className={styles.list}>
              <li>Desarrollo de videojuegos y herramientas para artistas.</li>
              <li>Experiencia en pipelines de modelado y shading.</li>
              <li>Mentoría de proyectos académicos y de portafolio.</li>
            </ul>
          </div>
        </div>

        <a href="/projects" className={styles.cta}>Ver proyectos →</a>
      </div>
    </section>
  );
}
