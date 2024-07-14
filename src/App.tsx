import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact.tsx';

import Cat from "./components/Cat";
import Sphere from './components/home components/Sphere.tsx';
import AboutMe from './pages/AboutMe.tsx';

function App() {
  const [pageName, setPageName] = useState("Home");

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.0/build/spline-viewer.js";
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <Cat pageName={pageName} />


      <Header pageName={pageName} setPageName={setPageName} />
      
      {pageName === "Home" ? (
        <>
          <Home />
          <Sphere/>
        </>
      ) : pageName === "Projects" ? (
        <Projects />
      ) : pageName === "Contact" ? (
        <Contact />
      ) : pageName === "About Me" ? (
        <AboutMe />
      )       
      : <div></div> 
      }

      {/* <SingleProject/> */}
    </div>
  );
}

export default App;
