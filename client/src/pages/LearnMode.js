import { useParams } from "react-router-dom"
import FocusNavbar from "../components/FocusNavbar"
import { useState, useEffect, useContext } from "react"
import { fetchCollection } from "../utils/fetchCollection"
import { Stats } from "../components/Stats"
import { getRound, shuffleArray } from "../utils/randomQuizHelpers"
import { saveAnswerInFlashcardHistory, getCollectionAnswerHistory } from '../utils/statisticHelpers'

import { TypeAnswer } from "../components/TypeAnswer"
import ChooseAnswer from "../components/ChooseAnswer"
import { ProgressBar } from "../components/ProgressBar"
import '../assets/LearnMode.css'
import { AuthContext } from "../context/auth.context"

const API_URL = process.env.REACT_APP_API_URL
const FLASHCARDS_PER_ROUND = 10

export const LearnMode = () => {
  const { isLoading, authenticateUser } = useContext(AuthContext)

  const collectionId = useParams()._id
  const [collection, setCollection] = useState(null)
  const [shuffledCards, setShuffledCards] = useState([])

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
  const [correctAnsweredFlashcards, setCorrectAnsweredFlashcards] = useState([])
  const [wrongAnsweredFlashcards, setWrongAnsweredFlashcards] = useState([])

  const [quizOver, setQuizOver] = useState(false)

  const[dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    if(!isLoading){
      fetchCollection(API_URL, collectionId)
        .then((response) => {
          setCollection(response);
          getRound(response, collectionId, FLASHCARDS_PER_ROUND).then(flashcards => {
            const shuffled = shuffleArray(flashcards)
            setShuffledCards(shuffled)
          })
        })
        .finally(()=>{
          setDataLoaded(true)
        })
    }
  }, [collectionId, isLoading]);
   
  useEffect(()=>{
    if(collection){
      if(shuffledCards.length > 0 && currentFlashcardIndex === shuffledCards.length){
        showStats()
      }
    }
  }, [isLoading, collection, currentFlashcardIndex])

  const incrementFlashcardIndexHandler = () => {
    setCurrentFlashcardIndex((currentFlashcardIndex + 1))
  }
  
  const showStats = () => {
    setQuizOver(true)
  }

  const saveAnswer = (flashcard, isCorrect, flashcardIndex) => {
    if(isCorrect){
      setCorrectAnsweredFlashcards(prevState => [...prevState, flashcard])
      saveAnswerInFlashcardHistory(collectionId, collection.flashcards.find(card => card._id === shuffledCards[flashcardIndex]._id)._id , true)
      return
    }
    setWrongAnsweredFlashcards(prevState => [...prevState, flashcard])
    saveAnswerInFlashcardHistory(collectionId, collection.flashcards.find(card => card._id === shuffledCards[flashcardIndex]._id)._id , false)
  }

  if(!dataLoaded){
    return <p>Loading ...</p>
  }
  else return(
    <> 
      <FocusNavbar title={collection.title} linkContent='Leave Quiz' linkURL='/'/>
      

      <div>
        {quizOver ? <Stats correctFlashcards={correctAnsweredFlashcards} wrongFlashcards={wrongAnsweredFlashcards} collectionId={collectionId}/> : 
        currentFlashcardIndex < shuffledCards.length?
        <div className="QuestionCard">
          {/* <ProgressBar current={currentFlashcardIndex} total={shuffledCards.length} /> */}
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