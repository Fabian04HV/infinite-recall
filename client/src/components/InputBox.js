import '../assets/InputBox.css'

function InputBox({type, name, placeholder, onChangeHandler, onFocus, value}){
  return(
    <div className='InputBox'>
        <input onChange={onChangeHandler} onFocus={onFocus} type={type} value={value} name={name} placeholder={placeholder} autoComplete='off'/>
        <span>{placeholder}</span>
        <i></i>
    </div>
  )
}
export default InputBox