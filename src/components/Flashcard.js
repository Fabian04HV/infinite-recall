import '../assets/Flashcard.css'
import dynamicTextSize from '../utils/dynamicTextSize'

function Flashcard({flashcard}){
  const editable = true

  const front = flashcard.front 
  const back = flashcard.back

  const fontSizeFront = dynamicTextSize(front)
  const fontSizeBack = dynamicTextSize(back)

  return(
    <div className="Flashcard">
      <div className="card-front side">
        {editable && <div className='card-options'>
        <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M794 390 666 262l42-42q17-17 42.5-16.5T793 221l43 43q17 17 17 42t-17 42l-42 42ZM150 936q-13 0-21.5-8.5T120 906v-86q0-6 2-11t7-10l495-495 128 128-495 495q-5 5-10 7t-11 2h-86Z"/></svg>
        <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M261 936q-24 0-42-18t-18-42V306h-11q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T190 246h158q0-13 8.625-21.5T378 216h204q12.75 0 21.375 8.625T612 246h158q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T770 306h-11v570q0 24-18 42t-42 18H261Zm106-176q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T427 760V421q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T367 421v339Zm166 0q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T593 760V421q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T533 421v339Z"/></svg>
        </div>}
        
        <span className='card-text' style={{ fontSize: `${fontSizeFront}px` }}>{front}</span>
        
      </div>
      <div className="card-back side">
        {editable && <div className='card-options'>
        <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M794 390 666 262l42-42q17-17 42.5-16.5T793 221l43 43q17 17 17 42t-17 42l-42 42ZM150 936q-13 0-21.5-8.5T120 906v-86q0-6 2-11t7-10l495-495 128 128-495 495q-5 5-10 7t-11 2h-86Z"/></svg>
        <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M261 936q-24 0-42-18t-18-42V306h-11q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T190 246h158q0-13 8.625-21.5T378 216h204q12.75 0 21.375 8.625T612 246h158q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T770 306h-11v570q0 24-18 42t-42 18H261Zm106-176q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T427 760V421q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T367 421v339Zm166 0q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T593 760V421q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T533 421v339Z"/></svg>
        </div>}
        <span className="card-text" style={{ fontSize: `${fontSizeBack}px` }}>{back}</span>
      </div>
    </div>
  )
}
export default Flashcard