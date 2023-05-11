import { useParams } from "react-router-dom"
import FocusNavbar from "../components/FocusNavbar"
import QuestionCard from "../components/QuestionCard"
import { useState, useEffect } from "react"
import { fetchCollection } from "../utils/fetchCollection"

const API_URL = 'http://localhost:5005'

function QuizMode(){
  const collectionId = useParams()._id
  const [collection, setCollection] = useState(null)

  useEffect(() => {
    fetchCollection(API_URL, collectionId)
    .then((response) => {
      setCollection(response)
      console.log(response)
    })
  }, [])

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)

  const incrementFlashcardIndexHandler = () => {
    setCurrentFlashcardIndex((currentFlashcardIndex + 1) % collection.flashcards.length)
  }
  const decrementFlashcardIndexHandler = () => {
    setCurrentFlashcardIndex(currentFlashcardIndex > 0 ? currentFlashcardIndex - 1 : collection.flashcards.length -1)
  }
  if(!collection){
    return <p>Loading ...</p>
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