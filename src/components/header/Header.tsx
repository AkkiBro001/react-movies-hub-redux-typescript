import darkLogo from "../../assets/dark-logo.png";
import lightLogo from "../../assets/light-logo.png";
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { BiMenu } from "react-icons/bi"
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import styles from "./Header.module.scss"
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../store/ThemeSlice";
import { RootState } from "../../store/Store";

function Header() {


  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [showMobileMenu, SetShowMobileMenu] = useState<boolean>(false)
  const [scroll, setScroll] = useState<boolean>(false)
  const searchRef = useRef<HTMLInputElement>(null);
  const theme = useSelector<RootState, boolean>(state => state.theme)
  const dispatch = useDispatch()

  function updateTheme() {
    if (theme) {
      document.body.setAttribute("data-theme", "dark")
    } else {
      document.body.setAttribute("data-theme", "light")
    }
  }

  updateTheme()

  useEffect(() => {

    const clearTimer = setTimeout(() => {

      searchRef.current?.focus()
    }, 200)

    return () => clearTimeout(clearTimer)
  }, [showSearch])

  function scrollEvent () {
      if(window.scrollY > 200){
        setScroll(true)
      }else{
        setScroll(false)
      }
  }

  useEffect(()=>{
      window.addEventListener('scroll', scrollEvent);

      return ()=> window.removeEventListener('scroll', scrollEvent)
  }, [scroll])

  
  return (
    <nav className={`${styles.navBar} ${scroll ? "nav-scroll" : ""}`}>
      <Link className={styles.logo} to="/">
        <img src={theme ? lightLogo : darkLogo} alt="logo" />
      </Link>

      <div className={`${styles.searchBar}`}>

        <input type="text" ref={searchRef} className={`${showSearch ? 'showSearch' : 'hideSearch'}`} />
        {showSearch ? <AiOutlineClose className={styles.closeIcon} onClick={() => setShowSearch(false)} /> :
          <AiOutlineSearch className={styles.searchIcon}
            onClick={() => { setShowSearch(true); SetShowMobileMenu(false) }}
          />}

      </div>

      <ul className={styles.links}>
        <li><Link to="./movies" className={`inactiveLink`}>Movies</Link></li>
        <li><Link to="./shows" className={`inactiveLink`}>Shows</Link></li>
      </ul>
      <div className={styles.theme} style={{ margin: "0 0.75em" }}>
        {theme ? <BsFillSunFill className={styles.sunIcon} onClick={() => dispatch(setTheme(false))} /> :
          <BsFillMoonFill className={styles.moonIcon} onClick={() => dispatch(setTheme(true))} />}
      </div>

      <div className={styles.menu}>

        {!showMobileMenu ? <BiMenu className={styles.menuIcon} onClick={() => { SetShowMobileMenu(true); setShowSearch(false) }} />
          : <AiOutlineClose onClick={() => { SetShowMobileMenu(false) }} />}
      </div>




      <ul className={`${styles.mobileLinks} ${showMobileMenu ? 'showMobileMenu' : 'hideMobileMenu'}`}>
        <li><Link to="./movies" className="inactiveLink">Movies</Link></li>
        <li><Link to="./shows" className="inactiveLink">Shows</Link></li>
        <li className={styles.theme}>{theme ? <BsFillSunFill className={styles.sunIcon} onClick={() => dispatch(setTheme(false))} />:
          <BsFillMoonFill className={styles.moonIcon} onClick={() => dispatch(setTheme(true))} />}</li>
      </ul>

    </nav>
  )
}

export default Header