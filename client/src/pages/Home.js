import fetchData from '../data/collections'
import { useState, useEffect } from 'react'


function Home(){

  const [text, setText] = useState('...')

  useEffect(() => {
    fetchData().then(response => {
      console.log(response.data)
      setText(response.data)
    })
  },[])

  return(
    <section className="Home">
      <h1>Welcome Back</h1>
      <p>Database Test Message: {text}</p>
    </section>
  )
}
export default Home