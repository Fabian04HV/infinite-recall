import '../assets/QuestionCard.css'

export const Stats = ({correctFlashcards, wrongFlashcards}) => {
  const correctCount = correctFlashcards.length
  const wrongCount = wrongFlashcards.length
  const totalFlashcards = correctCount + wrongCount
  const accuracy = correctCount / totalFlashcards * 100

  return(
    <div className="Stats">
      <h1>Congrats you completed your practice</h1>
      <div className='stats-flex-container'>
        <div>
          <p>Accuracy: <span className='accent-text'>{accuracy}%</span></p>
          <p>Correct Answers: <span className='accent-text'>{correctCount}/{totalFlashcards}</span></p>
        </div>
      </div>
      <div>
        {wrongCount > 0 && <>
        <p>Cards you should review: </p>
        <table>
          <thead>
            <tr>
              <th>Front</th>
              <th>Back</th>
            </tr>
          </thead>
          <tbody>
            {wrongFlashcards.map(flashcard => (
              <tr>
                <td>{flashcard.front}</td>
                <td>{flashcard.back}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>}
      </div>
      
      <div className='flex-row-between'>
        <button className='standard-button light'>Home</button>
        <button className='accent-button'>Practice Again</button>
      </div>
    </div>
  )
}