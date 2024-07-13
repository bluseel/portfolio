import React, { useState } from 'react';
import stl from "./Projects.module.css";
import ProjectsData from "./ProjectsData.json";
import SingleProject from '../components/projects Components/SingleProject.js';

// Project type based on JSON structure
interface Project {
  id: number;
  name: string;
  bulletPoints: string[];
  link: string;
  imageUrls: string[];
}


const Projects:  React.FC = () => {
  // <Project | null>: this shows that it can be either project or null 
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project:Project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className={stl.projectsPageContainer}>
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
    </div>
  );
};

export default Projects;
