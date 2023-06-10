import { useState, useContext, useEffect } from "react";
import InputBox from "../components/InputBox";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, storeToken, authenticateUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    if (isLoggedIn) {
      const redirectPath = localStorage.getItem("redirectPath");
      if (redirectPath) {
        localStorage.removeItem("redirectPath");
        navigate(redirectPath);
      } else {
        navigate("/");
      }
    }
  }, [isLoggedIn, navigate]);

  const handleUsernameInput = (e) => setUsername(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { username, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="centered-container">
      <h1>Login</h1>
      <form className="flex-column-center" onSubmit={handleLoginSubmit}>
        <InputBox
          type="text"
          name="username"
          placeholder="Username"
          onChangeHandler={handleUsernameInput}
          value={username}
        />
        <InputBox
          type="password"
          name="password"
          placeholder="Password"
          onChangeHandler={handlePasswordInput}
          value={password}
        />
        <button className="accent-button" type="submit">
          Login
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="flex-column-center">
        <p>Don't have an account yet?</p>
        <Link to={"/signup"}>Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
