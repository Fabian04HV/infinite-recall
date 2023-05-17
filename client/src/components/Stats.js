import '../assets/QuestionCard.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5005'

export const Stats = ({correctFlashcards, wrongFlashcards, collectionId}) => {
  const token = localStorage.getItem('authToken')

  const correctCount = correctFlashcards.length
  const wrongCount = wrongFlashcards.length
  const totalFlashcards = correctCount + wrongCount
  const accuracy = correctCount / totalFlashcards * 100

  const [numberOfLearnSession, setNumberOfLearnSession] = useState(0)

  useEffect(() => {
    //save stats in db
    saveStatistics(correctFlashcards, wrongFlashcards, collectionId, correctCount, wrongCount, accuracy)
    //get stats from user.learnSessions find(collectionId)
    //setNumberOfLearnSession()
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
          <span className='accent-text'>{numberOfLearnSession}</span>
          <p>learn sessions</p>
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
            {wrongFlashcards.map(flashcard => (
              <tr>
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