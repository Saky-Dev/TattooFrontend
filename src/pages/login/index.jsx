import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../common/context/auth'
import EmailInput from '../../components/email-input'
import PasswordInput from '../../components/password-input'
import MainButton from '../../components/main-button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.sass'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const authValue = useContext(AuthContext)

  useEffect(() => {
    authValue.setIsAuthProcess(true)

    if (authValue.user.isAuthenticated) {
      authValue.admin.token
        ? window.location.href = '/admin/accounts'
        : window.location.href = '/profile'
    }

    return () => { authValue.setIsAuthProcess(false) }
  }, [])

  const saveUser = token => {
    const now = new Date().getTime()
    const expTime = now + 1000 * 60 * 60 * 24 * 3

    document.cookie = `token=${token}; path=/; expires=${expTime}`
    window.location.href = '/profile'
  }

  const saveAdmin = token => {
    authValue.admin.setToken(token)
    document.cookie = `token=${token}; path=/`
    window.location.href = '/admin/accounts'
  }

  const handleSumbit = e => {
    e.preventDefault()

    console.debug({ email, password })

    fetch('/api/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const saveData = {
          user: saveUser,
          admin: saveAdmin
        }

        if (data.success) {
          saveData[data.type](data.token)
        } else {
          toast.error('Sin registros del usuario', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: 'light'
          })
        }
      })
      .catch(err => console.debug(err))
  }

  return (
    <main className='login'>
      <ToastContainer />
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
