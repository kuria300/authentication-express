import '../App.css'
import { Head } from './Head'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  const [errors, setErrors]= useState([]);
   const [message, setMessage] = useState("");
  
  const handleLogin= async(e)=>{
    e.preventDefault()

    const email= e.target.email.value
    const password= e.target.password.value

    try{
      const response= await axios.post('http://localhost:5000/login', {email, password})
      setErrors([])
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
    <form onSubmit={handleLogin} className='form-container'>
      {errors && errors.length >0 &&(
          errors.map((err, index)=>(
            <p key={index} className='text-red-500'>{err}</p>
          ))
       )}
       {message && (<p className='text-green-500'>{message}</p>)}
        <div className='mb-4'>
            <label>email:</label>
            <input type='email' className='input-form' name='email' />
        </div>
        <div className='mb-4'>
            <label>Password</label>
            <input type='password' className='input-form' name='password' />
        </div>

        <p className='text-white mb-4'>Don't have an account? <Link to='/register' className='text-green-500 px-1'>Register</Link></p>
        <button type="submit" className='btn-form'>Login</button>
      </form>
    </div>
    </>
  )
}
