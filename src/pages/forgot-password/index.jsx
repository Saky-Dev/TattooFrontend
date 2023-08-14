import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../../common/context/auth'
import CombinedInput from '../../components/combined-input'
import PATHS, { ENDPOINTS } from '../../common/const/paths'
import { ConnectionError, DataError, ValidationError } from '../../common/const/errors'
import { toast } from 'react-toastify'
import './index.sass'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const auth = useContext(AuthContext)

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.(com|es)$/
    if (!regex.test(email)) {
      throw new ValidationError('El correo no es valido, proporciona un correo gmail, hotmail o outlook')
    }
  }

  const sendEmail = () => {
    fetch(ENDPOINTS.FORGOT, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': auth.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError() }

        if (!data.success) {
          toast.error('No hay registros del correo')
        } else {
          toast.success('Se ha enviado un correo con la contraseña')
          setTimeout(() => { navigate(PATHS.LOGIN) }, 5000)
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const handleSubmit = e => {
    e.preventDefault()

    try {
      validateEmail()
      sendEmail()
      navigate(PATHS.LOGIN)
    } catch (error) {
      if (error instanceof DataError) { console.debug('Unexpected') }
      if (error instanceof ValidationError || error instanceof ConnectionError) {
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    auth.setIsAuthProcess(true)
    auth.authLoginValidation()
    return () => { auth.setIsAuthProcess(false) }
  }, [])

  return (
    <main className='forgot-password'>
      <div className='container'>
        <div className='title'>
          <span className='logo'>SHOGUN.INK</span>
          <h2>Recuperar contraseña</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <p>Proporciona tu correo, se enviará la contraseña a él</p>
          <CombinedInput type='email' setValue={setEmail}>
            Enviar
          </CombinedInput>
        </form>
        <div className='links'>
          <Link to={PATHS.AUTH.LOGIN}>Iniciar sesión</Link>
        </div>
      </div>
    </main>
  )
}

export default ForgotPassword
