import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import InputBox from '../components/InputBox'
import axios from 'axios'
import Flashcard from '../components/Flashcard'
import dynamicTextSize from '../utils/dynamicTextSize'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import '../assets/CreateCollection.css'
import '../assets/Flashcard.css'
import { fetchCollection } from '../utils/fetchCollection'

const API_URL = process.env.REACT_APP_API_URL

function CreateCollection(){
  const user = useContext(AuthContext)
  const token = localStorage.getItem('authToken')
  const editId = useParams()._id
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [createdFlashcards, setCreatedFlashcards] = useState([])
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
  
  const [isOwner, setIsOwner] = useState(false)
  
  const[errorMessage, setErrorMessage] = useState('')

  const titleInputHandler = (e) => setTitle(e.target.value)

  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [importance, setImportance] = useState('normal')

  const frontInputHandler = (e) => {
    setFront(e.target.value)
    setErrorMessage(null)
  }
  const backInputHandler = (e) => {
    setBack(e.target.value)
    setErrorMessage(null)
  }
  const importanceHandler = (e) => setImportance(e.target.value)
  
  const fontSizeFront = dynamicTextSize(front)
  const fontSizeBack = dynamicTextSize(back)

  const [flipped, setFlipped] = useState(false)

  const setBigFlashcard = () => {
    if(createdFlashcards.length > 0){
      if(currentFlashcardIndex === createdFlashcards.length){
        setFront('')
        setBack('')  
      }
      else{
        setFront(createdFlashcards[currentFlashcardIndex].front)
        setBack(createdFlashcards[currentFlashcardIndex].back)
      }
    }
  }

  useEffect(() => {
    if(editId){
      fetchCollection(API_URL, editId)
      .then(res => {
        setCreatedFlashcards(res.flashcards)
        setTitle(res.title)
        return res
      })
      .then((res) => {
        setCurrentFlashcardIndex(res.flashcards.length)
      })
    }
    else{
      setIsOwner(true)
    }
  }, [])

  useEffect(() => {
    setBigFlashcard()
  }, [currentFlashcardIndex])

  const collectionSubmitHandler = (e) => {
    e.preventDefault()
    if(editId){
      axios.put(`${API_URL}/api/collection/edit`, {title, createdFlashcards, editId}, {headers: { Authorization: `Bearer ${token}`}})
      .then(response => {
        navigate(`/practice/${response.data.collection._id}`, {replace: true});
      })
    }
    else{
      axios.post(`${API_URL}/api/collection/create`, {title, createdFlashcards}, {headers: { Authorization: `Bearer ${token}`}})
        .then(response => {
          setTitle('')
          navigate(`/practice/${response.data.collection._id}`, {replace: true});
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const cardSubmitHandler = (e) => {
    e.preventDefault()
    let flashcard = {
      front: front,
      back: back,
      importance: importance
    }
    if(createdFlashcards[currentFlashcardIndex] && createdFlashcards[currentFlashcardIndex]._id){
      flashcard._id = createdFlashcards[currentFlashcardIndex]._id
    }
    
    const updated = [...createdFlashcards]
    updated[currentFlashcardIndex] = flashcard

    if(isFlashcardAlreadyExists(flashcard)){
      setErrorMessage('Cannot add Flashcard, since it already exists 🤐')
      return
    }

    setCreatedFlashcards(updated)
    setFront('')
    setBack('')
    setCurrentFlashcardIndex(updated.length)
    setSelectAnim(false)
  }

  const isFlashcardAlreadyExists = (flashcard) => {
    // Check if the flashcard already exists in the createdFlashcards array
    return createdFlashcards.some(
      (existingCard) =>
        existingCard.front === flashcard.front && existingCard.back === flashcard.back
    );
  };

  const [selectAnim, setSelectAnim] = useState(false)

  const selectThisFlashcard = (flashcardIndex) => {
    setCurrentFlashcardIndex(flashcardIndex)
    setSelectAnim(true)
  }

  const deleteFlashcard = (index) => {
    const updated = [...createdFlashcards]
    updated.splice(index, 1)
    setCreatedFlashcards(updated) 
    setCurrentFlashcardIndex(updated.length)
  }

  fetchCollection(API_URL, editId)
    .then(collection => {
      if(user.user.username !== collection.creator){
        return navigate('/collections')
      }
      else{
        setIsOwner(true)
      }
    })

  return isOwner && (
    <div className='CreateCollection'>
      <div className='flashcard-editor-container'>
        <h1>{editId ? `Edit Flashcard Collection` : 'Create Flashcard Collection'}</h1>

        <div onClick={() => setFlipped(!flipped)} className={`Flashcard ${flipped && 'flipped'}`}>
          <div className='card-front side'>
            <span className='card-text' style={{ fontSize: `${fontSizeFront/1.25}rem` }}>{front}</span>
          </div>
          <div className='card-back side'>
            <span className='card-text' style={{ fontSize: `${fontSizeBack/1.25}rem` }}>{back}</span>
          </div>
        </div>

        <form onSubmit={cardSubmitHandler}>
          <InputBox 
            type='text'
            name='front'
            id='front'
            placeholder='Front'
            onChangeHandler={frontInputHandler}
            onFocus={() => setFlipped(false)}
            value={front}
            maxLength={500}
          />
          <InputBox 
            type='text'
            name='back'
            placeholder='Back'
            onChangeHandler={backInputHandler}
            onFocus={() => setFlipped(true)}
            value={back}
            maxLength={500}
          />
          <div className='form-buttons-container'>
            <select onChange={importanceHandler} className='standard-button standard-select'>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
            {currentFlashcardIndex !== createdFlashcards.length && <button type='button' onClick={() => deleteFlashcard(currentFlashcardIndex)} className='standard-button'><svg fill='var(--text-color)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M261 936q-24 0-42-18t-18-42V306h-11q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T190 246h158q0-13 8.625-21.5T378 216h204q12.75 0 21.375 8.625T612 246h158q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T770 306h-11v570q0 24-18 42t-42 18H261Zm106-176q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T427 760V421q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T367 421v339Zm166 0q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T593 760V421q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T533 421v339Z"/></svg></button>}
            <button type='submit' className='accent-button'>{currentFlashcardIndex !== createdFlashcards.length ? 'Confirm Changes' : 'Add Flashcard'}</button>
          </div>
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </form>
      </div>
      <div className='collection-editor-container'>
        <div>
          <h2 className='secondary-text'>Click on a flashcard to edit</h2>
          
        </div>
        <div className='created-flashcards-container'>
          <label htmlFor='front' className='preview-flashcard add-card' onClick={() => setCurrentFlashcardIndex(createdFlashcards.length)}>
          <svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M479.804 845.999q-9.727 0-16.111-6.524-6.385-6.523-6.385-16.168V598.692H232.693q-9.645 0-16.168-6.58-6.524-6.581-6.524-16.308t6.524-16.111q6.523-6.385 16.168-6.385h224.615V328.693q0-9.644 6.58-16.168 6.581-6.524 16.308-6.524t16.111 6.524q6.385 6.524 6.385 16.168v224.615h224.615q9.644 0 16.168 6.58 6.524 6.581 6.524 16.308t-6.524 16.111q-6.524 6.385-16.168 6.385H502.692v224.615q0 9.645-6.58 16.168-6.581 6.524-16.308 6.524Z"/></svg>
          </label>
          {createdFlashcards.map(flashcard => {
            const fontSizeFront = dynamicTextSize(flashcard.front)
            return(
              <label htmlFor='front' className='preview-flashcard' onClick={() => { selectThisFlashcard(createdFlashcards.indexOf(flashcard))}}>
                <span className='card-text' style={{ fontSize: `${fontSizeFront/3}rem` }}>{flashcard.front}</span>
              </label>
            )
          })}
        </div>

        <form className='collection-form' onSubmit={collectionSubmitHandler}>
          <InputBox 
            type='text'
            name='title'
            placeholder='Collection Title'
            value={title}
            onChangeHandler={titleInputHandler}
            maxLength={50}
          />
          <button className='accent-button'>{editId ? 'Save Changes' : 'Create Collection'}</button>
        </form>
      </div>  
    </div>
  )
}
export default CreateCollection