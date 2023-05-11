import axios from 'axios'

export const fetchCollection = (API_URL, collectionId) => {
  const token = localStorage.getItem('authToken')

  return axios.get(`${API_URL}/api/collections/${collectionId}`, {headers: { Authorization: `Bearer ${token}`}})
    .then((response) => {
      return response.data.collection
    })
    .catch(err => console.log(err))
}