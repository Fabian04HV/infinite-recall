import { Link, useParams, useNavigate } from 'react-router-dom'
import Flashcard from '../components/Flashcard'
import { Stats } from '../components/Stats'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { fetchCollection } from '../utils/fetchCollection'
import { saveAnswerInFlashcardHistory } from '../utils/statisticHelpers'
import { getRound, shuffleArray } from '../utils/randomQuizHelpers'
import FocusNavbar from '../components/FocusNavbar'
import '../assets/ClassicMode.css'

const API_URL = process.env.REACT_APP_API_URL
const FLASHCARDS_PER_ROUND = 10

export const ClassicMode = () => {
  const collectionId = useParams()._id
  const [collection, setCollection] = useState(null)

  const [shuffledCards, setShuffledCards] = useState([])
  const [quizOver, setQuizOver] = useState(false)
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)

  const [correctAnsweredFlashcards, setCorrectAnsweredFlashcards] = useState([])
  const [wrongAnsweredFlashcards, setWrongAnsweredFlashcards] = useState([])


  useEffect(() => {
    fetchCollection(API_URL, collectionId)
    .then((response) => {
      setCollection(response)
      getRound(response, collectionId, FLASHCARDS_PER_ROUND).then(flashcards => {
        const shuffled = shuffleArray(flashcards)
        setShuffledCards(shuffled)
        console.log(shuffled)
      })
    })
  }, [collectionId])

  useEffect(()=>{
    if(collection){
      if(shuffledCards.length > 0 && currentFlashcardIndex === shuffledCards.length){
        showStats()
      }
    }
  }, [collection, currentFlashcardIndex])

  const showStats = () => {
    setQuizOver(true)
  }

  const [rightAnim, setRightAnim] = useState(true) 
  const [leftAnim, setLeftAnim] = useState(false)
  
  function animationHandler(){
    setRightAnim(false)
    setLeftAnim(false)
  }

  const incrementFlashcardIndexHandler = () => {
    if (currentFlashcardIndex === shuffledCards.length - 1) {
      showStats();
    } else {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
    }
    setRightAnim(true);
    console.log('SHUFFLED:', shuffledCards, 'CURRENT:', currentFlashcardIndex);
  };

  const positiveAnswer = () => {
    // Save answers in answer history: collectionId, flashcardId, true || false
    saveAnswerInFlashcardHistory(collectionId, shuffledCards[currentFlashcardIndex]._id, true)
    setCorrectAnsweredFlashcards(prev => [...prev, shuffledCards[currentFlashcardIndex]])
    setTimeout(() => incrementFlashcardIndexHandler(), 100) 
    // TODO: Animation
  }

  const negativeAnswer = () => {
    saveAnswerInFlashcardHistory(collectionId, shuffledCards[currentFlashcardIndex]._id, false)
    setWrongAnsweredFlashcards(prev => [...prev, shuffledCards[currentFlashcardIndex]])
    setTimeout(() => incrementFlashcardIndexHandler(), 100) 
  }

  if(shuffledCards.length === 0){
    return <p>Loading ...</p>
  }

  return (
    <div className='ClassicMode'>
      <FocusNavbar title={collection.title} linkContent='Home' linkURL='/'/>

      {quizOver ? <Stats correctFlashcards={correctAnsweredFlashcards} wrongFlashcards={wrongAnsweredFlashcards} collectionId={collectionId}/> : <>

      <Flashcard rightAnim={rightAnim} leftAnim={leftAnim} animationHandler={animationHandler} flashcard={shuffledCards[currentFlashcardIndex]}/>
      <div className='controls-container'>
        <button onClick={() => negativeAnswer()} className='standard-button'>I don't know</button>
        <button onClick={() => positiveAnswer()} className='standard-button'>I know this one</button>
      </div></>}
    </div>
  )
}