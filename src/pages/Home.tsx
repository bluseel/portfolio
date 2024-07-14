import '../App.css'
import Hero from '../components/Hero'
import stl from "./Home.module.css"


const Home = () => {
  return (
    <div className={stl.homeContainer}>
    <div className={stl.backgroundShape}>
    </div>

    <Hero/>
  </div>
  )
}

export default Home;