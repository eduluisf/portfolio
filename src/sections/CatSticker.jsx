import styles from "./Cat.module.css";
import heroExtra from "../../assets/hero-video.webp";

export default function Cat() {
  return (
    <section id="cat" className={`section ${styles.cat}`}>
      <figure className={styles.media}>
        <img
          src={heroExtra}
          alt="Michi el gato"
          className={styles.img}
          loading="lazy"
          decoding="async"
          draggable="false"
        />
      </figure>
    </section>
  );
}
