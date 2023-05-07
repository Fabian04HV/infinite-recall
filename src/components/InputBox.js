import '../assets/InputBox.css'

function InputBox({type, name, placeholder}){
  return(
    <div className='InputBox'>
        <input type={type} name={name} placeholder={placeholder}/>
        <span>{placeholder}</span>
        <i></i>
    </div>
  )
}
export default InputBox