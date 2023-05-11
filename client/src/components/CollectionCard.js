import { Link } from 'react-router-dom'
import '../assets/CollectionCard.css'

function CollectionCard(props){
  const {_id, title, creator, flashcards, createdAt} = props.collection
  const { selectCollection } = props
  const numberOfCards = flashcards.length

  return(
    <div className='CollectionCard' onClick={() => selectCollection(props.collection)}>
      <div>
        <h3>{title}</h3>
        <p className='secondary-text'>{numberOfCards} Flashcards</p>
      </div>
      <div className='info-container'>
        <p>{creator}</p>
        <p className='secondary-text'>{createdAt}</p>
      </div>
    </div>
  )
}
export default CollectionCard