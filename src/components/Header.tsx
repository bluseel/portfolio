import { useEffect, Dispatch, SetStateAction} from 'react'
import stl from "./css modules/Header.module.css";

interface HeaderProps {
  pageName: string;
  setPageName: Dispatch<SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({pageName, setPageName}) => {
  
  const pages = ["Home", "Projects", "Blog", "About Me", "Contact"]
  const allPages = [""]

  function handlePageChange(e: React.MouseEvent<HTMLLIElement>){
    const target = e.currentTarget as HTMLLIElement;
    setPageName(target.innerText);
  }



  useEffect(() => {
    
    window.addEventListener('scroll', function() {
      console.log('Scrolling...');
      // You can add more logic here if needed
  });
    
  
  }, [1])

  const currentPageIndex = pages.indexOf(pageName);

  let totalPages = pages.length
  let index = currentPageIndex;
  while (totalPages>0) {
    if (index===pages.length || index===-1 ) {
      index=0
    }
    allPages.push(pages[index])
    totalPages--;
    index++
  }
  
  // change color of header based on bg coloor
  useEffect(() => {
    const headerElem = document.querySelector(`.${stl.headerContainer}`);
    if (pageName === "Home" || pageName === "About Me" ){
      if (headerElem){
        headerElem.classList.remove(stl.blackTextColor);
        headerElem.classList.add(stl.yellowTextColor);

      }
    }
    if (pageName === "Projects" || pageName === "Contact" ){
      if (headerElem){
          headerElem.classList.remove(stl.yellowTextColor);
          headerElem.classList.add(stl.blackTextColor);
      }
    }

  }, [pageName])
  
  return (
    <div className={stl.headerContainer}>
      <ul className={stl.pageList}>
        <div>
        {allPages.map((page)=>{
          return (
          <li className={pageName===page?stl.currentPage:stl.normalPage} onClick={handlePageChange}>
            {pageName===page?`>${page}<`:`${page}`}
          </li>
          )})}

        </div>
      </ul>

    </div>
  )
}

export default Header