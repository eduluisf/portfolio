export default function Contact() {
  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    alert(`Gracias, ${data.name}! Te responderé a ${data.email}.`);
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="section">
      <h2>Contacto</h2>
      <form className="form" onSubmit={onSubmit}>
        <input name="name" placeholder="Nombre" required />
        <input type="email" name="email" placeholder="Email" required />
        <textarea name="message" placeholder="Mensaje" rows="4" />
        <button className="btn" type="submit">Enviar</button>
      </form>
    </section>
  );
}
