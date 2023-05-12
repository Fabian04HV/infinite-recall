import { useContext } from "react";                  
import { AuthContext } from "../context/auth.context";

function Profile(){
  const { user, logoutUser } = useContext(AuthContext)

  return(
    <>
      <h1>My Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <button className="standard-button" onClick={logoutUser}>Logout</button>
    </>
  )
}
export default Profile