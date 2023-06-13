import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL

export const saveAnswerInFlashcardHistory = (collectionId, flashcardId, isCorrect) => {
  const requestBody = { collectionId, flashcardId, isCorrect }
  const token = localStorage.getItem('authToken')

  axios.put(`${API_URL}/api/saveAnswerInFlashcardHistory`, requestBody, {headers: { Authorization: `Bearer ${token}`}})
}
export const getCollectionAnswerHistory = (collectionId) => {
  const token = localStorage.getItem('authToken')

  return axios.get(`${API_URL}/api/collectionAnswerHistory/${collectionId}`, {headers: { Authorization: `Bearer ${token}`}})
  .then(response => {
    return response.data.answerHistory
  })
}