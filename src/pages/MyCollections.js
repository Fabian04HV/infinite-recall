import { useEffect, useState } from 'react'
import '../assets/Collections.css'
import CollectionCard from '../components/CollectionCard'
import collectionsData from '../data/collections'

function MyCollections(){

  const [collections, setCollections] = useState(collectionsData)

  return (
    <>
      <h1>My Collections</h1>


      <div className='collections-container'>
        {collections.map(collection => (
          <CollectionCard collection={collection}/>
        ))}
      </div>
    </>
  ) 
}
export default MyCollections