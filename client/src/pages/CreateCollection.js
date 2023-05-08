import { useState } from 'react'
import InputBox from '../components/InputBox'
import axios from 'axios'

function CreateCollection(){

  const [title, setTitle] = useState('')
  const [creator, setCreator] = useState('')

  const titleInputHandler = (e) => setTitle(e.target.value)
  const creatorInputHandler = (e) => setCreator(e.target.value)

  const submitHandler = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5005/api/collection/create', {title, creator})
      .then(response => {
        console.log('Create Collection: ', response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <h1>Create Collection</h1>
      <form onSubmit={submitHandler}>
        <InputBox 
          type='text'
          name='title'
          placeholder='Collection Title'
          onChangeHandler={titleInputHandler}
        />
        <InputBox 
          type='text'
          name='Creator'
          placeholder='Creator'
          onChangeHandler={creatorInputHandler}
        />
        <button className='standard-button'>Create Collection</button>
      </form>
      

    </>
  )
}
export default CreateCollection