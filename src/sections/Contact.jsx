import styles from "./Contact.module.css";

export default function Contact() {
  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    alert(`Gracias, ${data.name}! Te responderé a ${data.email}.`);
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Contacto</h2>
        <form className={styles.form} onSubmit={onSubmit}>
          <input name="name" placeholder="Nombre" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" placeholder="Mensaje" rows="4" />
          <button className={styles.submit} type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
}
