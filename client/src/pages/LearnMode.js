import { useParams } from "react-router-dom"
import FocusNavbar from "../components/FocusNavbar"
import { useState, useEffect } from "react"
import { fetchCollection } from "../utils/fetchCollection"
import { Stats } from "../components/Stats"
import { shuffleArray } from "../utils/randomQuizHelpers"
import { TypeAnswer } from "../components/TypeAnswer"
import ChooseAnswer from "../components/ChooseAnswer"

const API_URL = process.env.REACT_APP_API_URL

export const LearnMode = () => {
  const collectionId = useParams()._id
  const [collection, setCollection] = useState(null)
  const [shuffledCards, setShuffledCards] = useState([])

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
  const [correctAnsweredFlashcards, setCorrectAnsweredFlashcards] = useState([])
  const [wrongAnsweredFlashcards, setWrongAnsweredFlashcards] = useState([])

  const [quizOver, setQuizOver] = useState(false)

  const[loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchCollection(API_URL, collectionId)
    .then((response) => {
      setCollection(response)
      let flashcards = response.flashcards
      setShuffledCards(shuffleArray(flashcards))
    })
  }, [collectionId])

  useEffect(() => {
    if(shuffledCards.length > 0){
      console.log('SHUFFLED CARDS: ', shuffledCards)
      setLoading(false)
    }
  }, [shuffledCards])
   
  useEffect(()=>{
    if(collection){
      if(currentFlashcardIndex === collection.flashcards.length){
        showStats()
      }
    }
  }, [collection, currentFlashcardIndex])

  const incrementFlashcardIndexHandler = () => {
    setCurrentFlashcardIndex((currentFlashcardIndex + 1))
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

  if(loading){
    return <p>Loading ...</p>
  }
  else return(
    <> 
      <FocusNavbar title={collection.title} linkContent='Leave Quiz' linkURL='/'/>
      <div>
        {quizOver ? <Stats correctFlashcards={correctAnsweredFlashcards} wrongFlashcards={wrongAnsweredFlashcards} collectionId={collectionId}/> : 
        currentFlashcardIndex < collection.flashcards.length?
        <div className="QuestionCard">
          {/* TODO: Random implementation of which question type to choose */}
          {currentFlashcardIndex % 2 === 0 ? 
            <ChooseAnswer 
            shuffledFlashcards={shuffledCards} 
            flashcard={shuffledCards[currentFlashcardIndex]} 
            currentFlashcardIndex={currentFlashcardIndex} 
            incrementFlashcardIndex={incrementFlashcardIndexHandler} 
            saveAnswer={saveAnswer}
            />
            :
            <TypeAnswer
              shuffledFlashcards={shuffledCards}
              currentFlashcardIndex={currentFlashcardIndex}
              incrementFlashcardIndex={incrementFlashcardIndexHandler}
              saveAnswer={saveAnswer}
            />
          }
        </div>
        
        : <></>
        }
        
      </div>
    </>
  )
}