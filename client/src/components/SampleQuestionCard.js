import '../assets/QuestionCard.css'
import { useState, useRef, useEffect } from 'react'
import dynamicTextSize from '../utils/dynamicTextSize'
import { useNavigate } from 'react-router-dom'

export const SampleQuestionCard = ({currentFlashcard, currentFlashcardIndex, incrementFlashcardIndex}) =>{
  const navigate = useNavigate()
  const [answerOptions, setAnswerOptions] = useState([])

  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
  }

  useEffect(() => {
    setAnswerOptions(shuffleArray([currentFlashcard.answer, currentFlashcard.wrong1, currentFlashcard.wrong2, currentFlashcard.wrong3]))
  }, [currentFlashcard])

  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1)
  const [wrongAnswerIndex, setWrongAnswerIndex] = useState(-1)
  const [revealedAnswerIndex, setRevealedAnswerIndex] = useState(-1)

  const [feedbackMessage, setFeedbackMessage] = useState('Choose the correct one ')
  const [feedbackClass, setFeedbackClass] = useState('')
  
  const buttonsRef = useRef([])

  function validate(answer){
    const isAnswerCorrect = currentFlashcard.answer === answer
    if(currentFlashcardIndex === 3){
      const selectedAnswerIndex = answerOptions.findIndex(option => option === answer)
      setCorrectAnswerIndex(selectedAnswerIndex)
      setTimeout(() => navigate('/signup'), 850)
      return
    }
    isAnswerCorrect ? correctAnswer(answer) : wrongAnswer(answer)
  }
  const revealCorrectAnswer = () => {
    setRevealedAnswerIndex(answerOptions.findIndex(option => option === currentFlashcard.answer))
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
    const selectedAnswerIndex = answerOptions.findIndex(option => option === answer)
  
    setFeedbackMessage('Correct!')
    setFeedbackClass('correct')
    setCorrectAnswerIndex(selectedAnswerIndex)
   
    setTimeout(() => nextQuestion(), 850)
  }
  const wrongAnswer = (answer) => {
    const selectedAnswerIndex = answerOptions.findIndex(option => option === answer)
    setTimeout(() => revealCorrectAnswer(), 200)
    setFeedbackMessage("Wrong answer, but that's okay. Just keep going ✌")
    setFeedbackClass('wrong')
    setWrongAnswerIndex(selectedAnswerIndex)
  }

  return(
    <div className='QuestionCard'>
      <div className='question-container'>
        <h3 style={{ fontSize: `${dynamicTextSize(currentFlashcard.question)}rem` }}>{currentFlashcard.question}</h3>
      </div>
      <div className="answer-container">
        <h3 className={`feedback ${feedbackClass}`}>{feedbackMessage}</h3>
        <div className='answers'>
          {answerOptions.map((answerOption, index) => (
            <button
              ref={el => buttonsRef.current[index] = el}
              data-index={index +1}
              onClick={() => validate(answerOption)}
              key={index}
              className={`answer ${correctAnswerIndex === index && 'correctAnswer'} ${wrongAnswerIndex === index && 'wrongAnswer'} ${revealedAnswerIndex === index && 'revealedAnswer'}`}>
              {answerOption}
            </button>
          ))}
        </div>
        <div className='options-container'>
          {feedbackClass === 'wrong' && <button onClick={() => nextQuestion()} className='accent-button'>Got it!</button>}
        </div>
      </div>
    </div>
  )
}