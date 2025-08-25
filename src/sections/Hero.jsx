import styles from './Hero.module.css';


export default function Hero() {
  const tags = ["Artificial Intelligence", "Education", "Programming", "3D Art"];

  return (
    <header id="home" className={`section ${styles.hero}`}>
      <h1 className={styles.headline}>
        I'm <span className={styles.name}>Eduardo Sierra</span>
      </h1>

      <p className={styles.sub}>Engineer in Digital Design & Entertainment</p>
      <p className={styles.sub}>MSc in Artificial Intelligence</p>
      <p className={styles.sub_two}>
        Currently working as an educator, researcher, and creator in AI, Unity, and digital design.
      </p>

      <ul className={styles.pills} role="list">
        {tags.map(t => (
          <li key={t}>
            <button type="button" className={styles.pill} aria-label={t}>
              {t}
            </button>
          </li>
        ))}
      </ul>

      
    </header>
  );
}
