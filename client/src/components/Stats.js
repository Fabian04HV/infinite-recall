import '../assets/QuestionCard.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const Stats = ({correctFlashcards, wrongFlashcards, hintCount, collectionId}) => {
  const token = localStorage.getItem('authToken')
  
  const correctCount = correctFlashcards.length
  const wrongCount = wrongFlashcards.length
  const totalFlashcards = correctCount + wrongCount
  const accuracy = Math.round(correctCount / totalFlashcards * 100)

  useEffect(() => {
    saveStatistics(correctFlashcards, wrongFlashcards, collectionId, correctCount, wrongCount, accuracy)
  }, [])

  const saveStatistics = (correctFlashcards, wrongFlashcards, collectionId, correctCount, wrongCount, accuracy) => {
    const requestBody = {correctFlashcards, wrongFlashcards, collectionId, correctCount, wrongCount, accuracy}
    axios.put(`${API_URL}/api/save-statistics`, requestBody, {headers: { Authorization: `Bearer ${token}`}})
    .then(response => {

    })
    .catch(err => console.log(err))
  } 

  return(
    <div className="Stats">
      <h1>Congrats! you completed your learn session.</h1>
      <div className='stats-flex-container'>
        <div className="statsCard">
          <span className='accent-text'>{correctCount}/{totalFlashcards}</span>
          <p>correct answers</p>
        </div>
        <div className="statsCard">
          <span className='accent-text'>{accuracy}%</span>
          <p>accuracy</p>
        </div>
        <div className="statsCard">
          <span className='accent-text'>{hintCount}</span>
          <p>Hints used</p>
        </div>
      </div>
      <div>
        {wrongCount > 0 && <>
        <p>Cards you should review: </p>
        <br/>
        <table>
          <thead>
            <tr>
              <th>Front</th>
              <th>Back</th>
            </tr>
          </thead>
          <tbody>
            {wrongFlashcards.map((flashcard, index) => (
              <tr key={index}>
                <td>{flashcard.front}</td>
                <td>{flashcard.back}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>}
      </div>
      
      <div className='flex-row-between'>
        <Link to='/' className='standard-button light'>Home</Link>
        <button onClick={() => window.location.reload()} className='accent-button'>Practice Again</button>
      </div>
    </div>
  )
}