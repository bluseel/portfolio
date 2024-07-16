import React, { useEffect, useRef, useState } from 'react';
import stl from './singleproject.module.css';
import cross from '/cross.svg';
import externalSvg from '/externalLink.svg';

interface SingleProjectProps {
  project: {
    id: number;
    name: string;
    bulletPoints: string[];
    link: string;
    imageUrls: string[];
  };
  onClose: () => void;
}

const SingleProject: React.FC<SingleProjectProps> = ({ project, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const { clientX, currentTarget } = e;
      const { offsetWidth, offsetLeft } = currentTarget as HTMLDivElement;
      const middleX = offsetLeft + offsetWidth / 2;

      let cursorStyle = 'auto';

      if (clientX < middleX) {
        cursorStyle = 'url(/left-arrow.png), auto';
      } else {
        cursorStyle = 'url(/right-arrow.png), auto';
      }

      containerRef.current.style.cursor = cursorStyle;
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (containerRef.current) {
      const { clientX, currentTarget } = e;
      const { offsetWidth, offsetLeft } = currentTarget as HTMLDivElement;
      const middleX = offsetLeft + offsetWidth / 2;
      const scrollAmount = offsetWidth;

      if (clientX < middleX) {
        if (currentIndex === 0) {
          containerRef.current.scrollTo({ left: containerRef.current.scrollWidth, behavior: 'smooth' });
          setCurrentIndex(project.imageUrls.length - 1);
        } else {
          containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
          setCurrentIndex(currentIndex - 1);
        }
      } else {
        if (currentIndex === project.imageUrls.length - 1) {
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          setCurrentIndex(0);
        } else {
          containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          setCurrentIndex(currentIndex + 1);
        }
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
  }, [currentIndex]);

  return (
    <div className={stl.singleProjectContainer} ref={containerRef}>
      {project.imageUrls.map((url, index) => (
        <img key={index} src={url} className={stl.projectPicture} alt="Task" />
      ))}
      <div className={stl.projectDetail}>
        <div className={stl.projectName}>{project.name}</div>
        <div className={stl.projectDescription}>
          <ul>
            {project.bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        <div className={stl.projectInfo}>
          <div className={stl.controlButtons}>
            <img src={cross} alt="Close" className={stl.crossButton} onClick={onClose} />
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <img src={externalSvg} alt="External Link" className={stl.externalButton} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
