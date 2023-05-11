import { useEffect, useState} from 'react'
import '../assets/Collections.css'
import CollectionCard from '../components/CollectionCard'
import axios from 'axios'

const API_URL = 'http://localhost:5005'

function MyCollections(){
  const token = localStorage.getItem('authToken')
  const [collections, setCollections] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/api/collections`, {headers: { Authorization: `Bearer ${token}`}})
      .then(response => {
        console.log('RESPONSE DATA COLLECTIONS: ', response.data.collections)
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