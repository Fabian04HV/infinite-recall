import { NavLink, Link } from 'react-router-dom'
import { Searchbar } from './Searchbar';
import '../assets/Navbar.css'

import { useContext, useEffect, useState } from "react";                  
import { AuthContext } from "../context/auth.context";

function Navbar({hideSideMenu, toggleNavbar}){

  const { isLoggedIn } = useContext(AuthContext)

  const [darkmode, setDarkmode] = useState(false)

  const toggleDarkmodeHandler = () => {
    const newDarkmode = !darkmode
    localStorage.setItem('darkmode', newDarkmode)
    setDarkmode(newDarkmode)
  };
  
  useEffect(() => {
    const storedDarkmode = localStorage.getItem('darkmode')
    if (storedDarkmode) {
      const parsedDarkmode = JSON.parse(storedDarkmode)
      setDarkmode(parsedDarkmode)
    }
  }, []);
  
  useEffect(() => {
    if (darkmode) {
      document.body.classList.add('darkmode')
    } else {
      document.body.classList.remove('darkmode')
    }
  }, [darkmode])

  return(
  <>
    <div className={`sidebar darkmode ${hideSideMenu && 'hidden'}`}>
      <button onClick={toggleNavbar} className='menu-toggle-button'>
      <svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M480 618 270 828q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522 576l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480 618Z"/></svg>
      </button>
      <NavLink to={'/'}>Home</NavLink>
      {isLoggedIn && (<NavLink to={'/collections'}>My Collections</NavLink>)}
      {isLoggedIn && (<NavLink title='Profile' to={'/profile'}>Profile</NavLink>)}
      <div className='round-links-container'>
        <button onClick={toggleDarkmodeHandler} className='toggle-darkmode-button hideOnMobile'>
          <svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M524 1016q-84 0-157.5-32t-128-86.5Q184 843 152 769.5T120 612q0-146 93-257.5T450 216q-18 98 11 192.635 29 94.635 100 165.736 71 71.101 165.5 100.143Q821 703.555 920 685.529q-26 144.206-138 237.338Q670 1016 524 1016Zm0-60q100 0 182-57t132-145q-90-8-173-41.5T518.5 616Q455 553 422 470.5T381 299q-88 48-144.5 130.5T180 612q0 143.333 100.333 243.667Q380.667 956 524 956Zm-6-340Z"/></svg>
        </button>
      </div>
    </div>
    <nav className='Navbar'>
      <button id='hamburger-menu-button' onClick={toggleNavbar} className='menu-toggle-button'>
          <svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M150 816q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150 756h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810 816H150Zm0-210q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150 546h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810 606H150Zm0-210q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150 336h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810 396H150Z"/></svg>
      </button>
      <div className='nav-links-container'>
        <NavLink className='logo hideOnMobile' to={'/'}>Home</NavLink>
        {isLoggedIn && (
        <>
        <NavLink className='hideOnMobile' to={'/collections'}>My Collections</NavLink>
        {/* <NavLink to={'/notes'}>My Notes</NavLink> */}
        </>
      )}
      </div>
      <Searchbar />
      <div className='round-links-container'>
        <button onClick={toggleDarkmodeHandler} title={darkmode?'lightmode':'darkmode'} className='toggle-darkmode-button hideOnMobile'>
          {darkmode ? (<svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M479.825 286Q467 286 458.5 277.375T450 256v-90q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 166v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625ZM685 371q-9-9-9-21.1 0-12.1 9-20.9l63-64q9.067-9 21.533-9Q782 256 791 265q9 9 9 21t-9 21l-64 64q-9 9-21 9t-21-9Zm115 235q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T800 546h90q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890 606h-90Zm-320.175 410q-12.825 0-21.325-8.62-8.5-8.63-8.5-21.38v-90q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 896v90q0 12.75-8.675 21.38-8.676 8.62-21.5 8.62ZM233 371l-64-63q-9-8.87-9-21.435T169.391 265Q178 256 190 256q12 0 21 9l64 64q9 9 9 21t-9 21q-9.273 8-21.636 8Q241 379 233 371Zm516 516-64-64q-9-8.8-9-20.9 0-12.1 9-21.1 8.25-8 20.625-8T727 781l65 63q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q758 896 749 887ZM70 606q-12.75 0-21.375-8.675Q40 588.649 40 575.825 40 563 48.625 554.5T70 546h90q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T160 606H70Zm99 280.609Q160 878 160 866q0-12 9-21l64-64q8.25-8 20.625-8T275 781.25q9 9 9 21.375T275 824l-63 63q-8.87 9-21.435 9T169 886.609ZM480 816q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-60q75 0 127.5-52.5T660 576q0-75-52.5-127.5T480 396q-75 0-127.5 52.5T300 576q0 75 52.5 127.5T480 756Zm0-180Z"/></svg>)
          :(<svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M524 1016q-84 0-157.5-32t-128-86.5Q184 843 152 769.5T120 612q0-146 93-257.5T450 216q-18 98 11 192.635 29 94.635 100 165.736 71 71.101 165.5 100.143Q821 703.555 920 685.529q-26 144.206-138 237.338Q670 1016 524 1016Zm0-60q100 0 182-57t132-145q-90-8-173-41.5T518.5 616Q455 553 422 470.5T381 299q-88 48-144.5 130.5T180 612q0 143.333 100.333 243.667Q380.667 956 524 956Zm-6-340Z"/></svg>)}
        </button>
        {isLoggedIn && (
        <>
        <NavLink className='create-collection-button' title='Create Collection' to={'/collection/create'}><svg fill='var(--color-2)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M540.175 678q12.825 0 21.325-8.625T570 648V546h102q12.75 0 21.375-8.675 8.625-8.676 8.625-21.5 0-12.825-8.625-21.325T672 486H570V384q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T510 384v102H408q-12.75 0-21.375 8.675-8.625 8.676-8.625 21.5 0 12.825 8.625 21.325T408 546h102v102q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625ZM260 856q-24 0-42-18t-18-42V236q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560V236H260v560ZM140 976q-24 0-42-18t-18-42V326q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T140 326v590h590q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730 976H140Zm120-740v560-560Z"/></svg></NavLink>
        <NavLink title='Profile' className='circle-button hideOnMobile' to={'/profile'}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnKB7XhauwEbA_S-MY_RKRzW_jtGmZbS1HeUpWsdAc&s' alt='Profile'/>
        </NavLink>
        </>
        )}        
      </div>  
      {!isLoggedIn && (<>
        <div className='nav-links-container'>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Login</Link>
        </div>
      </>)}
    </nav>
  </>
  )
}
export default Navbar