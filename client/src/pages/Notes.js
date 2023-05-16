import { useState } from 'react'
import '../assets/Notes.css'
import InputBox from '../components/InputBox'
import axios from 'axios'

const API_URL = 'http://localhost:5005'

function Notes(){
  const token = localStorage.getItem('authToken')
  
  const [notes, setNotes] = useState('')
  const [numberOfFlashcards, setNumberOfFlashcards] = useState(3)

  const notesInputHandler = (e) => setNotes(e.target.value)
  const numberOfFlashcardsInputHandler = (e) => setNumberOfFlashcards(e.target.value)

  const convertSubmitHandler = (e) => {
    e.preventDefault()
    
    //Make the Chat GPT Request using 'notes' and 'numberOfFlashcards' to get an array of flashcards objects
    const response = axios.post(`${API_URL}/api/notes/convert-to-flashcards`, { notes, numberOfFlashcards }, {headers: { Authorization: `Bearer ${token}`}})
    const flashcards = response.data.flashcards
    console.log(flashcards)
  }

  return(
    <>
      <h1>Convert your notes to flashcards</h1>
      <form onSubmit={convertSubmitHandler}>
        <textarea onChange={notesInputHandler} placeholder='Enter your notes' name="notes-input" id="notes-inputs" cols="30" rows="10" minLength={10} maxLength={1000}></textarea>
        <InputBox 
          type='number'
          placeholder='How many flashcards?'
          name='number-of-flashcards'
          min={3}
          max={10}
          onChangeHandler={numberOfFlashcardsInputHandler}
        />
        <button className='accent-button' type='submit'>Convert notes to flashcards</button>
      </form>
    </>
  )
}
export default Notes