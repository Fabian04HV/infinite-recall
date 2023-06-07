import { useState } from 'react'
import InputBox from '../components/InputBox'
import dynamicTextSize from '../utils/dynamicTextSize'

const stringSimilarity = require('string-similarity');

export const TypeAnswer = (props) => {
  const { currentFlashcardIndex, shuffledFlashcards, incrementFlashcardIndex, saveAnswer } = props
  const flashcard = shuffledFlashcards[currentFlashcardIndex]

  const [answer, setAnswer] = useState('')
  const answerInputHandler = (e) => setAnswer(e.target.value)

  const [feedbackMessage, setFeedbackMessage] = useState('Enter your answer')
  const [feedbackClass, setFeedbackClass] = useState('')

  const validate = (answer) => {
    if(answer.length === 0) return dontKnow();
      
    const compareA = answer.toString().toLowerCase().replace(/\s/g, '');
    const compareB = flashcard.back.toString().toLowerCase().replace(/\s/g, '');

    const similarity = stringSimilarity.compareTwoStrings(compareA, compareB);
    const threshold = 0.80; // Adjust the threshold as per your preference

    if(similarity === 1){
      correctAnswer()
    }
    else if(similarity >= threshold){
      ask(Math.round(similarity*100))
    }
    else{
      wrongAnswer()
    }
  }

  const dontKnow = () =>{
    saveAnswer(flashcard, false, currentFlashcardIndex)
    revealCorrectAnswer()
  }

  const ask = (similarity) => {
    setFeedbackMessage(`Almost!, you decide. Your Answer: "${answer}", flashcard answer: "${flashcard.back}"`)
    setFeedbackClass('ask')
  }

  const correctAnswer = () => {
    saveAnswer(flashcard, true, currentFlashcardIndex)
    setFeedbackMessage('Correct!')
    setFeedbackClass('correct')
    setTimeout(() => nextQuestion(), 850)
  }

  const wrongAnswer = () => {
    saveAnswer(flashcard, false, currentFlashcardIndex)
    setFeedbackMessage(`Wrong, "${flashcard.back}" would have been the correct answer. But that's okay. Just keep going ✌`)
    setFeedbackClass('wrong')
  }

  const countAsWrongAnswer = () => {
    saveAnswer(flashcard, false, currentFlashcardIndex)
    setFeedbackMessage('Count as wrong')
    setFeedbackClass('ask')
    setTimeout(() => nextQuestion(), 850)
  }

  const revealCorrectAnswer = () =>{
    setFeedbackMessage(`Flashcard Answer: ${flashcard.back}`)
    setFeedbackClass('reveal')
  }

  const nextQuestion = () => {
    setFeedbackMessage('Enter your answer')
    setFeedbackClass('')

    incrementFlashcardIndex()
  }

  const answerSubmitHandler = (e) => {
    e.preventDefault()
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
          {feedbackClass === 'wrong' && <button onClick={nextQuestion} className='accent-button'>Got It</button>}
          {feedbackClass === 'reveal' && <button onClick={nextQuestion} className='accent-button'>Got It</button>}
          
          {feedbackClass === 'ask' && <>
            <button onClick={() => countAsWrongAnswer()} className='standard-button light'>Count as wrong</button>
            <button onClick={() => correctAnswer()} className='accent-button'>Count as correct</button>
          </>}

          {feedbackClass === '' && <>
            <div className='standard-button light' onClick={dontKnow}>I don't know</div>
            {answer.length > 0 && <button className='accent-button'>Answer</button>}
          </>}
        </div>
      </form>
    </div>
  )
}