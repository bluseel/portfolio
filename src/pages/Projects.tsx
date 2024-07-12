import React from 'react'
import stl from "./Projects.module.css"
import photo from "/computer task tracker .png"
import externalLinkSvg from "/externalLink.svg"
import ProjectsData from "./ProjectsData.js"

const Projects = () => {
  console.log(ProjectsData)
  

  return (
    <div className={stl.projectsPageContainer}>
      <div className={stl.projectNamesContainer}>
        <ul>
          {ProjectsData.map(project=>(
            
          <li className={stl.inListProjectName}>{project.name}</li>
          
          ))}

        </ul>
      </div>
      
    </div>
  )
}

export default Projects