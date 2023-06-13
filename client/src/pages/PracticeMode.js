import { Link, useParams, useNavigate } from 'react-router-dom'
import '../assets/Collection.css'
import Flashcard from '../components/Flashcard'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { fetchCollection } from '../utils/fetchCollection'
import { deleteCollection } from '../utils/deleteCollection'
import { Loading } from '../components/Loading'

const API_URL = process.env.REACT_APP_API_URL

function PracticeMode(){
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const collectionId = useParams()._id
  const [collection, setCollection] = useState(null)
  const [overlay, setOverlay] = useState(false)

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
  const decrementFlashcardIndexHandler = () => {
    setCurrentFlashcardIndex(currentFlashcardIndex > 0 ? currentFlashcardIndex - 1 : collection.flashcards.length -1)
    setLeftAnim(true)
  }

  const handleDelete = () => {
    deleteCollection(API_URL , collectionId)
      .then(() => navigate('/collections')) 
  }

  if(!collection){
    return <Loading />
  }

  const closeMenusAndOverlay = () => {
    setOverlay(false)
  }

  //If the collection contains less than four flashcards, the Learn Mode shouldn't be available => Conditional Rendering for Start Quiz Link
  const disableQuiz = collection.flashcards.length < 4

  return(
    <>
      {overlay && <div onClick={() => closeMenusAndOverlay()} className='overlay'></div>}
      <h1>{collection.creator}: {collection.title}</h1>
      <div className="PracticePage">
        <div className='collection-controls-container'>
          {disableQuiz ? (
            <Link to={`/`} style={ {pointerEvents: 'none', color: 'var(--color-5)'} } className="standard-button">
            <svg fill="var(--color-5)" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="m446 638 2 30q.736 6.222 4.785 10.111 4.048 3.889 9.937 3.889h32.389q5.889 0 10.014-3.889Q509.25 674.222 510 668l2-30q12-2 22.472-8.462Q544.944 623.077 553 615l30 10q5 2 10 0t7.8-6.846l15.4-26.308Q619 587 618.5 582t-5.188-9.167L593 557q5-14 5-29t-5-29l20.312-15.833Q618 479 618.5 474t-2.3-9.846l-15.4-26.308Q598 433 593 431t-10 0l-30 10q-8.333-7.692-19.167-13.846Q523 421 512 418l-2-30q-.736-6.222-4.785-10.111-4.048-3.889-9.937-3.889h-32.389q-5.889 0-10.014 3.889Q448.75 381.778 448 388l-2 30q-11 3-21.833 9.154Q413.333 433.308 405 441l-30-10q-5-2-10 0t-7.8 6.846l-15.4 26.308Q339 469 339.5 474t5.188 9.167L365 499q-5 14-5 29t5 29l-20.312 15.833Q340 577 339.5 582t2.3 9.846l15.4 26.308Q360 623 365 625t10 0l30-10q8.056 8.077 18.528 14.538Q434 636 446 638Zm33.118-40Q450 598 429.5 577.618q-20.5-20.383-20.5-49.5Q409 499 429.382 478.5q20.383-20.5 49.5-20.5Q508 458 528.5 478.382q20.5 20.383 20.5 49.5Q549 557 528.618 577.5q-20.383 20.5-49.5 20.5ZM270 976q-12.75 0-21.375-8.625T240 946V804q-57-52-88.5-121.5T120 536q0-150 105-255t255-105q125 0 221.5 73.5T827 441l55 218q4 14-5 25.5T853 696h-93v140q0 24.75-17.625 42.375T700 896H600v50q0 12.75-8.625 21.375T570 976H270Z"/></svg>
              Quiz not available
            </Link>
          ):
            <Link to={`/learn/${collectionId}`} className="standard-button">
            <svg fill="var(--accent-color)" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="m446 638 2 30q.736 6.222 4.785 10.111 4.048 3.889 9.937 3.889h32.389q5.889 0 10.014-3.889Q509.25 674.222 510 668l2-30q12-2 22.472-8.462Q544.944 623.077 553 615l30 10q5 2 10 0t7.8-6.846l15.4-26.308Q619 587 618.5 582t-5.188-9.167L593 557q5-14 5-29t-5-29l20.312-15.833Q618 479 618.5 474t-2.3-9.846l-15.4-26.308Q598 433 593 431t-10 0l-30 10q-8.333-7.692-19.167-13.846Q523 421 512 418l-2-30q-.736-6.222-4.785-10.111-4.048-3.889-9.937-3.889h-32.389q-5.889 0-10.014 3.889Q448.75 381.778 448 388l-2 30q-11 3-21.833 9.154Q413.333 433.308 405 441l-30-10q-5-2-10 0t-7.8 6.846l-15.4 26.308Q339 469 339.5 474t5.188 9.167L365 499q-5 14-5 29t5 29l-20.312 15.833Q340 577 339.5 582t2.3 9.846l15.4 26.308Q360 623 365 625t10 0l30-10q8.056 8.077 18.528 14.538Q434 636 446 638Zm33.118-40Q450 598 429.5 577.618q-20.5-20.383-20.5-49.5Q409 499 429.382 478.5q20.383-20.5 49.5-20.5Q508 458 528.5 478.382q20.5 20.383 20.5 49.5Q549 557 528.618 577.5q-20.383 20.5-49.5 20.5ZM270 976q-12.75 0-21.375-8.625T240 946V804q-57-52-88.5-121.5T120 536q0-150 105-255t255-105q125 0 221.5 73.5T827 441l55 218q4 14-5 25.5T853 696h-93v140q0 24.75-17.625 42.375T700 896H600v50q0 12.75-8.625 21.375T570 976H270Z"/></svg>
              Start Learning
            </Link>
          }
          <Link to={`/classic/${collectionId}`} className='standard-button'>
          <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26"><path d="M260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-590q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T140-730v590h590q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5Q760-97 751.375-88.5T730-80H140Zm120-740v560-560Z"/></svg>  
            Classic Flashcards
          </Link>
          <div>
            <Link to={`/statistics/${collectionId}`} className="standard-button">
            <svg fill="var(--accent-color)" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M160 896V456h140v440H160Zm250 0V256h140v640H410Zm250 0V616h140v280H660Z"/></svg>
              Statistics
            </Link>
            {user.username === collection.creator &&
            <> 
              <button onClick={() => setOverlay(true)} htmlFor='toggle-menu-checkbox' className='standard-button menu-button'>
              <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26"><path d="m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Z"/></svg>
                {overlay && <div className='options-dropdown'>
                  <Link to={`/collection/edit/${collectionId}`} className='standard-button'>Edit Collection <svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M794 390 666 262l42-42q17-17 42.5-16.5T793 221l43 43q17 17 17 42t-17 42l-42 42ZM150 936q-13 0-21.5-8.5T120 906v-86q0-6 2-11t7-10l495-495 128 128-495 495q-5 5-10 7t-11 2h-86Z"/></svg></Link>
                  <button className='standard-button' onClick={handleDelete}>Delete Collection <svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M261 936q-24 0-42-18t-18-42V306h-11q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T190 246h158q0-13 8.625-21.5T378 216h204q12.75 0 21.375 8.625T612 246h158q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T770 306h-11v570q0 24-18 42t-42 18H261Zm106-176q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T427 760V421q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T367 421v339Zm166 0q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T593 760V421q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T533 421v339Z"/></svg></button>
                </div>}
              </button>
            </>}
          </div>
          
        </div>
        <Flashcard rightAnim={rightAnim} leftAnim={leftAnim} animationHandler={animationHandler} flashcard={collection.flashcards[currentFlashcardIndex]}/>
        <div className='controls-container'>
          <button onClick={() => decrementFlashcardIndexHandler()} className='standard-button round'><svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="M627 948 276 597q-5-5-7-10t-2-11q0-6 2-11t7-10l351-351q11-11 28-11t28 11q12 12 12 28.5T683 261L368 576l315 315q13 13 12 29t-12 27q-12 12-28.5 12T627 948Z"/></svg></button>
          <span>{currentFlashcardIndex +1}  / {collection.flashcards.length}</span>
          <button onClick={() => incrementFlashcardIndexHandler()} className='standard-button round'><svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="M276 945q-11-12-11.5-28t11.5-28l315-315-315-315q-11-11-11.5-27.5T276 203q11-12 27.5-12.5T332 202l351 351q5 5 7 10t2 11q0 6-2 11t-7 10L332 946q-11 11-27.5 11T276 945Z"/></svg></button>
        </div>
      </div>
      {collection.description &&
      <section className='colletion-details-section'>
        <h2>Description</h2>
        <p>{collection.description}</p>
      </section>
      }
    </>
  )
}
export default PracticeMode