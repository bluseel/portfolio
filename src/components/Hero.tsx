import stl from "./css modules/hero.module.css";

const Hero = () => {
  return (

    <div className={stl.heroContainer}>
      <div className={stl.upperText}>
        <div className={stl.subtext}>
          DESIGNING
        </div>
        <div className={stl.maintext}>
          <span className={stl.MobileOUTSIDE}> OUTSIDE </span> <span className={stl.MobileTheBox}>  THE BOX </span>
        </div>
      </div>
      <div className={stl.bottomText}>
        <div className={stl.bottomSubtext}>
          DEVELOPING
        </div>
        <div className={stl.bottomMaintext}>
          <span className={stl.MobileYOUR}>YOUR</span> <span className={stl.MobileIDEAS}>IDEAS</span>
        </div>
      </div>

    </div>
    
  );
};

export default Hero;
