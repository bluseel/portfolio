import { useEffect, Dispatch, SetStateAction } from 'react';
import stl from "./css modules/Header.module.css";

interface HeaderProps {
  pageName: string;
  setPageName: Dispatch<SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ pageName, setPageName }) => {
  const pages = ["Home", "Projects", "About Me", "Contact"];
  const allPages = [""];

  function handlePageChange(e: React.MouseEvent<HTMLLIElement>) {
    const target = e.currentTarget as HTMLLIElement;
    const pageName = target.innerText;

    setPageName(pageName);

    const sectionId = `${pageName.replace(" ", "")}Section`;
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', function () {
      console.log('Scrolling...');
      // You can add more logic here if needed
    });
  }, []);

  const currentPageIndex = pages.indexOf(pageName);

  let totalPages = pages.length;
  let index = currentPageIndex;
  while (totalPages > 0) {
    if (index === pages.length || index === -1) {
      index = 0;
    }
    allPages.push(pages[index]);
    totalPages--;
    index++;
  }

  useEffect(() => {
    const headerElem = document.querySelector(`.${stl.headerContainer}`);
    if (pageName === "Home" || pageName === "About Me" || pageName === "Contact") {
      if (headerElem) {
        headerElem.classList.remove(stl.blackTextColor);
        headerElem.classList.add(stl.yellowTextColor);
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
      <ul className={stl.pageList}>
        <div>
          {allPages.map((page) => (
            <li className={pageName === page ? stl.currentPage : stl.normalPage} onClick={handlePageChange}>
              {pageName === page ? `>${page}<` : `${page}`}
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Header;
