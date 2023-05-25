import { useEffect, useState, useRef } from 'react';
import '../assets/QuestionCard.css'
import { getWrongAnswers } from '../utils/randomQuizHelpers'
import dynamicTextSize from '../utils/dynamicTextSize'

function QuestionCard({shuffledFlashcards, flashcard, currentFlashcardIndex, incrementFlashcardIndex, saveAnswer}){
  const [wrongAnswers, setWrongAnswers] = useState(getWrongAnswers(shuffledFlashcards, currentFlashcardIndex))
  const [answerOptions, setAnswerOptions] = useState([])
  
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1)
  const [wrongAnswerIndex, setWrongAnswerIndex] = useState(-1)
  const [revealedAnswerIndex, setRevealedAnswerIndex] = useState(-1)
  const [removedAnswersIndexes, setRemovedAnswersIndexes] = useState([])


  const [feedbackMessage, setFeedbackMessage] = useState('Choose the correct one ')
  const [feedbackClass, setFeedbackClass] = useState('')
  
  const buttonsRef = useRef([])

  useEffect(() => {
    const updatedWrongAnswers = getWrongAnswers(shuffledFlashcards, currentFlashcardIndex)
    const updatedAnswerOptions = [...updatedWrongAnswers, flashcard].sort(() => Math.random() - 0.5)
    setWrongAnswers(updatedWrongAnswers)
    setAnswerOptions(updatedAnswerOptions)
    setRemovedAnswersIndexes([])

    buttonsRef.current.forEach(button => {
      button.blur()
    })
  }, [currentFlashcardIndex, flashcard, shuffledFlashcards])
  

  function validate(answer){
    const isAnswerCorrect = flashcard.back === answer
    isAnswerCorrect ? correctAnswer(answer) : wrongAnswer(answer)
  }
  const revealCorrectAnswer = () => {
    saveAnswer(flashcard, false)
    setRevealedAnswerIndex(answerOptions.findIndex(option => option.back === flashcard.back))
  }
  const nextQuestion = () => {
    setCorrectAnswerIndex(-1)
    setWrongAnswerIndex(-1)
    setRevealedAnswerIndex(-1)
    setFeedbackMessage('Choose the correct one ')
    setFeedbackClass('')

    incrementFlashcardIndex()
  }

  const correctAnswer = (answer) => {
    saveAnswer(flashcard, true)
    const selectedAnswerIndex = answerOptions.findIndex(option => option.back === answer)
  
    setFeedbackMessage('Correct!')
    setFeedbackClass('correct')
    setCorrectAnswerIndex(selectedAnswerIndex)
   
    setTimeout(() => nextQuestion(), 850)
  }
  const wrongAnswer = (answer) => {
    // saveAnswer(flashcard, false)
    const selectedAnswerIndex = answerOptions.findIndex(option => option.back === answer)
    setTimeout(() => revealCorrectAnswer(), 200)
    setFeedbackMessage("Wrong answer, but that's okay. Just keep going ✌")
    setFeedbackClass('wrong')
    setWrongAnswerIndex(selectedAnswerIndex)
  }

  const removeOne = () => {
    if(removedAnswersIndexes.length > 1) return;
    const randomIndex = Math.floor(Math.random() * 4)
    if(randomIndex === answerOptions.findIndex(option => option.back === flashcard.back) || removedAnswersIndexes.includes(randomIndex)){
      return removeOne()
    }
    setRemovedAnswersIndexes((prev) => [...prev, randomIndex])
  }

  return (
    <>
      <div className="question-container">
        <h3 style={{ fontSize: `${dynamicTextSize(flashcard.front)}rem` }}>{flashcard.front}</h3>
      </div>
      <div className="answer-container">
        <h3 className={`feedback ${feedbackClass}`}>{feedbackMessage}</h3>
        <div className='answers'>
          {answerOptions.map((answerOption, index) => (
            <button
              ref={el => buttonsRef.current[index] = el}
              data-index={index +1}
              onClick={() => validate(answerOption.back)}
              key={index}
              className={`answer 
                ${correctAnswerIndex === index && 'correctAnswer'}
                ${wrongAnswerIndex === index && 'wrongAnswer'} 
                ${revealedAnswerIndex === index && 'revealedAnswer'} 
                ${removedAnswersIndexes.includes(index) && 'removedAnswer'}`}>
              {answerOption.back}
            </button>
          ))}
        </div>
        <div className='options-container'>
            {removedAnswersIndexes.length < 2 ?
            <button onClick={removeOne} className='standard-button light'>
              {removedAnswersIndexes.length > 0 && 'Another'} Hint
              <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26"><path d="M480-80q-27 0-47.5-13T406-129h-14q-24 0-42-18t-18-42v-143q-66-43-104-110t-38-148q0-121 84.5-205.5T480-880q121 0 205.5 84.5T770-590q0 81-38 148T628-332v143q0 24-18 42t-42 18h-14q-6 23-26.5 36T480-80Zm-88-109h176v-44H392v44Zm0-84h176v-40H392v40Zm65-100h46v-137l77-77q6-6 6-15t-6-16q-7-6-16-6t-15 6l-69 69-68-69q-7-6-16-6t-15 6q-7 7-7 16t6 15l77 77v137Z"/></svg>
            </button>
            :
            <button onClick={revealCorrectAnswer} className='standard-button light'>
              Reveal Answer    
              <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26"><path d="M480-80q-27 0-47.5-13T406-129h-14q-24 0-42-18t-18-42v-143q-66-43-104-110t-38-148q0-121 84.5-205.5T480-880q121 0 205.5 84.5T770-590q0 81-38 148T628-332v143q0 24-18 42t-42 18h-14q-6 23-26.5 36T480-80Zm-88-109h176v-44H392v44Zm0-84h176v-40H392v40Zm65-100h46v-137l77-77q6-6 6-15t-6-16q-7-6-16-6t-15 6l-69 69-68-69q-7-6-16-6t-15 6q-7 7-7 16t6 15l77 77v137Z"/></svg>          
            </button>}
            {revealedAnswerIndex !== -1 && <button onClick={() => nextQuestion()} className='accent-button'>Got it!</button>}
        </div>
      </div>
    </>
  )
}
export default QuestionCard
