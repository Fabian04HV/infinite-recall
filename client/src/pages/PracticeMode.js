import { Link, useParams } from 'react-router-dom'
import '../assets/Collection.css'
import Flashcard from '../components/Flashcard'
import { useState } from 'react'

function PracticeMode({collectionsData}){

  const collectionId = useParams()._id
  const collection = collectionsData.find(collection => collection._id === parseInt(collectionId))
  
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
  const decrementFlashcardIndexHandler = () => {
    setCurrentFlashcardIndex(currentFlashcardIndex > 0 ? currentFlashcardIndex - 1 : collection.flashcards.length -1)
    setLeftAnim(true)
  }

  return(
    <>
      <h1>{collection.title}</h1>
      <div className="PracticePage">
        <div className='flex-row-between'>
          <Link to={`/quiz/${collectionId}`} className="standard-button">
          <svg fill="var(--accent-color)" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="m446 638 2 30q.736 6.222 4.785 10.111 4.048 3.889 9.937 3.889h32.389q5.889 0 10.014-3.889Q509.25 674.222 510 668l2-30q12-2 22.472-8.462Q544.944 623.077 553 615l30 10q5 2 10 0t7.8-6.846l15.4-26.308Q619 587 618.5 582t-5.188-9.167L593 557q5-14 5-29t-5-29l20.312-15.833Q618 479 618.5 474t-2.3-9.846l-15.4-26.308Q598 433 593 431t-10 0l-30 10q-8.333-7.692-19.167-13.846Q523 421 512 418l-2-30q-.736-6.222-4.785-10.111-4.048-3.889-9.937-3.889h-32.389q-5.889 0-10.014 3.889Q448.75 381.778 448 388l-2 30q-11 3-21.833 9.154Q413.333 433.308 405 441l-30-10q-5-2-10 0t-7.8 6.846l-15.4 26.308Q339 469 339.5 474t5.188 9.167L365 499q-5 14-5 29t5 29l-20.312 15.833Q340 577 339.5 582t2.3 9.846l15.4 26.308Q360 623 365 625t10 0l30-10q8.056 8.077 18.528 14.538Q434 636 446 638Zm33.118-40Q450 598 429.5 577.618q-20.5-20.383-20.5-49.5Q409 499 429.382 478.5q20.383-20.5 49.5-20.5Q508 458 528.5 478.382q20.5 20.383 20.5 49.5Q549 557 528.618 577.5q-20.383 20.5-49.5 20.5ZM270 976q-12.75 0-21.375-8.625T240 946V804q-57-52-88.5-121.5T120 536q0-150 105-255t255-105q125 0 221.5 73.5T827 441l55 218q4 14-5 25.5T853 696h-93v140q0 24.75-17.625 42.375T700 896H600v50q0 12.75-8.625 21.375T570 976H270Z"/></svg>
            Start Quiz
          </Link>
          <button className="standard-button">
          <svg fill="var(--accent-color)" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M160 896V456h140v440H160Zm250 0V256h140v640H410Zm250 0V616h140v280H660Z"/></svg>
            See Statistics
          </button>
        </div>
        <Flashcard editable={true} rightAnim={rightAnim} leftAnim={leftAnim} animationHandler={animationHandler} flashcard={collection.flashcards[currentFlashcardIndex]}/>
        <div className='controls-container'>
          <button onClick={() => decrementFlashcardIndexHandler()} className='standard-button round'><svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="M627 948 276 597q-5-5-7-10t-2-11q0-6 2-11t7-10l351-351q11-11 28-11t28 11q12 12 12 28.5T683 261L368 576l315 315q13 13 12 29t-12 27q-12 12-28.5 12T627 948Z"/></svg></button>
          <span>{currentFlashcardIndex +1}  / {collection.flashcards.length}</span>
          <button onClick={() => incrementFlashcardIndexHandler()} className='standard-button round'><svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="M276 945q-11-12-11.5-28t11.5-28l315-315-315-315q-11-11-11.5-27.5T276 203q11-12 27.5-12.5T332 202l351 351q5 5 7 10t2 11q0 6-2 11t-7 10L332 946q-11 11-27.5 11T276 945Z"/></svg></button>
        </div>
      </div>
    </>
  )
}
export default PracticeMode