import { NavLink, Link } from 'react-router-dom'
import InputBox from './InputBox'
import '../assets/Navbar.css'

import { useContext } from "react";                  
import { AuthContext } from "../context/auth.context";

function Navbar(){

  const {isLoggedIn, user, logoutUser} = useContext(AuthContext)

  return(
    <nav className='Navbar'>
      <div className='nav-links-container'>
        <NavLink className='logo' to={'/'}>Infinite Recall</NavLink>
        {isLoggedIn && (
          <>
            <NavLink to={'/collections'}>My Flashcard Collections</NavLink>
            <NavLink to={'/notes'}>My Notes</NavLink>
          </>
        )}
      </div>
      <div className='search-bar'>
        <label htmlFor='search-input'>
        <svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M774 913 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l243 241q9 8.442 9 20.721t-9.913 22.192Q809 922 795.778 922q-13.222 0-21.778-9ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z"/></svg>
        </label>
        <input type='text' id='search-input' className='search-input' placeholder='Search Flashcard Collections about anything!'/>
      </div>

      {isLoggedIn && (
        <>
          <NavLink to={'/collection/create'} className='standard-button'><svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M540.175 678q12.825 0 21.325-8.625T570 648V546h102q12.75 0 21.375-8.675 8.625-8.676 8.625-21.5 0-12.825-8.625-21.325T672 486H570V384q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T510 384v102H408q-12.75 0-21.375 8.675-8.625 8.676-8.625 21.5 0 12.825 8.625 21.325T408 546h102v102q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625ZM260 856q-24 0-42-18t-18-42V236q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560V236H260v560ZM140 976q-24 0-42-18t-18-42V326q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T140 326v590h590q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730 976H140Zm120-740v560-560Z"/></svg>Collection</NavLink>
          <NavLink className='profile-link' to={'/profile'}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnKB7XhauwEbA_S-MY_RKRzW_jtGmZbS1HeUpWsdAc&s' alt='Profile'/>
            <span>{user.username}</span>
          </NavLink>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Login</Link>
        </>
      )}
      
    </nav>
  )
}
export default Navbar