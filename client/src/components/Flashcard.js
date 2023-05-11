import { useEffect, useState } from 'react'
import '../assets/Flashcard.css'
import dynamicTextSize from '../utils/dynamicTextSize'

function Flashcard(props){
  const {flashcard, editable, rightAnim, leftAnim, animationHandler} = props

  const front = flashcard.front 
  const back = flashcard.back

  const fontSizeFront = dynamicTextSize(front)
  const fontSizeBack = dynamicTextSize(back)

  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
  }, [front, back])

  return(
    <div onAnimationEnd={() => { animationHandler() }} className={`Flashcard ${flipped ? 'flipped' : ''} ${rightAnim ? 'FlashcardRightIn' : ''} ${leftAnim ? 'FlashcardLeftIn' : ''}`} onClick={() => setFlipped(!flipped)}>
      <div className="card-front side">
        {editable && <div className='card-options'>
        <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M794 390 666 262l42-42q17-17 42.5-16.5T793 221l43 43q17 17 17 42t-17 42l-42 42ZM150 936q-13 0-21.5-8.5T120 906v-86q0-6 2-11t7-10l495-495 128 128-495 495q-5 5-10 7t-11 2h-86Z"/></svg>
        <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M261 936q-24 0-42-18t-18-42V306h-11q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T190 246h158q0-13 8.625-21.5T378 216h204q12.75 0 21.375 8.625T612 246h158q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T770 306h-11v570q0 24-18 42t-42 18H261Zm106-176q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T427 760V421q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T367 421v339Zm166 0q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T593 760V421q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T533 421v339Z"/></svg>
        </div>}
        
        <span className='card-text' style={{ fontSize: `${fontSizeFront}px` }}>{front}</span>
        <span className='hint'><svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 96 960 960" width="35"><path d="M465 136q91 0 155.5 63.5T685 354q0 52-22.5 98T599 530h-34v-50q29-23 44.5-56t15.5-70q0-66-47-112t-113-46q-66 0-113 46t-47 112q0 37 15.5 70t44.5 56v72q-56-29-88-82t-32-116q0-91 64.5-154.5T465 136Zm-38 840q-17 0-32-6.5T369 952L204 787q-15-15-14.5-41t20.5-49q20-23 40.5-29.5T295 666l70 16V356q0-42 29-71t71-29q42 0 71 29t29 71v172h26q5 0 9 2t9 4l148 72q24 11 35.5 35.5T799 692l-36 218q-5 29-28 47.5T683 976H427Zm-8-60h281l43-249-183-91h-55V356q0-18-11-29t-29-11q-18 0-29 11t-11 29v399l-154-33-23 23 171 171Zm281 0H419h281Z"/></svg>
        Click to flip the Flashcard
        </span>
      </div>
      <div className="card-back side">
        {editable && <div className='card-options'>
        <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M794 390 666 262l42-42q17-17 42.5-16.5T793 221l43 43q17 17 17 42t-17 42l-42 42ZM150 936q-13 0-21.5-8.5T120 906v-86q0-6 2-11t7-10l495-495 128 128-495 495q-5 5-10 7t-11 2h-86Z"/></svg>
        <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M261 936q-24 0-42-18t-18-42V306h-11q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T190 246h158q0-13 8.625-21.5T378 216h204q12.75 0 21.375 8.625T612 246h158q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T770 306h-11v570q0 24-18 42t-42 18H261Zm106-176q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T427 760V421q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T367 421v339Zm166 0q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T593 760V421q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T533 421v339Z"/></svg>
        </div>}
        <span className="card-text" style={{ fontSize: `${fontSizeBack}px` }}>{back}</span>
        <span className='hint'><svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 96 960 960" width="35"><path d="M465 136q91 0 155.5 63.5T685 354q0 52-22.5 98T599 530h-34v-50q29-23 44.5-56t15.5-70q0-66-47-112t-113-46q-66 0-113 46t-47 112q0 37 15.5 70t44.5 56v72q-56-29-88-82t-32-116q0-91 64.5-154.5T465 136Zm-38 840q-17 0-32-6.5T369 952L204 787q-15-15-14.5-41t20.5-49q20-23 40.5-29.5T295 666l70 16V356q0-42 29-71t71-29q42 0 71 29t29 71v172h26q5 0 9 2t9 4l148 72q24 11 35.5 35.5T799 692l-36 218q-5 29-28 47.5T683 976H427Zm-8-60h281l43-249-183-91h-55V356q0-18-11-29t-29-11q-18 0-29 11t-11 29v399l-154-33-23 23 171 171Zm281 0H419h281Z"/></svg>
        Click to flip the Flashcard
        </span>
      </div>
    </div>
  )
}
export default Flashcard