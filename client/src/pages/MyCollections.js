import { useEffect, useState, useContext} from 'react'
import '../assets/Collections.css'
import CollectionCard from '../components/CollectionCard'
import { AuthContext } from '../context/auth.context'
import axios from 'axios'

const API_URL = 'http://localhost:5005'

function MyCollections({collectionsData}){

  const { user } = useContext(AuthContext)
  const token = localStorage.getItem('authToken')
  const [collections, setCollections] = useState([])//useState(collectionsData)

  useEffect(() => {
    axios.get(`${API_URL}/api/collections`, {headers: { Authorization: `Bearer ${token}`}})
      .then(response => {
        setCollections(response.data.collections)
      })
  }, [])
  
  return (
    <>
      <h1>My Collections</h1>
      <div className='collections-container'>
        {collections.map(collection => (
          <CollectionCard key={collection._id} collection={collection}/>
        ))}
      </div>
    </>
  ) 
}
export default MyCollections