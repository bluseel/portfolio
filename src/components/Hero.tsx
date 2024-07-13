import stl from "./css modules/hero.module.css";

const Hero = () => {
  return (

    <div className={stl.heroContainer}>
      <div className={stl.upperText}>
        <div className={stl.subtext}>
          DESIGNING
        </div>
        <div className={stl.maintext}>
          OUTSIDE THE BOX
        </div>
      </div>
      <div className={stl.bottomText}>
        <div className={stl.bottomSubtext}>
          DEVELOPING
        </div>
        <div className={stl.bottomMaintext}>
          YOUR IDEAS
        </div>
      </div>

    </div>
    
  );
};

export default Hero;
