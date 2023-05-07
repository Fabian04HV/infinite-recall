import { Link } from 'react-router-dom'
import '../assets/CollectionCard.css'

function CollectionCard(props){
  const {_id, title, creator, numberOfCards, createdAt} = props.collection

  return(
    <Link to={`/collection/${_id}`} className='CollectionCard'>
      <div>
        <h3>{title}</h3>
        <p className='secondary-text'>{numberOfCards} Flashcards</p>
      </div>
      <div className='info-container'>
        <p>{creator}</p>
        <p className='secondary-text'>{createdAt}</p>
      </div>
    </Link>
  )
}
export default CollectionCard