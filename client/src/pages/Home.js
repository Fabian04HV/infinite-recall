import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Link } from 'react-router-dom'

function Home(){
  const { isLoggedIn, user } = useContext(AuthContext)

  const [text, setText] = useState('loading ...')

  useEffect(() => {
    setText()
  },[])

  return(
    <section className="Home">
      {isLoggedIn && (
        <>
          <h1>Welcome Back {user.username}</h1>
        </>
      )}
      {!isLoggedIn && (
        <>
          <h1>Infinite Recall</h1>
          <p>The only learning App you need!</p>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Login</Link>
        </>
      )}
    </section>
  )
}
export default Home