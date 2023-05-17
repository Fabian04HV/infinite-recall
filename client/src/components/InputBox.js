import '../assets/InputBox.css'

function InputBox({type, name, id, placeholder, onChangeHandler, onFocus, value, min, max, maxLength}){
  return(
    <div className='InputBox'>
        <input onChange={onChangeHandler} onFocus={onFocus} id={id} type={type} value={value} min={min} max={max} maxLength={maxLength} name={name} placeholder={placeholder} autoComplete='off'/>
        <span>{placeholder}</span>
        <i></i>
    </div>
  )
}
export default InputBox