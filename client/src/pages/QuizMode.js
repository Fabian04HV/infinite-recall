import { useParams } from "react-router-dom"
import FocusNavbar from "../components/FocusNavbar"
import QuestionCard from "../components/QuestionCard"
import { useState, useEffect } from "react"
import { fetchCollection } from "../utils/fetchCollection"
import { Stats } from "../components/Stats"

const API_URL = process.env.REACT_APP_API_URL

function QuizMode(){
  const collectionId = useParams()._id
  const [collection, setCollection] = useState(null)

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
  const [correctAnsweredFlashcards, setCorrectAnsweredFlashcards] = useState([])
  const [wrongAnsweredFlashcards, setWrongAnsweredFlashcards] = useState([])

  const [quizOver, setQuizOver] = useState(false)

  useEffect(() => {
    fetchCollection(API_URL, collectionId)
    .then((response) => {
      setCollection(response)
    })
  }, [collectionId])
   
  useEffect(()=>{
    if(collection){
      if(currentFlashcardIndex === collection.flashcards.length-1){
        showStats()
      }
    }
  }, [correctAnsweredFlashcards, wrongAnsweredFlashcards])

  const incrementFlashcardIndexHandler = () => {
    setCurrentFlashcardIndex((currentFlashcardIndex + 1) % collection.flashcards.length)
  }
  
  const showStats = () => {
    setQuizOver(true)
  }

  const saveAnswer = (flashcard, isCorrect) => {
    if(correctAnsweredFlashcards.includes(flashcard) || wrongAnsweredFlashcards.includes(flashcard)) return; //prevent saving the same card multiple times when spaming the answer button
    if(isCorrect){
      setCorrectAnsweredFlashcards(prevState => [...prevState, flashcard])
      return
    }
    setWrongAnsweredFlashcards(prevState => [...prevState, flashcard])
  }

  if(!collection){
    return <p>Loading ...</p>
  }
  return(
    <> 
      <FocusNavbar title={collection.title}/>
      <div>
        {quizOver ? <Stats correctFlashcards={correctAnsweredFlashcards} wrongFlashcards={wrongAnsweredFlashcards} collectionId={collectionId}/> : 
        <QuestionCard 
          collection={collection} 
          flashcard={collection.flashcards[currentFlashcardIndex]} 
          currentFlashcardIndex={currentFlashcardIndex} 
          incrementFlashcardIndex={incrementFlashcardIndexHandler} 
          saveAnswer={saveAnswer}
        />
        }
        
      </div>
    </>
  )
}
export default QuizMode