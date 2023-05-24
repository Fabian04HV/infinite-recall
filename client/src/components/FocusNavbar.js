import { Link } from "react-router-dom"

function FocusNavbar({title, linkContent, linkURL}){
  const handleClick = (e) => {
    const answer = window.confirm('If you leave, it will not be saved.')
    if(!answer){
      e.preventDefault()
    }
  }
  return(
    <nav className="Navbar FocusNavbar">
      <h2>{title}</h2>
      <Link to={linkURL} className="bordered-icon-button" title={linkContent} onClick={handleClick}>
        <svg fill="var(--text-color)" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M480 618 270 828q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522 576l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480 618Z"/></svg>
      </Link>
    </nav>
  )
}
export default FocusNavbar