import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../../common/context/auth'
import EmailInput from '../../components/email-input'
import PasswordInput from '../../components/password-input'
import MainButton from '../../components/main-button'
import { toast } from 'react-toastify'
import PATHS, { ENDPOINTS } from '../../common/const/paths'
import { ConnectionError, DataError } from '../../common/const/errors'
import './index.sass'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    auth.setIsAuthProcess(true)
    auth.authLoginValidation()
    return () => { auth.setIsAuthProcess(false) }
  }, [])

  const saveUser = token => {
    const now = new Date().getTime()
    const expTime = now + 1000 * 60 * 60 * 24 * 3

    auth.user.setToken(token)
    auth.user.setIsAuthenticated(true)
    document.cookie = `token=${token}; path=/; expires=${expTime}`
    navigate(PATHS.USER.PROFILE)
  }

  const saveAdmin = token => {
    auth.user.setToken(token)
    auth.user.setIsAuthenticated(true)
    auth.user.setIsAdminAccess(true)
    navigate(PATHS.ADMIN.ACCOUNTS)
  }

  const login = () => {
    fetch(ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': auth.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError() }

        if (!data.success) {
          toast.error('Sin registros del usuario')
        } else {
          if (!('type' in data) || !('token' in data)) { throw new DataError() }

          toast.success('Acceso correcto')
          if (data.type === 'admin') { saveAdmin(data.token) }
          if (data.type === 'user') { saveUser(data.token) }
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const handleSubmit = e => {
    e.preventDefault()

    try {
      login()
    } catch (error) {
      if (error instanceof ConnectionError) { toast.error(error.message) }
      if (error instanceof DataError) { console.debug('Unexpected') }
    }
  }

  return (
    <main className='login'>
      <div className='container'>
        <div className='title'>
          <span className='logo'>SHOGUN.INK</span>
          <h2>Iniciar sesion</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <EmailInput setEmail={setEmail} />
          <PasswordInput setPassword={setPassword} />
          <MainButton>Entrar</MainButton>
        </form>
        <div className='links'>
          <Link to={PATHS.AUTH.FORGOT}>¿Olvidaste tu contraseña?</Link>
          <div className='separator' />
          <Link to={PATHS.AUTH.REGISTER}>Registrarse</Link>
        </div>
      </div>
    </main>
  )
}

export default Login
