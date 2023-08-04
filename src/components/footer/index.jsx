import { useContext } from 'react'
import AuthContext from '../../common/context/auth'
import CombinedInput from '../combined-input'
import Shortcuts from '../shortcuts'
import facebook from '../../assets/icons/brand-facebook-filled.svg'
import twitter from '../../assets/icons/brand-twitter-filled.svg'
import instagram from '../../assets/icons/brand-instagram.svg'
import './index.sass'

const Footer = () => {
  const authValue = useContext(AuthContext)

  const socialMedia = [
    {
      img: facebook,
      path: 'https://www.facebook.com/shogunink/',
      text: 'Facebook'
    },
    {
      img: twitter,
      path: 'https://www.twitter.com/shogunink/',
      text: 'Twitter'
    },
    {
      img: instagram,
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

  const handleSubmit = e => e.preventDefault()

  const getSubscribe = () => (
    <div className='subscribe'>
      <span>Recibe las ultimas novedades, descuentos y promociones</span>
      <form onSubmit={handleSubmit}>
        <CombinedInput type='email' color='second'>
          Suscribete ahora
        </CombinedInput>
      </form>
      <Shortcuts list={socialMedia} />
    </div>
  )

  const getInformation = () => (
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
        ? getSubscribe()
        : <></>}
      {!authValue.admin.isLoggedIn
        ? getInformation()
        : <></>}
      <div className='rights'>
        <span>Todos los derechos reservados SHOGUN.INK © | Terminos de uso | Política de provacidad</span>
        {authValue.admin.isLoggedIn
          ? <Shortcuts list={socialMedia} />
          : <></>}
      </div>
    </footer>
  )
}

export default Footer
