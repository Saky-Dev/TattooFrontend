import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../common/context/auth'
import CombinedInput from '../../components/combined-input'
import PATHS, { ENDPOINTS } from '../../common/const/paths'
import { ConnectionError, DataError, ValidationError } from '../../common/const/errors'
import { toast } from 'react-toastify'
import './index.sass'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const authValue = useContext(AuthContext)

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.(com|es)$/

    if (!regex.test(email)) { throw new ValidationError('El correo no es valido, proporciona un correo gmail, hotmail o outlook') }
  }

  const sendEmail = () => {
    fetch(ENDPOINTS.FORGOT, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': authValue.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) {
          throw new DataError('')
        }

        if (!data.success) {
          toast.error('No hay registros del correo')
        } else {
          toast.success('Se ha enviado un correo con la contraseña')

          setTimeout(() => {
            navigate(PATHS.LOGIN)
          }, 5000)
        }
      })
      .catch(() => {
        throw new ConnectionError('Ha ocurrido un error, revisa tu conexión')
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    try {
      validateEmail()
      sendEmail()
    } catch (error) {
      if (error instanceof ValidationError || error instanceof ConnectionError) {
        toast.error(error.message)
      }

      if (error instanceof DataError) {
        console.debug('Unexpected')
      }
    }
    navigate(PATHS.LOGIN)
  }

  return (
    <main className='forgot-password'>
      <div className='container'>
        <div className='title'>
          <span className='logo'>SHOGUN.INK</span>
          <h2>Recuperar contraseña</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <p>Proporciona tu correo y la contraseña sera enviada a traves de el</p>
          <CombinedInput type='email' setValue={setEmail}>
            Enviar
          </CombinedInput>
        </form>
      </div>
    </main>
  )
}

export default ForgotPassword
