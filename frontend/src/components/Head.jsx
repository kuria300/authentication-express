import { Link } from 'react-router-dom'
import '../App.css'

export const Head = () => {
  return (
    <header className='header-container'>
        <h1 className='heading'><Link to='/'>UniStudent</Link></h1>

        <nav className='nav-container'>
            <ul>
                <li>
                  <Link to='/Login'>Login</Link>
                </li>
                <li>
                  <Link to='/contact'>Contact</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}
