import styles from "./Contact.module.css";
import catImg from "../assets/hero-video.webp"; // tu gato (webp/png/svg)

export default function Contact() {
  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    alert(`Gracias, ${data.name}! Te responderé a ${data.email}.`);
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className={`${styles.inner} ${styles.grid}`}>
        {/* Columna: formulario */}
        <div className={styles.formWrap}>
          <h2 className={styles.title}>Contacto</h2>
          <form className={styles.form} onSubmit={onSubmit}>
            <input name="name" placeholder="Nombre" required />
            <input type="email" name="email" placeholder="Email" required />
            <textarea name="message" placeholder="Mensaje" rows="4" />
            <button className={styles.submit} type="submit">Enviar</button>
          </form>
        </div>

        {/* Columna: gato */}
        <aside className={styles.aside} aria-hidden="true">
          <img src={catImg} alt="" className={styles.img} draggable="false" />
          <small className={styles.caption}>Michi supervisando 👀</small>
        </aside>
      </div>
    </section>
  );
}
