import { Fragment, useContext } from 'react'
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

  const subscribe = () => (
    <div className='subscribe'>
      <span>Recibe las ultimas novedades, descuentos y promociones</span>
      <CombinedInput type='email' color='second'>
        Suscribete ahora
      </CombinedInput>
      <Shortcuts list={socialMedia} />
    </div>
  )

  return (
    <footer>
      {!authValue.user.isAuthenticated
        ? subscribe()
        : <></>}
      <div className='information' />
      <div className='rights' />
    </footer>
  )
}

export default Footer
