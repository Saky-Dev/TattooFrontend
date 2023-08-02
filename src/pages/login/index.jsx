import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../common/context/auth'
import EmailInput from '../../components/email-input'
import PasswordInput from '../../components/password-input'
import MainButton from '../../components/main-button'
import './index.sass'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const authValue = useContext(AuthContext)

  useEffect(() => {
    authValue.user.setIsAuthenticated(true)
    return () => { authValue.user.setIsAuthenticated(false) }
  }, [])

  const handleSumbit = e => {
    e.preventDefault()

    console.log({ email, password })

    /* fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          authValue.user.setUser(data.user)
        } else {
          window.alert(data.message)
        }
      })
      .catch(err => console.log(err)) */
  }

  return (
    <main className='login'>
      <div className='container'>
        <div className='title'>
          <span className='logo'>SHOGUN.INK</span>
          <h2>Iniciar sesion</h2>
        </div>
        <form onSubmit={handleSumbit}>
          <EmailInput setEmail={setEmail} />
          <PasswordInput setPassword={setPassword} />
          <MainButton>Entrar</MainButton>
        </form>
        <div className='links'>
          <Link to='/forgot-password'>¿Olvidaste tu contraseña?</Link>
          <div className='separator' />
          <Link to='/register'>Registrarse</Link>
        </div>
      </div>
    </main>
  )
}

export default Login
