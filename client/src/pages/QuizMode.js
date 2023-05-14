import { useParams } from "react-router-dom"
import FocusNavbar from "../components/FocusNavbar"
import QuestionCard from "../components/QuestionCard"
import { useState, useEffect } from "react"
import { fetchCollection } from "../utils/fetchCollection"
import { Stats } from "../components/Stats"

const API_URL = 'http://localhost:5005'

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
      console.log(response)
    })
  }, [])
   
  useEffect(()=>{
    if(collection){
      if(currentFlashcardIndex === collection.flashcards.length-1){
        showStats()
        saveStats()
      }
    }
  }, [correctAnsweredFlashcards, wrongAnsweredFlashcards])

  const incrementFlashcardIndexHandler = () => {
    setCurrentFlashcardIndex((currentFlashcardIndex + 1) % collection.flashcards.length)
  }
  
  const showStats = () => {
    console.log(`Statistics | Correct: ${correctAnsweredFlashcards.length}, Wrong: ${wrongAnsweredFlashcards.length}`)
    setQuizOver(true)
  }

  const saveStats = () => {
    //axios.put //update user.learnSessions
  }

  const saveAnswer = (flashcard, isCorrect) => {
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
        {quizOver ? <Stats correctFlashcards={correctAnsweredFlashcards} wrongFlashcards={wrongAnsweredFlashcards} /> : 
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