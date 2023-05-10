import { useState, useEffect } from 'react'
import InputBox from '../components/InputBox'
import axios from 'axios'
import Flashcard from '../components/Flashcard'
import dynamicTextSize from '../utils/dynamicTextSize'
import { useNavigate } from 'react-router-dom'
import '../assets/CreateCollection.css'
import '../assets/Flashcard.css'

import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

function CreateCollection(){
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [creator, setCreator] = useState('')

  const token = localStorage.getItem('authToken')

  const [currentFlashcard, setCurrentFlashcard] = useState(null)
  const [createdFlashcards, setCreatedFlashcards] = useState([])

  const titleInputHandler = (e) => setTitle(e.target.value)
  const creatorInputHandler = (e) => setCreator(e.target.value)

  const collectionSubmitHandler = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5005/api/collection/create', {title, creator, createdFlashcards}, {headers: { Authorization: `Bearer ${token}`}})
      .then(response => {
        console.log('Create Collection: ', response)
        setTitle('')
        setCreator('')  
        navigate('/collections', {replace: true});
      })
      .catch(error => {
        console.log(error)
      })

  }

  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [importance, setImportance] = useState('normal')

  const frontInputHandler = (e) => setFront(e.target.value)
  const backInputHandler = (e) => setBack(e.target.value)
  const importanceHandler = (e) => setImportance(e.target.value)

  const fontSizeFront = dynamicTextSize(front)
  const fontSizeBack = dynamicTextSize(back)

  const [flipped, setFlipped] = useState(false)

  const cardSubmitHandler = (e) => {
    e.preventDefault()
    const flashcard = {
      front: front,
      back: back,
      importance: importance
    }
    setCreatedFlashcards([...createdFlashcards, flashcard])
    setFront('')
    setBack('')
  }

  return (
    <div className='CreateCollection'>
      <div className='flashcard-editor-container'>
        <h1>Create Flashcard Collection</h1>

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
            <button type='submit' className='accent-button'>Add Card</button>
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
              <div className='preview-flashcard'>
                <span className='card-text' style={{ fontSize: `${fontSizeFront/4.5}px` }}>{flashcard.front}</span>
              </div>
            )
          })}
        </div>

        <form className='collection-form' onSubmit={collectionSubmitHandler}>
          <InputBox 
            type='text'
            name='title'
            placeholder='Collection Title'
            onChangeHandler={titleInputHandler}
          />
          <InputBox 
            type='text'
            name='Creator'
            placeholder='Creator'
            onChangeHandler={creatorInputHandler}
          />
          <button className='accent-button'>Create Collection</button>
        </form>
      </div>  
    </div>
  )
}
export default CreateCollection