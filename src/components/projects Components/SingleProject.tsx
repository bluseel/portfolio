import React, { useEffect, useRef } from 'react';
import task from '/computertasktracker.png';
import stl from './singleproject.module.css';
import cross from '/cross.svg';
import externalSvg from '/externalLink.svg';

// Define the project object
const project = {
  name: 'Task Tracker',
  bulletPoints: ['asdf', 'asdf', 'asdpf', 'asdffff'],
  link: '#', // Add the appropriate link here
  imageUrls: [
    '/projectsPhotos/tasktracker/1.png', 
    '/projectsPhotos/tasktracker/2.png', 
    '/projectsPhotos/tasktracker/3.png', 
    '/projectsPhotos/tasktracker/4.png', 
    '/projectsPhotos/tasktracker/5.png', 
    '/projectsPhotos/tasktracker/6.png', 
    '/projectsPhotos/tasktracker/7.png', 

  ], // Add other image URLs as needed
};

const SingleProject: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const proximityThreshold = 600; // Adjust this value as needed

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const { clientX, clientY, currentTarget } = e;
      const { offsetWidth, offsetLeft, offsetTop } = currentTarget as HTMLDivElement;
      const middleX = offsetLeft + offsetWidth / 2;
      const elements = containerRef.current.children;

      let cursorStyle = 'auto';

      // Check proximity to elements
      for (let i = 0; i < elements.length; i++) {
        const rect = (elements[i] as HTMLElement).getBoundingClientRect();
        const isNearElement =
          clientX > rect.left - proximityThreshold &&
          clientX < rect.right + proximityThreshold &&
          clientY > rect.top - proximityThreshold &&
          clientY < rect.bottom + proximityThreshold;

        if (isNearElement) {
          cursorStyle = 'auto';
          break;
        }
      }

      // If not near any element, set the custom cursor based on position
      if (cursorStyle === 'auto') {
        if (clientX < middleX) {
          cursorStyle = 'url(/left-arrow.png), auto';
        } else {
          cursorStyle = 'url(/right-arrow.png), auto';
        }
      }

      containerRef.current.style.cursor = cursorStyle;
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (containerRef.current) {
      const { clientX, currentTarget } = e;
      const { offsetWidth, offsetLeft } = currentTarget as HTMLDivElement;
      const middleX = offsetLeft + offsetWidth / 2;
      const scrollAmount = offsetWidth / 2;

      if (clientX < middleX) {
        containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('click', handleClick);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return (
    <div className={stl.singleProjectContainer} ref={containerRef}>
      {project.imageUrls.map((url, index) => (
        <img key={index} src={url} className={stl.projectPicture} alt="Task" />
      ))}
      <div className={stl.projectInfo}>
        <div className={stl.controlButtons}>
          <img src={cross} alt="Close" className={stl.crossButton} />
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <img src={externalSvg} alt="External Link" className={stl.externalButton} />
          </a>
        </div>
      </div>
      <div className={stl.projectDetail}>
        <div className={stl.projectName}>{project.name}</div>
        <div className={stl.projectdescription}>
          <ul>
            {project.bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
