import { Fragment, useContext } from 'react'
import AuthContext from '../../common/context/auth'
import CombinedInput from '../combined-input'

const Footer = () => {
  const authValue = useContext(AuthContext)

  const subscribe = () => (
    <div className='subcribe'>
      <span>Recibe las ultimas novedades, descuentos y promociones</span>
      <CombinedInput type='email' color='second'>
        Suscribete ahora
      </CombinedInput>
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
