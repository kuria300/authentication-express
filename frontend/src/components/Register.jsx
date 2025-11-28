import '../App.css'
import { Head } from './Head'
import axios from 'axios'
import { useState } from 'react'

export const Register = () => {
  const [errors, setErrors]=useState([])
  const [message, setMessage] = useState("");

  const handleSubmit= async(e)=>{
    e.preventDefault();

    const formData= new FormData(e.target)
    const email= formData.get('email')
    const password= formData.get('password')

    try{
       const response= await axios.post('http://localhost:5000/register', {email, password})
       setErrors([])
       console.log(response)
       setMessage(response.data.message)

       
    }catch(error){
      setMessage('')
       if(error.response && error.response.data && error.response.data.errors){
         setErrors(error.response.data.errors)
       }
      console.log('Errors', error.message)
    }
  }
  return (
    <>
    <Head />

  <div className='div-container'>
    <form onSubmit={handleSubmit} className='form-container'>
       {errors && errors.length >0 &&(
          errors.map((err, index)=>(
            <p key={index} className='text-red-500'>{err}</p>
          ))
       )}
       {message && (<p className='text-green-500'>{message}</p>)}
        <div className='mb-4'>
            <label>Email</label>
            <input type='email' className='input-form' name='email' />
        </div>
        <div className='mb-4'>
            <label>Password</label>
            <input type='password' className='input-form' name='password' />
        </div>
        <button type="submit" className='btn-form'>Sign in</button>
      </form>
    </div>
  </>
  )
}
