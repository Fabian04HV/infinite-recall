import { NavLink, Link } from 'react-router-dom'
import InputBox from './InputBox'
import { Searchbar } from './Searchbar';
import '../assets/Navbar.css'

import { useContext, useState } from "react";                  
import { AuthContext } from "../context/auth.context";

function Navbar({hideSideMenu, toggleNavbar}){

  const {isLoggedIn, user, logoutUser} = useContext(AuthContext)

  return(
  <>
    <div className={`sidebar ${hideSideMenu && 'hidden'}`}>
      <button onClick={toggleNavbar} className='menu-toggle-button'>
      <svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M480 618 270 828q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522 576l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480 618Z"/></svg>
      </button>
      <NavLink to={'/'}>Home</NavLink>
      {isLoggedIn && (<NavLink to={'/collections'}>My Collections</NavLink>)}
      {isLoggedIn && (<NavLink title='Profile' to={'/profile'}>Profile</NavLink>)}
    </div>
    <nav className='Navbar'>
      <button onClick={toggleNavbar} className='menu-toggle-button'>
          <svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M150 816q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150 756h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810 816H150Zm0-210q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150 546h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810 606H150Zm0-210q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T150 336h660q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T810 396H150Z"/></svg>
      </button>
      <div className='nav-links-container'>
        <NavLink className='logo hideOnMobile' to={'/'}>Infinite Recall</NavLink>
        {isLoggedIn && (
        <>
        <NavLink className='hideOnMobile' to={'/collections'}>My Collections</NavLink>
        {/* <NavLink to={'/notes'}>My Notes</NavLink> */}
        </>
      )}
      </div>
      <Searchbar />
      <div className='round-links-container'>
        {isLoggedIn && (
        <>
        <NavLink className='create-collection-button' title='Create Collection' to={'/collection/create'}><svg fill='var(--color-2)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M540.175 678q12.825 0 21.325-8.625T570 648V546h102q12.75 0 21.375-8.675 8.625-8.676 8.625-21.5 0-12.825-8.625-21.325T672 486H570V384q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T510 384v102H408q-12.75 0-21.375 8.675-8.625 8.676-8.625 21.5 0 12.825 8.625 21.325T408 546h102v102q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625ZM260 856q-24 0-42-18t-18-42V236q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560V236H260v560ZM140 976q-24 0-42-18t-18-42V326q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T140 326v590h590q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730 976H140Zm120-740v560-560Z"/></svg></NavLink>
        <NavLink title='Profile' className='circle-button hideOnMobile' to={'/profile'}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnKB7XhauwEbA_S-MY_RKRzW_jtGmZbS1HeUpWsdAc&s' alt='Profile'/>
        </NavLink>
        </>
        )}
        {!isLoggedIn && (
        <>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/login'>Login</Link>
        </>
        )}
        
      </div>  
    </nav>
  </>
  )
}
export default Navbar