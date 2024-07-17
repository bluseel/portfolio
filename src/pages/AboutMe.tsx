
import stl from './aboutme.module.css'
import me from '/aboutMe/me.png'

const AboutMe = () => {
  const skills = [
    { src: '/aboutMe/mongodb.png', alt: 'MongoDB' },
    { src: '/aboutMe/express.png', alt: 'ExpressJS' },
    { src: '/aboutMe/react.png', alt: 'ReactJS' },
    { src: '/aboutMe/node.png', alt: 'NodeJS' },
    { src: '/aboutMe/figma.png', alt: 'Figma' },
    { src: '/aboutMe/three.png', alt: 'ThreeJS' },
    { src: '/aboutMe/vite.png', alt: 'Vite' },
    { src: '/aboutMe/ts.png', alt: 'TypeScript' },
  ];

  return (
    <div className={stl.aboutMeContainer}>
      <div className={stl.descriptionPortion}>
        <div className={stl.nameAndPhoto}>
          <div className={stl.name}>
            ATTIQUE SAHITO
          </div>
          <div className={stl.photo}>
            <img src={me} alt="" />
          </div>
        </div>
        <div className={stl.textualDescription}>
          I am Pakistan based web developer and UI/UX designer. I am passionate about crafting innovative and creative designs that help products stand out in a competitive market.
        </div>
      </div>

      <div className={stl.skillsContainer}>
        <div className={stl.title}>
          TECHNOLOGIES
        </div>
        <div className={stl.onlySkillImagesContainer}>

          {skills.map((skill, index) => (
            <div className={stl.singleSkillContainer} key={index}>
              <img src={skill.src} alt={skill.alt} />
              <div className={stl.skillOverlay}>{skill.alt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutMe