import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import stl from "./css modules/Header.module.css";

interface HeaderProps {
  pageName: string;
  setPageName: Dispatch<SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ pageName, setPageName }) => {
  const pages = ["Home", "Projects", "About Me", "Contact"];
  const [showPages, setShowPages] = useState(false);

  
  const width = window.innerWidth;
  const isMobile = width <= 768;

  function handlePageChange(e: React.MouseEvent<HTMLLIElement>) {
    const target = e.currentTarget as HTMLLIElement;
    const pageName = target.innerText;

    setPageName(pageName);

    const sectionId = `${pageName.replace(" ", "")}Section`;
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }

    setShowPages(false); // Hide pages after selecting one
  }

  useEffect(() => {
    window.addEventListener('scroll', function () {
      console.log('Scrolling...');
      // You can add more logic here if needed
    });
  }, []);

  useEffect(() => {
    const headerElem = document.querySelector(`.${stl.headerContainer}`);
    if (pageName === "Home" || pageName === "About Me" || pageName === "Contact") {
      if (headerElem) {
        headerElem.classList.remove(stl.blackTextColor);
        headerElem.classList.add(stl.yellowTextColor);
        
        if (isMobile && pageName === "Contact") {
          headerElem.classList.add(stl.blackTextColor);
          headerElem.classList.remove(stl.yellowTextColor);          
        }
      }
    }
    if (pageName === "Projects") {
      if (headerElem) {
        headerElem.classList.remove(stl.yellowTextColor);
        headerElem.classList.add(stl.blackTextColor);
      }
    }
  }, [pageName]);

  return (
    <div className={stl.headerContainer}>
      <ul 
        className={stl.pageList}
        onMouseEnter={() => setShowPages(true)}
        onMouseLeave={() => setShowPages(false)}
      >
        <li 
          className={stl.currentPage} 
          onClick={() => setShowPages(!showPages)}
        >
          {`>${pageName}<`}
        </li>
        {showPages && (
          <div>
            {pages.map((page) => (
              page !== pageName && (
                <li 
                  key={page} 
                  className={stl.normalPage} 
                  onClick={handlePageChange}
                >
                  {page}
                </li>
              )
            ))}
          </div>
        )}
      </ul>
    </div>
  );
};

export default Header;
