import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group'; // Import CSSTransition
import stl from "./Projects.module.css";
import ProjectsData from "./ProjectsData.js";
import SingleProject from '../components/projects Components/SingleProject.js';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className={stl.projectsPageContainer}>
      <CSSTransition
        in={selectedProject !== null}
        timeout={500}
        classNames="slide"
        unmountOnExit
      >
        {selectedProject ? (
          <SingleProject project={selectedProject} onClose={handleCloseProject} />
        ) : (
          <div className={stl.projectNamesContainer}>
            <ul>
              {ProjectsData.map(project => (
                <li
                  key={project.id}
                  className={stl.inListProjectName}
                  onClick={() => handleProjectClick(project)}
                >
                  {project.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CSSTransition>
    </div>
  );
};

export default Projects;
