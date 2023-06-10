import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem('redirectPath', location.pathname)
      navigate("/login");
    }
  }, [isLoggedIn, navigate, location])

  return <>{isLoggedIn ? props.children : null}</>
}

export default ProtectedRoute;