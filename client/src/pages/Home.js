import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/Home.css'
import dynamicTextSize from '../utils/dynamicTextSize'
import { SampleQuestionCard } from '../components/SampleQuestionCard'


export const Home = () => {
  const sampleData = [
    {
      question: 'Say "hello" in Spanish',
      answer: 'Hola',
      wrong1: 'Adiós',
      wrong2: 'Amigo',
      wrong3: 'Taco'
    },
    {
      question: 'Ask "How old are you?" in Spanish',
      answer: 'Cuántos años tienes?',
      wrong1: 'Cuántos tacos tienes?',
      wrong2: 'Me gusta queso',
      wrong3: 'Cómo te llamas?'
    },
    {
      question: 'Ask "Where is the restaurant?" in Spanish',
      answer: 'Dónde está el restaurante?',
      wrong1: 'Dónde está la biblioteca?',
      wrong2: 'Dónde está el parque?',
      wrong3: 'Dónde está el colegio?'
    },
    {
      question: 'Like what you see? Sign up for free!',
      answer: 'Hell yeah!',
      wrong1: 'Of course!',
      wrong2: 'Absolutely!',
      wrong3: 'Definitely!'
    }
  ]
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
  const incrementFlashcardIndex = () => setCurrentFlashcardIndex(currentFlashcardIndex +1)
  const currentFlashcard = sampleData[currentFlashcardIndex]

  return(
    <section className="Home">
      <header>
        <h1>Learn anything you want! <br /> One card at a time.</h1>
        <Link to='/signup' className='main-button'>Sign up for free!</Link>
      </header>
      <section>
        <h2>What is it about?</h2>
        <p>
          
          Infinite Recall is the ultimate flashcard app for students! Create personalized flashcard collections effortlessly. Practice with interactive flashcards, making learning fun and effective. Share your collections with friends, creating a collaborative study community. Track your progress with detailed stats, identifying areas to improve. Embrace the future of learning with Infinite Recall
        </p>
        <br />
      </section>
      <hr />
      <section className='flex-column-center'>
        <h2>See for yourself with this demo!</h2>
        
        <SampleQuestionCard currentFlashcard={currentFlashcard} currentFlashcardIndex={currentFlashcardIndex} incrementFlashcardIndex={incrementFlashcardIndex}/>
      </section>
      <section>
        <div className='login-buttons'>
          <Link className='accent-button' to='/signup'>Sign Up</Link>
          <Link className='accent-button' to='/login'>Login</Link>
        </div>
      </section>
    </section>
  )
}