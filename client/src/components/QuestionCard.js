import { useEffect, useState, useRef } from 'react';
import '../assets/QuestionCard.css'
import { getWrongAnswers } from '../utils/randomQuizHelpers'
import dynamicTextSize from '../utils/dynamicTextSize'

function QuestionCard(props){
  const {collection, flashcard, currentFlashcardIndex, incrementFlashcardIndex} = props

  const [wrongAnswers, setWrongAnswers] = useState(getWrongAnswers(collection.flashcards, currentFlashcardIndex))
  const [answerOptions, setAnswerOptions] = useState([])
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1)
  
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
    const correctAnswerIndex = answerOptions.findIndex(option => option.back === answer)
    
    setTimeout(() => {
      incrementFlashcardIndex()
      setCorrectAnswerIndex(-1)
    }, 750)
    
    if(flashcard.back === answer){
      console.log('Correct!')
      setCorrectAnswerIndex(correctAnswerIndex)
      return
    }
    console.log('Wrong')
  }

  return (
    <div className="QuestionCard">
      <div className="question-container">
        <h3 style={{ fontSize: `${dynamicTextSize(flashcard.front)}px` }}>{flashcard.front}</h3>
      </div>
      <div className="answer-container">
        <h3>Choose the correct one</h3>
        <div className='answers'>
          {answerOptions.map((answerOption, index) => (
            <button
              ref={el => buttonsRef.current[index] = el}
              data-index={index +1}
              onClick={() => validate(answerOption.back)}
              key={index}
              className={'answer ' + (correctAnswerIndex === index?'correctAnswer':'')}>
              {answerOption.back}
            </button>
          ))}
        </div>
        <div className='options-container'>
            <button className='standard-button light'>Skip for now</button>
        </div>
      </div>
    </div>
  )
}
export default QuestionCard
