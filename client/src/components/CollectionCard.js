import { Link } from 'react-router-dom'
import '../assets/CollectionCard.css'
import { deleteCollection } from '../utils/deleteCollection'

function CollectionCard(props){
  const {_id, title, creator, flashcards, createdAt} = props.collection
  const numberOfCards = flashcards.length
  return(
    <Link to={`/practice/${_id}`} className='CollectionCard'>
      <div>
        <h3>{title}</h3>
        <p className='secondary-text'>{numberOfCards} Flashcards</p>
      </div>
      <div className='info-container'>
        <p>{creator}</p>
        <p className='secondary-text'>{createdAt.split('T')[0]}</p>
      </div>
    </Link>
  )
}
export default CollectionCard