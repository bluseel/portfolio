import '../App.css'
import Hero from '../components/Hero'
import stl from "./Home.module.css"


const Home = () => {
  return (
    <>
    <div className={stl.backgroundShape}>
      <img src="vite.svg" alt="" />
    </div>

    <Hero/>
  </>
  )
}

export default Home;