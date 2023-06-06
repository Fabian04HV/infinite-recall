import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL
const token = localStorage.getItem('authToken')

export const saveAnswerInFlashcardHistory = (collectionId, flashcardId, isCorrect) => {
  const requestBody = { collectionId, flashcardId, isCorrect }

  axios.put(`${API_URL}/api/saveAnswerInFlashcardHistory`, requestBody, {headers: { Authorization: `Bearer ${token}`}})
    .then((response) => {
      console.log(response)
    })
}