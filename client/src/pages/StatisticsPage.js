import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchCollection } from "../utils/fetchCollection"

const API_URL = process.env.REACT_APP_API_URL

export const StatisticsPage = () => {
  const token = localStorage.getItem('authToken')
  const collectionId = useParams().collectionId

  const [collection, setCollection] = useState([])
  const [learnSessions, setLearnSessions] = useState([])


  useEffect(() => {
    axios.get(`${API_URL}/api/statistics/${collectionId}`, {headers: { Authorization: `Bearer ${token}`}})
    .then(response => {
      // Sort the learnSessions by createdAt field in descending order
      const sortedLearnSessions = response.data.collectionLearnSessions.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setLearnSessions(sortedLearnSessions);
    })

    fetchCollection(API_URL, collectionId)
    .then(collection => {
      setCollection(collection)
    })
  }, [])

  const averageAccuracy = Math.round((learnSessions.reduce((acc, session) => acc + session.accuracy, 0)/learnSessions.length))


  if(!learnSessions){
    return <p>Loading ...</p>
  }
  return(
    <>
      <h1>Statistics</h1>
      <p>Title: {collection.title}</p>
      <p>Learn Sessions: {learnSessions.length}</p>
      <p>Average Accuracy: {averageAccuracy}%</p>
      <table>
        <thead>
          <tr>
            <th>Correct Answers</th>
            <th>Wrong Answers</th>
            <th>Accuracy in %</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {learnSessions.map(session => (
          <tr>
            <td>{session.correctCount}</td>
            <td>{session.wrongCount}</td>
            <td>{Math.round(session.accuracy)}</td>
            <td>{new Date(session.createdAt).toLocaleString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}