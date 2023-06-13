import { useContext, useEffect, useState } from "react";                  
import { AuthContext } from "../context/auth.context";
import '../assets/Profile.css'
import axios from "axios";
import { Loading } from "../components/Loading";
const API_URL = process.env.REACT_APP_API_URL

function Profile(){
  const { user, logoutUser } = useContext(AuthContext)
  const token = localStorage.getItem('authToken')

  const [ userInfo, setUserInfo ] = useState(null)
  const [ dataLoaded, setDataLoaded ] = useState(false)

  useEffect(() => {
    axios.get(`${API_URL}/api/user/${user._id}`, {headers: { Authorization: `Bearer ${token}`}})
    .then(response => {
      setUserInfo(response.data.userInfo)
    })
    .finally(() => {
      setDataLoaded(true)
    })
  }, [user._id, token])

  if(!dataLoaded){
    return <Loading />
  }
  else return(
    <div className="Profile">
      <div className="profile-container container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnKB7XhauwEbA_S-MY_RKRzW_jtGmZbS1HeUpWsdAc&s" alt="Profile Picture"/>
        <div>
          <h2>{userInfo.username}</h2>
          <p className="secondary-text">{userInfo.email}</p>
          <p className="secondary-text">Joined: <span>{userInfo.createdAt.split('T')[0]}</span> </p>
        </div>
        <div className="options-container">
          {/* <button className="standard-button light">Edit Profile</button> */}
          <button className="standard-button light" onClick={logoutUser}>Logout</button>
        </div>
      </div>
    </div>
  )
}
export default Profile