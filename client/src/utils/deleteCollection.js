import axios from "axios"

export const deleteCollection = (API_URL, collectionId) => {
  const token = localStorage.getItem('authToken')
  console.log('DELETE', collectionId)
  return axios.delete(`${API_URL}/api/collection/delete/${collectionId}`, {headers: { Authorization: `Bearer ${token}`}})
}