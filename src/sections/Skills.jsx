export default function Skills() {
  const skills = ["Python", "PyTorch", "OpenCV", "Unity", "Blender", "Figma"];
  return (
    <section id="skills" className="section">
      <h2>Skills</h2>
      <ul className="chips">
        {skills.map((s) => (
          <li key={s} className="chip">{s}</li>
        ))}
      </ul>
    </section>
  );
}
