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
  const width = window.innerWidth
  const isMobile : boolean = (width <= 768);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleMouseEnter = (project: Project) => {
    setHoveredProject(project);
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
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
                    onMouseEnter={() => handleMouseEnter(project)}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                  >
                    {project.name}
                  </li>
                ))}
              </ul>
              {!isMobile && hoveredProject && (
                <div
                  className={stl.hoverImageContainer}
                  style={{ top: cursorPosition.y, left: cursorPosition.x }}
                >
                  <img src={hoveredProject.imageUrls[0]} alt={hoveredProject.name} />
                </div>
              )}
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default Projects;
