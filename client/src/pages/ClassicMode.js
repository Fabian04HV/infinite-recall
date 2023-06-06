import { Link, useParams, useNavigate } from 'react-router-dom'
import Flashcard from '../components/Flashcard'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { fetchCollection } from '../utils/fetchCollection'
import { saveAnswerInFlashcardHistory } from '../utils/statisticHelpers'
import FocusNavbar from '../components/FocusNavbar'
import '../assets/ClassicMode.css'

const API_URL = process.env.REACT_APP_API_URL

export const ClassicMode = () => {
  const collectionId = useParams()._id
  const [collection, setCollection] = useState(null)

  useEffect(() => {
    fetchCollection(API_URL, collectionId)
    .then((response) => {
      setCollection(response)
    })
  }, [collectionId])

  const [rightAnim, setRightAnim] = useState(true) 
  const [leftAnim, setLeftAnim] = useState(false)
  
  function animationHandler(){
    setRightAnim(false)
    setLeftAnim(false)
  }

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)

  const incrementFlashcardIndexHandler = () => {
    setCurrentFlashcardIndex((currentFlashcardIndex + 1) % collection.flashcards.length)
    setRightAnim(true)
  }

  const positiveAnswer = () => {
    incrementFlashcardIndexHandler()
    // Save answers in answer history: collectionId, flashcardId, true || false
    saveAnswerInFlashcardHistory(collectionId, collection.flashcards[currentFlashcardIndex]._id, true)

  }

  const negativeAnswer = () => {
    incrementFlashcardIndexHandler()
    saveAnswerInFlashcardHistory(collectionId, collection.flashcards[currentFlashcardIndex]._id, false)
  }

  if(!collection){
    return <p>Loading ...</p>
  }

  return (
    <div className='ClassicMode'>
      <FocusNavbar title={collection.title} linkContent='Home' linkURL='/'/>

      <Flashcard rightAnim={rightAnim} leftAnim={leftAnim} animationHandler={animationHandler} flashcard={collection.flashcards[currentFlashcardIndex]}/>
      <div className='controls-container'>
        <button onClick={() => negativeAnswer()} className='standard-button'>I don't know</button>
        <button onClick={() => positiveAnswer()} className='standard-button'>I know this one</button>
      </div>
    </div>
  )
}