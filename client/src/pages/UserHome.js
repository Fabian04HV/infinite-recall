import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { Link } from "react-router-dom"
import { fetchCollectionLastQuiz } from "../utils/fetchCollection"
import CollectionCard from "../components/CollectionCard"
import '../assets/UserHome.css'
import { Loading } from "../components/Loading"

const API_URL = process.env.REACT_APP_API_URL

export const UserHome = () => {
  
  const { user } = useContext(AuthContext)

  const [lastQuiz, setLastQuiz] = useState(null)

  useEffect(() => {
    fetchCollectionLastQuiz(API_URL)
    .then((collection) => {
      setLastQuiz(collection)
    })
  }, [])

  return(
    <div className="UserHome">

      <h1>Hello {user.username}</h1>

      <Link to='/collection/create' className="standard-button">
      <svg fill="var(--accent-color)" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M540.175 678q12.825 0 21.325-8.625T570 648V546h102q12.75 0 21.375-8.675 8.625-8.676 8.625-21.5 0-12.825-8.625-21.325T672 486H570V384q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T510 384v102H408q-12.75 0-21.375 8.675-8.625 8.676-8.625 21.5 0 12.825 8.625 21.325T408 546h102v102q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625ZM260 856q-24 0-42-18t-18-42V236q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560V236H260v560ZM140 976q-24 0-42-18t-18-42V326q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T140 326v590h590q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730 976H140Zm120-740v560-560Z"/></svg>
        Create New Collection
      </Link>
      <Link to='/collections' className="standard-button">
        <svg fill="var(--accent-color)" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M180 546q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v210q0 24-18 42t-42 18H180Zm0 390q-24 0-42-18t-18-42V666q0-24 18-42t42-18h600q24 0 42 18t18 42v210q0 24-18 42t-42 18H180Z"/></svg>
        My Collections
      </Link>      
      <h2>Last Learn Session:</h2>
      <div className="collections-container">
        {lastQuiz && <CollectionCard collection={lastQuiz}/>}
      </div>
    </div>
  )
}