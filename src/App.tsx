  import { useState } from 'react'
  import reactLogo from './assets/react.svg'
  import viteLogo from '/vite.svg'
  import './App.css'
  import Hero from './components/Hero'
  import Header from './components/Header'
  import RedDotCursor from './components/RedDotCursor'
  import Home from './pages/Home'
  import Projects from './pages/Projects'
  import Cat from "./components/Cat"

  function App() {
    const [pageName, setPageName] = useState("Home")

    return (
      <>

        <Cat pageName={pageName} setPageName={setPageName}/>

        <RedDotCursor/>
        
        <Header pageName={pageName} setPageName={setPageName}/>  
        {pageName==="Home"? <Home/>:
        pageName==="Projects"? <Projects/>: 
        <div></div>
        }

      </>
        
    )
  }

  export default App
