import "./App.css";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Cat from "./sections/cat";
import ScrollArrow from "./sections/ScrollArrow";

function App() {
  return (
    <div className="App">

      <ScrollArrow nextId="about" />
      <Navbar />
      <Hero />
      <Cat />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
