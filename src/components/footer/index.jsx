import { useContext, useState } from 'react'
import AuthContext from '../../common/context/auth'
import CombinedInput from '../combined-input'
import Shortcuts from '../shortcuts'
import { ENDPOINTS } from '../../common/const/paths'
import { ConnectionError, DataError, ValidationError } from '../../common/const/errors'
import { toast } from 'react-toastify'
import { Facebook, Twitter, Instagram } from '../../common/const/static/icons'
import './index.sass'

const Footer = () => {
  const [email, setEmail] = useState('')
  const authValue = useContext(AuthContext)

  const socialMedia = [
    {
      img: Facebook,
      path: 'https://www.facebook.com/shogunink/',
      text: 'Facebook'
    },
    {
      img: Twitter,
      path: 'https://www.twitter.com/shogunink/',
      text: 'Twitter'
    },
    {
      img: Instagram,
      path: 'https://www.instagram.com/shogunink/',
      text: 'Instagram'
    }
  ]

  const contact = [
    'Av. Miguel Hidalgo y Costilla 811,Centro, Guadalajara, Jal. 44200T.',
    '800 607 0027',
    'CONTACTO@SHOGUN.INK'
  ]

  const information = [
    {
      title: 'Información',
      description: ['Ayuda', 'Garantia', 'Privacidad', 'Metodos de pago']
    },
    {
      title: 'Tienda',
      description: ['Productos', 'Novedades', 'Descuentos', 'Mi carrito']
    },
    {
      title: 'Cuenta',
      description: ['Crear cuenta', 'Entrar', 'Reservaciones']
    }
  ]

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.(com|es)$/

    if (!regex.test(email)) {
      throw new ValidationError('El correo no es valido, proporciona un correo gmail, hotmail o outlook')
    }
  }

  const registerEmail = () => {
    fetch(ENDPOINTS.NEWS, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Conten-Type': 'application/json',
        'X-CSRFToken': authValue.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('sucsess' in data)) { throw new DataError('') }

        if (data.success) {
          toast.success('¡Tu subscripcion ha sido completada 😊!')
        } else {
          toast.error('Algo ha salido mal, intentalo nuevamente')
        }
      })
      .catch(() => {
        throw new ConnectionError('Ah ocurrido un error, revisa tu conexión')
      })
  }

  const handleSubmit = e => {
    e.preventDefault()

    try {
      validateEmail()
      registerEmail()
    } catch (error) {
      if (error instanceof ValidationError || error instanceof ConnectionError) {
        toast.error(error.message)
      }

      if (error instanceof DataError) { console.debug('Unexpected') }
    }
  }

  const SubscribeCode = (
    <div className='subscribe'>
      <span>Recibe las ultimas novedades, descuentos y promociones</span>
      <form onSubmit={handleSubmit}>
        <CombinedInput type='email' color='second' setValue={setEmail}>
          Suscribete ahora
        </CombinedInput>
      </form>
      <Shortcuts list={socialMedia} />
    </div>
  )

  const InformationCode = (
    <div className='information'>
      <div className='contact'>
        <span className='title'>Contacto</span>
        <ul className='content'>
          {contact.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='extra'>
        {information.map((item, index) => (
          <div className='list' key={index}>
            <span className='title'>{item.title}</span>
            <ul className='content'>
              {item.description.map((text, i) => (<li key={i}>{text}</li>))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <footer>
      {!authValue.user.isAuthenticated && !authValue.isAuthProcess
        ? SubscribeCode
        : <></>}
      {!authValue.user.isAdminAccess
        ? InformationCode
        : <></>}
      <div className='rights'>
        <span>Todos los derechos reservados SHOGUN.INK © | Terminos de uso | Política de provacidad</span>
        {authValue.user.isAuthenticated || authValue.isAuthProcess
          ? <Shortcuts list={socialMedia} />
          : <></>}
      </div>
    </footer>
  )
}

export default Footer
