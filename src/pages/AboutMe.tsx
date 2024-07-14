import React from 'react'
import mongodb from '/aboutMe/mongodb.png'
import expressJS from '/aboutMe/express.png'
import reactJS from '/aboutMe/react.png'
import nodeJS from '/aboutMe/node.png'
import figma from '/aboutMe/figma.png'
import threeJS from '/aboutMe/three.png'
import vite from '/aboutMe/vite.png'
import typescript from '/aboutMe/ts.png'

import stl from './aboutme.module.css'
import me from '/aboutMe/me.png'

const AboutMe = () => {
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

      <div className={stl.skillSetContainer}>
        <div className={stl.singleSkillContainer}>
          <img src={mongodb} alt="" />
        </div>
      </div>
    </div>
  )
}

export default AboutMe