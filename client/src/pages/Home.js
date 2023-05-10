import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

function Home(){
  const { isLoggedIn, user } = useContext(AuthContext)

  const [text, setText] = useState('loading ...')

  useEffect(() => {
    setText()
  },[])

  return(
    <section className="Home">
      <h1>Welcome Back,
        {isLoggedIn ? ` ${user.username}` : ' Stranger'}
      </h1>
    </section>
  )
}
export default Home