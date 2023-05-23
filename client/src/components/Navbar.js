import { NavLink, Link } from 'react-router-dom'
import { Searchbar } from './Searchbar';
import '../assets/Navbar.css'

import { useContext, useEffect, useState } from "react";                  
import { AuthContext } from "../context/auth.context";

function Navbar({hideSideMenu, toggleNavbar}){

  const { isLoggedIn, logoutUser } = useContext(AuthContext)

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
    {/* 👇 Mobile Sidebar */}

    <div className={`sidebar darkmode ${hideSideMenu && 'hidden'}`}>
      <button onClick={toggleNavbar} className='menu-toggle-button'>
        <svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M480 618 270 828q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522 576l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480 618Z"/></svg>
      </button>
      <NavLink to={'/'} className='icon-link'>
        <svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M220 936q-24.75 0-42.375-17.625T160 876V486q0-14.25 6.375-27T184 438l260-195q8.295-6 17.344-9 9.049-3 18.853-3 9.803 0 18.717 3 8.915 3 17.086 9l260 195q11.25 8.25 17.625 21T800 486v390q0 24.75-17.625 42.375T740 936H560V656H400v280H220Z"/></svg>
        <span>Home</span>
      </NavLink>
      {isLoggedIn && (<NavLink className='icon-link' title='My Collections' to={'/collections'}><svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M180 546q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v210q0 24-18 42t-42 18H180Zm0 390q-24 0-42-18t-18-42V666q0-24 18-42t42-18h600q24 0 42 18t18 42v210q0 24-18 42t-42 18H180Z"/></svg><span>My Collections</span></NavLink>)}
      {isLoggedIn && (<NavLink className='icon-link' title='Profile' to={'/profile'}><svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M222 801q63-40 124.5-60.5T480 720q72 0 134 20.5T739 801q44-54 62.5-109T820 576q0-145-97.5-242.5T480 236q-145 0-242.5 97.5T140 576q0 61 19 116t63 109Zm257.814-195Q422 606 382.5 566.314q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314 566.5q-39.686 39.5-97.5 39.5Zm-.219 370q-83.146 0-156.275-31.5t-127.225-86Q142 804 111 731.159 80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.5q-54 54.5-127.129 86T479.595 976Z"/></svg><span>Profile</span></NavLink>)}
      {!isLoggedIn && (<NavLink className='icon-link' title='Login' to={'/login'}><svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M489 936v-60h291V276H489v-60h291q24 0 42 18t18 42v600q0 24-18 42t-42 18H489Zm-78-185-43-43 102-102H120v-60h348L366 444l43-43 176 176-174 174Z"/></svg><span>Login</span></NavLink>)}
      {!isLoggedIn && (<NavLink className='icon-link' title='Signup' to={'/signup'}><svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M730 656V526H600v-60h130V336h60v130h130v60H790v130h-60Zm-370-81q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40 896v-94q0-35 17.5-63.5T108 696q75-33 133.5-46.5T360 636q60 0 118 13.5T611 696q33 15 51 43t18 63v94H40Z"/></svg><span>Sign up</span></NavLink>)}

      <div className='round-links-container'>
      <button onClick={toggleDarkmodeHandler} title={darkmode?'lightmode':'darkmode'} className='toggle-darkmode-button hideOnMobile'>
          {darkmode ? (<svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M479.825 286Q467 286 458.5 277.375T450 256v-90q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 166v90q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625ZM685 371q-9-9-9-21.1 0-12.1 9-20.9l63-64q9.067-9 21.533-9Q782 256 791 265q9 9 9 21t-9 21l-64 64q-9 9-21 9t-21-9Zm115 235q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T800 546h90q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890 606h-90Zm-320.175 410q-12.825 0-21.325-8.62-8.5-8.63-8.5-21.38v-90q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 896v90q0 12.75-8.675 21.38-8.676 8.62-21.5 8.62ZM233 371l-64-63q-9-8.87-9-21.435T169.391 265Q178 256 190 256q12 0 21 9l64 64q9 9 9 21t-9 21q-9.273 8-21.636 8Q241 379 233 371Zm516 516-64-64q-9-8.8-9-20.9 0-12.1 9-21.1 8.25-8 20.625-8T727 781l65 63q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q758 896 749 887ZM70 606q-12.75 0-21.375-8.675Q40 588.649 40 575.825 40 563 48.625 554.5T70 546h90q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T160 606H70Zm99 280.609Q160 878 160 866q0-12 9-21l64-64q8.25-8 20.625-8T275 781.25q9 9 9 21.375T275 824l-63 63q-8.87 9-21.435 9T169 886.609ZM480 816q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-60q75 0 127.5-52.5T660 576q0-75-52.5-127.5T480 396q-75 0-127.5 52.5T300 576q0 75 52.5 127.5T480 756Zm0-180Z"/></svg>)
          :(<svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M524 1016q-84 0-157.5-32t-128-86.5Q184 843 152 769.5T120 612q0-146 93-257.5T450 216q-18 98 11 192.635 29 94.635 100 165.736 71 71.101 165.5 100.143Q821 703.555 920 685.529q-26 144.206-138 237.338Q670 1016 524 1016Zm0-60q100 0 182-57t132-145q-90-8-173-41.5T518.5 616Q455 553 422 470.5T381 299q-88 48-144.5 130.5T180 612q0 143.333 100.333 243.667Q380.667 956 524 956Zm-6-340Z"/></svg>)}
        </button>
      </div>
      {isLoggedIn && (<button title='Logout' className="standard-button center-button" onClick={logoutUser}><svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M645 729q-9-9-9-21.75t9-21.25l80-80H405q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T405 546h318l-81-81q-8-8-8-20.447 0-12.448 9.214-21.5Q651.661 414 664.33 414q12.67 0 21.67 9l133 133q5 5 7 10.133 2 5.134 2 11Q828 583 826 588q-2 5-7 10L687 730q-8 8-20.5 8t-21.5-9ZM180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h261q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T441 276H180v600h261q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T441 936H180Z"/></svg><span>Logout</span></button>)}
    </div>
    
    {/* ☝ Mobile Sidebar */}
    {/* 👇 General Navbar */}

    <nav className='Navbar'>
      <button id='hamburger-menu-button' onClick={toggleNavbar} className='menu-toggle-button'>
          <svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M150 816q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150 756h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810 816H150Zm0-210q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150 546h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810 606H150Zm0-210q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150 336h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810 396H150Z"/></svg>
      </button>
      <div className='nav-links-container'>
        <NavLink className='logo hideOnMobile' to={'/'}>Infinite Recall</NavLink>
        {isLoggedIn && (<NavLink className='hideOnMobile' to={'/collections'}>My Collections</NavLink>)}
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
          <Link className='hideOnMobile' to='/signup'>Sign Up</Link>
          <Link className='hideOnMobile' to='/login'>Login</Link>
        </div>
      </>)}
    </nav>
  </>
  )
}
export default Navbar