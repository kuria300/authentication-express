import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <>
    <div className='div-container'>
    <form className='form-container'>
        <div className='mb-4'>
            <label>Username:</label>
            <input type='text' className='input-form' name='username' />
        </div>
        <div className='mb-4'>
            <label>Password</label>
            <input type='password' className='input-form' name='password' />
        </div>

        <p className='text-white mb-4'>Don't have an account? <Link to='/register' className='text-green-500 px-2'>Register</Link></p>
        <button type="submit" className='btn-form'>Login</button>
      </form>
    </div>
    </>
  )
}
