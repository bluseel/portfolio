import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import stl from "./Projects.module.css";
import ProjectsData from "./ProjectsData.json";
import SingleProject from '../components/projects Components/SingleProject';

interface Project {
  id: number;
  name: string;
  bulletPoints: string[];
  link: string;
  imageUrls: string[];
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className={stl.projectsPageContainer}>
      <TransitionGroup>
        {selectedProject ? (
          <CSSTransition
            key="singleProject"
            timeout={300}
            classNames={{
              enter: stl.enter,
              enterActive: stl.enterActive,
              exit: stl.exit,
              exitActive: stl.exitActive,
            }}
          >
            <SingleProject project={selectedProject} onClose={handleCloseProject} />
          </CSSTransition>
        ) : (
          <CSSTransition
            key="projectList"
            timeout={300}
            classNames={{
              enter: stl.enter,
              enterActive: stl.enterActive,
              exit: stl.exit,
              exitActive: stl.exitActive,
            }}
          >
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
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default Projects;
