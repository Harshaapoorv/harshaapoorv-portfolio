import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Hero from "./screens/Hero";
import About from "./screens/About";
import Contact from "./screens/Contact";
import Education from "./screens/Education";
import Projects from "./screens/Projects";
import Experience from "./screens/Experience";

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  return (
    <div className="body">
      <Header activeSection={activeSection} />
      <Hero setActiveSection={setActiveSection} />
      <About setActiveSection={setActiveSection} />
      <Experience setActiveSection={setActiveSection} />
      <Education setActiveSection={setActiveSection} />
      <Projects setActiveSection={setActiveSection} />
      <Contact setActiveSection={setActiveSection} />
    </div>
  );
}

export default App;
