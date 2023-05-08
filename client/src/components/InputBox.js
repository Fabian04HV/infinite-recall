import '../assets/InputBox.css'

function InputBox({type, name, placeholder, onChangeHandler}){
  return(
    <div className='InputBox'>
        <input onChange={onChangeHandler} type={type} name={name} placeholder={placeholder}/>
        <span>{placeholder}</span>
        <i></i>
    </div>
  )
}
export default InputBox