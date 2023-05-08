import '../assets/InputBox.css'

function InputBox({type, name, placeholder, onChangeHandler, onFocus}){
  return(
    <div className='InputBox'>
        <input onChange={onChangeHandler} onFocus={onFocus} type={type} name={name} placeholder={placeholder}/>
        <span>{placeholder}</span>
        <i></i>
    </div>
  )
}
export default InputBox