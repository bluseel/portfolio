  import { useState } from 'react'
  import './App.css'
  import Header from './components/Header'
  import RedDotCursor from './components/RedDotCursor'
  import Home from './pages/Home'
  import Projects from './pages/Projects'
  import Cat from "./components/Cat"
  import SingleProject from './components/projects Components/SingleProject'

  function App() {
    const [pageName, setPageName] = useState("Home")

    return (
      <>

        <Cat pageName={pageName} setPageName={setPageName}/>

        {
          pageName === "Home"?<RedDotCursor/>: <div></div> }
        
        
        <Header pageName={pageName} setPageName={setPageName}/>  
        {pageName==="Home"? <Home/>:
        pageName==="Projects"? <Projects/>: 
        <div></div>
        }
        
        {/* <SingleProject/> */}

      </>
        
    )
  }

  export default App
