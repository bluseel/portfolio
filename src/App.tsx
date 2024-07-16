import { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact.tsx';
import Cat from './components/Cat';
import AboutMe from './pages/AboutMe.tsx';

function App() {
  const [pageName, setPageName] = useState('Home');

  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutMeRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute('data-section');
          setPageName(section);
        }
      });
    }, options);

    const sections = [
      homeRef.current,
      projectsRef.current,
      aboutMeRef.current,
      contactRef.current,
    ];

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="app-container">
      <Cat pageName={pageName} />
      <Header pageName={pageName} setPageName={setPageName} />
      <div className="scroll-container">
        <section className="scroll-section" data-section="Home" ref={homeRef} id="HomeSection">
          <Home />
        </section>
        <section className="scroll-section" data-section="Projects" ref={projectsRef} id="ProjectsSection">
          <Projects />
        </section>
        <section className="scroll-section" data-section="About Me" ref={aboutMeRef} id="AboutMeSection">
          <AboutMe />
        </section>
        <section className="scroll-section" data-section="Contact" ref={contactRef} id="ContactSection">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default App;
