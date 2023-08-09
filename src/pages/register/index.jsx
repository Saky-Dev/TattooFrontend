import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../common/context/auth'
import TextInput from '../../components/text-input'
import NumberInput from '../../components/number-input'
import EmailInput from '../../components/email-input'
import PasswordInput from '../../components/password-input'
import Selector from '../../components/selector'
import MainButton from '../../components/main-button'
import { Link } from 'react-router-dom'
import PATHS from '../../common/const/paths'
import { GENDER, STATES } from '../../common/const/userinfo'
import './index.sass'

const Register = () => {
  const [gender, setGender] = useState(undefined)
  const [state, setState] = useState(undefined)
  const authValue = useContext(AuthContext)

  const handleSubmit = e => {
    e.preventDefault()
  }

  useEffect(() => {
    authValue.setIsAuthProcess(true)
    return () => { authValue.setIsAuthProcess(false) }
  }, [])

  return (
    <main className='register'>
      <div className='container'>
        <div className='title'>
          <span className='logo'>SHOGUN.INK</span>
          <h2>Registrar</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <TextInput placeholder='Nombre' />
          <TextInput placeholder='Apellido' />
          <EmailInput />
          <Selector
            placeholder='Género'
            options={GENDER}
            selected={gender}
            setSelected={setGender}
          />
          <PasswordInput />
          <PasswordInput placeholder='Confirmar contraseña' />
          <NumberInput placeholder='Edad' />
          <Selector
            placeholder='Estado'
            options={STATES}
            selected={state}
            setSelected={setState}
          />
          <MainButton>Registrarse</MainButton>
        </form>
        <div className='links'>
          <Link to={PATHS.AUTH.LOGIN}>Iniciar sesión</Link>
        </div>
      </div>
    </main>
  )
}

export default Register
