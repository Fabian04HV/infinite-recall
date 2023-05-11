import { useEffect, useState, useContext} from 'react'
import '../assets/Collections.css'
import CollectionCard from '../components/CollectionCard'
import { AuthContext } from '../context/auth.context'
import { CollectionContext } from '../context/collection.context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:5005'

function MyCollections(){

  const { user } = useContext(AuthContext)
  const token = localStorage.getItem('authToken')

  const navigate = useNavigate()

  const { currentCollection, setCurrentCollection } = useContext(CollectionContext)

  const [collections, setCollections] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/api/collections`, {headers: { Authorization: `Bearer ${token}`}})
      .then(response => {
        setCollections(response.data.collections)
      })
  }, [])
  
  const handleCollectionClick = (collection) => { 
    console.log('SET CURRENT COLLECTION: ', currentCollection)
    setCurrentCollection(collection)
    navigate(`/practice/${collection._id}`)
  }
  return (
    <>
      <h1>My Collections</h1>
      <div className='collections-container'>
        {collections.map(collection => (
          <CollectionCard key={collection._id} collection={collection} selectCollection={() => { console.log('Onclick'); handleCollectionClick(collection)} }/>
        ))}
      </div>
    </>
  ) 
}
export default MyCollections