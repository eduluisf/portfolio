import "./App.css";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ScrollArrow from "./sections/ScrollArrow";
import BackgroundSpots from "./components/BackgroundSpots";

function App() {
  return (
    <div className="App body-bg">
      <BackgroundSpots />  
      <Navbar />
      <Hero />
      <section id="about" className="section"><About /></section>
      <section id="skills" className="section"><Skills /></section>
      <section id="contact" className="section"><Contact /></section>
      <Footer />
    </div>
  );
}

export default App;
