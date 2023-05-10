import { Link, useNavigate } from "react-router-dom"
import InputBox from "../components/InputBox"
import { useState } from "react"
import axios from 'axios'

const API_URL = "http://localhost:5005"

function Signup(){

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const emailInputHandler = (e) => setEmail(e.target.value)
  const usernameInputHandler = (e) => setUsername(e.target.value)
  const passwordInputHandler = (e) => setPassword(e.target.value)

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    const requestBody = { email, username, password }

    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login')
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  return(
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSignupSubmit}>
        <InputBox 
          type='text'
          name='username'
          placeholder='Username'
          onChangeHandler={usernameInputHandler}
          value={username}
        />
        <InputBox 
          type='email'
          name='email'
          placeholder='Email'
          onChangeHandler={emailInputHandler}
          value={email}
        />
        <InputBox 
          type='password'
          name='password'
          placeholder='Password'
          onChangeHandler={passwordInputHandler}
          value={password}
        />
        <button type="submit" className="accent-button">Sign up</button>
        {/* {type, name, placeholder, onChangeHandler, onFocus, value} */}
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Already have an account?</p>
      <Link to={'/login'}>Login</Link>
    </>
  )
}
export default Signup