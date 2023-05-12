import { useState, useEffect } from 'react'
import InputBox from '../components/InputBox'
import axios from 'axios'
import Flashcard from '../components/Flashcard'
import dynamicTextSize from '../utils/dynamicTextSize'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import '../assets/CreateCollection.css'
import '../assets/Flashcard.css'
import { fetchCollection } from '../utils/fetchCollection'

const API_URL = 'http://localhost:5005'

function CreateCollection(){
  const token = localStorage.getItem('authToken')
  const editId = useParams()._id
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [createdFlashcards, setCreatedFlashcards] = useState([])
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)


  const titleInputHandler = (e) => setTitle(e.target.value)

  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [importance, setImportance] = useState('normal')

  const frontInputHandler = (e) => setFront(e.target.value)
  const backInputHandler = (e) => setBack(e.target.value)
  const importanceHandler = (e) => setImportance(e.target.value)
  
  const fontSizeFront = dynamicTextSize(front)
  const fontSizeBack = dynamicTextSize(back)

  const [flipped, setFlipped] = useState(false)

  const setBigFlashcard = () => {
    console.log('UPDATE CURRENT FLASHCARD INDEX: ', currentFlashcardIndex)
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
        // setFront(res.flashcards[currentFlashcardIndex].front)
        // setBack(res.flashcards[currentFlashcardIndex].back)
        return res
      })
      .then((res) => {
        setCurrentFlashcardIndex(res.flashcards.length)
      })
      .then(() => {
        console.log('ON LOAD CURRENT FLASHCARD INDEX: ', currentFlashcardIndex)
      })
    }
  }, [])

  useEffect(() => {
    setBigFlashcard()
  }, [currentFlashcardIndex])

  const collectionSubmitHandler = (e) => {
    console.log(createdFlashcards)
    e.preventDefault()
    if(editId){
      axios.put(`${API_URL}/api/collection/edit`, {title, createdFlashcards, editId}, {headers: { Authorization: `Bearer ${token}`}})
      .then(response => {
        navigate(`/practice/${response.data.collection._id}`, {replace: true});
      })
    }
    else{
      console.log('CREATED FLASHCARDS: ', createdFlashcards)
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
    console.log(flashcard)
    
    const updated = [...createdFlashcards]
    updated[currentFlashcardIndex] = flashcard


    setCreatedFlashcards(updated)
    setFront('')
    setBack('')
    console.log('Updated.length', updated.length)
    setCurrentFlashcardIndex(updated.length)
    setSelectAnim(false)
  }


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

  return (
    <div className='CreateCollection'>
      <div className='flashcard-editor-container'>
        <h1>{editId ? `Edit Flashcard Collection` : 'Create Flashcard Collection'}</h1>

        <div onClick={() => setFlipped(!flipped)} className={`Flashcard ${flipped && 'flipped'}`}>
          <div className='card-front side'>
            <span className='card-text' style={{ fontSize: `${fontSizeFront/1.25}px` }}>{front}</span>
          </div>
          <div className='card-back side'>
            <span className='card-text' style={{ fontSize: `${fontSizeBack/1.25}px` }}>{back}</span>
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
          />
          <InputBox 
            type='text'
            name='back'
            placeholder='Back'
            onChangeHandler={backInputHandler}
            onFocus={() => setFlipped(true)}
            value={back}
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
        </form>
      </div>
      <div className='collection-editor-container'>
        <div>
          <h3>This collection has {createdFlashcards.length} flashcards: </h3>
          <p className='secondary-text'>Click on a flashcard if you want to edit it</p>
        </div>
        <div className='created-flashcards-container'>
          {createdFlashcards.map(flashcard => {
            const fontSizeFront = dynamicTextSize(flashcard.front)
            return(
              <label htmlFor='front' className='preview-flashcard' onClick={() => { selectThisFlashcard(createdFlashcards.indexOf(flashcard))}}>
                <span className='card-text' style={{ fontSize: `${fontSizeFront/4.5}px` }}>{flashcard.front}</span>
              </label>
            )
          })}
          <label htmlFor='front' className='preview-flashcard' onClick={() => setCurrentFlashcardIndex(createdFlashcards.length)}>
            <span className='card-text'>+</span>
          </label>
        </div>

        <form className='collection-form' onSubmit={collectionSubmitHandler}>
          <InputBox 
            type='text'
            name='title'
            placeholder='Collection Title'
            value={title}
            onChangeHandler={titleInputHandler}
          />
          <button className='accent-button'>{editId ? 'Save Changes' : 'Create Collection'}</button>
        </form>
      </div>  
    </div>
  )
}
export default CreateCollection