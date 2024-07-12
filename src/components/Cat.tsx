import React, { useEffect, useState } from 'react'
import stl from "./css modules/Cat.module.css"
import cat from "/cat.png"
import eye from "/eye.png"


const Cat = ({pageName, setPageName}) => {
  document.addEventListener('mousemove', (e)=>{
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const anchor = document.getElementById('anchor') ;
    const rekt = anchor.getBoundingClientRect();
    const anchorX = rekt.left + rekt.width/2;
    const anchorY = rekt.top + rekt.height/2;
    
    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
    
    const leftEye = document.getElementById('leftEye');
    const rightEye= document.getElementById('rightEye');
    
    leftEye.style.transform = `rotate(${90+angleDeg}deg)`;
    rightEye.style.transform = `rotate(${90+angleDeg}deg)`;
    
  })

  function angle (cx, cy, ex, ey){
    const dy =  ey - cy;
    const dx =  ex - cx;
    const rad = Math.atan2(dy,dx);
    const deg = rad * 180 / Math.PI;
    return deg

  }


useEffect(() => {

  console.log(pageName)
  const catElement = document.querySelector(`.${stl.catContainer}`);
  const catEyes = document.querySelector(`.${stl.eyesContainer}`);
  if (pageName === "Home") {
    if (catElement) {
      catElement.classList.add(stl.catInHome);
      catElement.classList.remove(stl.catInProjects);
      
      catElement.classList.add(stl.eyesInHome);
      catEyes?.classList.remove(stl.eyesInProjects);
      
    }
  }
  if (pageName === "Projects") {
    if (catElement) {
      catElement.classList.add(stl.catInProjects);
      catElement.classList.remove(stl.catInHome);

    }
  }
}, [pageName]);
  

  return (
    <>
      
      <div className={stl.catContainer} id='anchor'>
        <img src={cat} className={stl.catImg} alt="" />

        <div className={stl.eyesContainer}>
          <img src={eye} className={stl.leftEye} id='leftEye' alt="" />
          <img src={eye} className={stl.rightEye} id='rightEye' alt="" />
        </div>
      </div>
    </>
  )
}

export default Cat