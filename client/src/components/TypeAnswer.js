import { useState } from 'react'
import InputBox from '../components/InputBox'
import dynamicTextSize from '../utils/dynamicTextSize'

export const TypeAnswer = (props) => {
  const { currentFlashcardIndex, shuffledFlashcards, incrementFlashcardIndex, saveAnswer } = props
  const flashcard = shuffledFlashcards[currentFlashcardIndex]

  const [answer, setAnswer] = useState('')
  const answerInputHandler = (e) => setAnswer(e.target.value)

  const [feedbackMessage, setFeedbackMessage] = useState('Enter your answer')
  const [feedbackClass, setFeedbackClass] = useState('')

  const validate = (answer) => {
    if(answer.length === 0) return dontKnow();
      

    const compareA = answer.toString().toLowerCase().trim()
    const compareB = flashcard.back.toString().toLowerCase().trim()

    if(compareA === compareB){
      correctAnswer()
    }
    else{
      wrongAnswer()
    }
  }

  const dontKnow = () =>{
    saveAnswer(flashcard, false)
    revealCorrectAnswer()
  }

  const correctAnswer = () => {
    saveAnswer(flashcard, true)
    console.log('CORRECT!')

    setFeedbackMessage('Correct!')
    setFeedbackClass('correct')
    setTimeout(() => nextQuestion(), 850)
  }

  const wrongAnswer = () => {
    saveAnswer(flashcard, false)
    console.log('WRONG')

    setFeedbackMessage("Wrong answer, but that's okay. Just keep going ✌")
    setFeedbackClass('wrong')
  }

  const revealCorrectAnswer = () =>{
    setFeedbackMessage(`Correct Answer: ${flashcard.back}`)
    setFeedbackClass('reveal')
  }

  const nextQuestion = () => {
    setFeedbackMessage('Enter your answer')
    setFeedbackClass('')

    incrementFlashcardIndex()
  }


  const answerSubmitHandler = (e) => {
    e.preventDefault()
    console.log('ANSWER: ', answer)
    validate(answer)
  }

  return(
    <div className='TypeAnswer'>
      <div className='question-container'>
        <h3 style={{ fontSize: `${dynamicTextSize(flashcard.front)}rem` }}>{flashcard.front}</h3>
      </div>
      <form onSubmit={answerSubmitHandler} className='answer-container'>
      <h3 className={`feedback ${feedbackClass}`}>{feedbackMessage}</h3>
        <InputBox
          type='text'
          name='answer'
          placeholder='Enter your Answer'
          value={answer}
          onChangeHandler={answerInputHandler}
        />
        <div className='options-container'>
          
          {feedbackClass === 'wrong' || feedbackClass === 'reveal' ? <><button onClick={nextQuestion} className='accent-button'>Got It</button></>
          :
          <>
          <div className='standard-button light' onClick={dontKnow}>I don't know</div>
          {answer.length > 0 && <button className='accent-button'>Answer</button>}
          </>}
        </div>
      </form>
    </div>
  )
}