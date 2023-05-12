import { useEffect, useState } from 'react'
import '../assets/Flashcard.css'
import dynamicTextSize from '../utils/dynamicTextSize'

function Flashcard(props){
  const {flashcard, rightAnim, leftAnim, animationHandler} = props

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
        <span className='card-text' style={{ fontSize: `${fontSizeFront}px` }}>{front}</span>
        <span className='hint'><svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 96 960 960" width="35"><path d="M465 136q91 0 155.5 63.5T685 354q0 52-22.5 98T599 530h-34v-50q29-23 44.5-56t15.5-70q0-66-47-112t-113-46q-66 0-113 46t-47 112q0 37 15.5 70t44.5 56v72q-56-29-88-82t-32-116q0-91 64.5-154.5T465 136Zm-38 840q-17 0-32-6.5T369 952L204 787q-15-15-14.5-41t20.5-49q20-23 40.5-29.5T295 666l70 16V356q0-42 29-71t71-29q42 0 71 29t29 71v172h26q5 0 9 2t9 4l148 72q24 11 35.5 35.5T799 692l-36 218q-5 29-28 47.5T683 976H427Zm-8-60h281l43-249-183-91h-55V356q0-18-11-29t-29-11q-18 0-29 11t-11 29v399l-154-33-23 23 171 171Zm281 0H419h281Z"/></svg>
        Click to flip the Flashcard
        </span>
      </div>
      <div className="card-back side">
        <span className="card-text" style={{ fontSize: `${fontSizeBack}px` }}>{back}</span>
        <span className='hint'><svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 96 960 960" width="35"><path d="M465 136q91 0 155.5 63.5T685 354q0 52-22.5 98T599 530h-34v-50q29-23 44.5-56t15.5-70q0-66-47-112t-113-46q-66 0-113 46t-47 112q0 37 15.5 70t44.5 56v72q-56-29-88-82t-32-116q0-91 64.5-154.5T465 136Zm-38 840q-17 0-32-6.5T369 952L204 787q-15-15-14.5-41t20.5-49q20-23 40.5-29.5T295 666l70 16V356q0-42 29-71t71-29q42 0 71 29t29 71v172h26q5 0 9 2t9 4l148 72q24 11 35.5 35.5T799 692l-36 218q-5 29-28 47.5T683 976H427Zm-8-60h281l43-249-183-91h-55V356q0-18-11-29t-29-11q-18 0-29 11t-11 29v399l-154-33-23 23 171 171Zm281 0H419h281Z"/></svg>
        Click to flip the Flashcard
        </span>
      </div>
    </div>
  )
}
export default Flashcard