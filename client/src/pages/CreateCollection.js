import { useState, useEffect } from 'react'
import InputBox from '../components/InputBox'
import axios from 'axios'
import Flashcard from '../components/Flashcard'
import dynamicTextSize from '../utils/dynamicTextSize'

import '../assets/CreateCollection.css'

function CreateCollection(){

  const [title, setTitle] = useState('')
  const [creator, setCreator] = useState('')

  const [createdFlashcards, setCreatedFlashcards] = useState([])

  const titleInputHandler = (e) => setTitle(e.target.value)
  const creatorInputHandler = (e) => setCreator(e.target.value)

  const collectionSubmitHandler = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5005/api/collection/create', {title, creator, createdFlashcards})
      .then(response => {
        console.log('Create Collection: ', response)
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
  }

  return (
    <div className='CreateCollection'>
      <div className='flashcard-editor-container'>
        <h1>Create Flashcard Collection</h1>

        <div className={`Flashcard ${flipped && 'flipped'}`}>
          <div className='card-front side'>
            <span className='card-text' style={{ fontSize: `${fontSizeFront}px` }}>{front}</span>
          </div>
          <div className='card-back side'>
            <span className='card-text' style={{ fontSize: `${fontSizeBack}px` }}>{back}</span>
          </div>
        </div>

        <form onSubmit={cardSubmitHandler}>
          <InputBox 
            type='text'
            name='front'
            placeholder='Front'
            onChangeHandler={frontInputHandler}
            onFocus={() => setFlipped(false)}
          />
          <InputBox 
            type='text'
            name='back'
            placeholder='Back'
            onChangeHandler={backInputHandler}
            onFocus={() => setFlipped(true)}
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
        <h2>Created Flashcards: </h2>
        <form onSubmit={collectionSubmitHandler}>
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