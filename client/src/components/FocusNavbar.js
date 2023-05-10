import { Link } from "react-router-dom"

function FocusNavbar({title}){
  return(
    <nav className="Navbar">
      <Link to="/collections" className="standard-button">
      <svg fill="var(--text-color)" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M627 948 276 597q-5-5-7-10t-2-11q0-6 2-11t7-10l351-351q11-11 28-11t28 11q12 12 12 28.5T683 261L368 576l315 315q13 13 12 29t-12 27q-12 12-28.5 12T627 948Z"/></svg>
        <span>Leave Quiz</span>
      </Link>
      <h2>{title}</h2>
    </nav>
  )
}
export default FocusNavbar