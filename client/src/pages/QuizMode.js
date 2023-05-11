import { useParams } from "react-router-dom"
import FocusNavbar from "../components/FocusNavbar"
import QuestionCard from "../components/QuestionCard"
import { useState, useContext } from "react"
import { CollectionContext } from '../context/collection.context'


function QuizMode(){
  // const collectionId = useParams()._id
  // const collection = collectionsData.find(collection => collection._id === parseInt(collectionId))
  const { currentCollection } = useContext(CollectionContext)
  const collection = currentCollection
  
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)

  const incrementFlashcardIndexHandler = () => {
    setCurrentFlashcardIndex((currentFlashcardIndex + 1) % collection.flashcards.length)
  }
  const decrementFlashcardIndexHandler = () => {
    setCurrentFlashcardIndex(currentFlashcardIndex > 0 ? currentFlashcardIndex - 1 : collection.flashcards.length -1)
  }

  return(
    <> 
      <FocusNavbar title={collection.title}/>
      <div>
        <QuestionCard 
          collection={collection} 
          flashcard={collection.flashcards[currentFlashcardIndex]} 
          currentFlashcardIndex={currentFlashcardIndex} 
          incrementFlashcardIndex={incrementFlashcardIndexHandler} 
          decrementFlashcardIndex={decrementFlashcardIndexHandler}
        />
      </div>
    </>
  )
}
export default QuizMode