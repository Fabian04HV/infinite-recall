import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

export const UserHome = () => {
  
  const { user } = useContext(AuthContext)

  return(
    <>
      <h1>Hello {user.username}</h1>
      <h2>Recent:</h2>
      
    </>
  )
}