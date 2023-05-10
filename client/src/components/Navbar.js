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
            <NavLink to={'/collection/create'}>Create Collection</NavLink>
            <NavLink to={'/notes'}>My Notes</NavLink>
          </>
        )}
      </div>
      {isLoggedIn && (
        <>
          <NavLink className='profile-link' to={'/profile'}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnKB7XhauwEbA_S-MY_RKRzW_jtGmZbS1HeUpWsdAc&s' alt='Profile'/>
            <span>{user.username}</span>
          </NavLink>
          <button onClick={logoutUser}>Logout</button>
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