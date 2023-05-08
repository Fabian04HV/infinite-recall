import { NavLink, Link } from 'react-router-dom'
import InputBox from './InputBox'
import '../assets/Navbar.css'

function Navbar(){
  return(
    <nav className='Navbar'>
      <div className='nav-links-container'>
        <NavLink className='logo' to={'/'}>Infinite Recall</NavLink>
        <NavLink to={'/collections'}>My Flashcard Collections</NavLink>
        <NavLink to={'/notes'}>My Notes</NavLink>
      </div>
      <NavLink className='profile-link' to={'/profile'}>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnKB7XhauwEbA_S-MY_RKRzW_jtGmZbS1HeUpWsdAc&s' alt='Profile'/>
        <span>Fabian04HV</span>
      </NavLink>
    </nav>
  )
}
export default Navbar