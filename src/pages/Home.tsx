import '../App.css'
import Hero from '../components/Hero'
import stl from "./Home.module.css"
import Sphere from '../components/home components/Sphere.tsx';


const Home = () => {
  return (
    <div className={stl.homeContainer}>
    <Sphere />
    <div className={stl.backgroundShape}>
    </div>

    <Hero/>
  </div>
  )
}

export default Home;