import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { useNavigate } from "react-router-dom"

function ProtectedRoute(props){
  const { isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  return(
    <>
      {isLoggedIn ? props.children : navigate('/login')}
    </>
  )
}
export default ProtectedRoute