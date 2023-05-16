import { useEffect, useState, useRef } from 'react';
import '../assets/QuestionCard.css'
import { getWrongAnswers } from '../utils/randomQuizHelpers'
import dynamicTextSize from '../utils/dynamicTextSize'

function QuestionCard({collection, flashcard, currentFlashcardIndex, incrementFlashcardIndex, saveAnswer}){
  const [wrongAnswers, setWrongAnswers] = useState(getWrongAnswers(collection.flashcards, currentFlashcardIndex))
  const [answerOptions, setAnswerOptions] = useState([])
  
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1)
  const [wrongAnswerIndex, setWrongAnswerIndex] = useState(-1)
  const [revealedAnswerIndex, setRevealedAnswerIndex] = useState(-1)

  const [feedbackMessage, setFeedbackMessage] = useState('Choose the correct one ')
  const [feedbackClass, setFeedbackClass] = useState('')
  
  const buttonsRef = useRef([])

  useEffect(() => {
    const updatedWrongAnswers = getWrongAnswers(collection.flashcards, currentFlashcardIndex)
    const updatedAnswerOptions = [...updatedWrongAnswers, flashcard].sort(() => Math.random() - 0.5)
    setWrongAnswers(updatedWrongAnswers)
    setAnswerOptions(updatedAnswerOptions)

    buttonsRef.current.forEach(button => {
      button.blur()
    })
  }, [currentFlashcardIndex, flashcard])
  

  function validate(answer){
    const isAnswerCorrect = flashcard.back === answer
    saveAnswer(flashcard, isAnswerCorrect)
    isAnswerCorrect ? correctAnswer(answer) : wrongAnswer(answer)
  }
  const revealCorrectAnswer = () => {
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
    const selectedAnswerIndex = answerOptions.findIndex(option => option.back === answer)
  
    setFeedbackMessage('Correct!')
    setFeedbackClass('correct')
    setCorrectAnswerIndex(selectedAnswerIndex)
   
    setTimeout(() => nextQuestion(), 850)
  }
  const wrongAnswer = (answer) => {
    const selectedAnswerIndex = answerOptions.findIndex(option => option.back === answer)
    setTimeout(() => revealCorrectAnswer(), 200)
    setFeedbackMessage("Wrong answer, but that's okay. Just keep going ✌")
    setFeedbackClass('wrong')
    setWrongAnswerIndex(selectedAnswerIndex)
  }

  return (
    <div className="QuestionCard">
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
              className={`answer ${correctAnswerIndex === index && 'correctAnswer'} ${wrongAnswerIndex === index && 'wrongAnswer'} ${revealedAnswerIndex === index && 'revealedAnswer'}`}>
              {answerOption.back}
            </button>
          ))}
        </div>
        <div className='options-container'>
            <button className='standard-button light'>Skip for now</button>
            {feedbackClass === 'wrong' && <button onClick={() => nextQuestion()} className='accent-button'>Got it!</button>}
        </div>
      </div>
    </div>
  )
}
export default QuestionCard
