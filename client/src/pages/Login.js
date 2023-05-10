import { useState, useContext } from "react"
import InputBox from "../components/InputBox"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

const API_URL = 'http://localhost:5005'

function Login(){
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [errorMessage, setErrorMessage] = useState(undefined)

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleUsernameInput = (e) => setUsername(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    const requestBody = { username, password }

    axios.post(`${API_URL}/auth/login`, requestBody)
      .then(response => {
        console.log('JWT token', response.data.authToken );

        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  }

  return(
    <div className="centered-container">
      <h1>Login</h1>
      <form className="flex-column-center" onSubmit={handleLoginSubmit}>
        <InputBox 
          type='text'
          name='username'
          placeholder='Username'
          onChangeHandler={handleUsernameInput}
          value={username}
        />
        <InputBox 
          type='password'
          name='password'
          placeholder='Password'
          onChangeHandler={handlePasswordInput}
          value={password}
        />
        <button className="accent-button" type="submit">Login</button>
        {/* {type, name, placeholder, onChangeHandler, onFocus, value} */}
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="flex-column-center">
        <p>Don't have an account yet?</p>
        <Link to={'/signup'}>Sign up</Link>
      </div>
      
    </div>
  )
}
export default Login