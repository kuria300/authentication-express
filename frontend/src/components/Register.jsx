import '../App.css'
import { Head } from './Head'

export const Register = () => {
  return (
    <>
    <Head />

  <div className='div-container'>
    <form className='form-container'>
        <div className='mb-4'>
            <label>Email</label>
            <input type='email' className='input-form' name='username' />
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
