import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../common/context/auth'
import TextInput from '../../components/text-input'
import NumberInput from '../../components/number-input'
import EmailInput from '../../components/email-input'
import PasswordInput from '../../components/password-input'
import Selector from '../../components/selector'
import MainButton from '../../components/main-button'
import { Link } from 'react-router-dom'
import PATHS, { ENDPOINTS } from '../../common/const/paths'
import { ConnectionError, DataError, ValidationError } from '../../common/const/errors'
import { toast } from 'react-toastify'
import { GENDER, STATES } from '../../common/const/userinfo'
import './index.sass'

const Register = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState(undefined)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [age, setAge] = useState(undefined)
  const [state, setState] = useState(undefined)
  const [validationCode, setValidationCode] = useState(undefined)

  const authValue = useContext(AuthContext)

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.(com|es)$/
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/

  const validateData = () => {
    const messages = [
      'El nombre y el apellido no pueden estar vacios',
      'El correo no es valido, proporciona un correo gmail, hotmail o outlook',
      'La contraseña debe tener numero, letras, y almenos 8 caracteres',
      'Las contraseñas no coinciden',
      'Edad no valida, debes ser mayor de edad',
      'Elige un estado de residencia'
    ]
    let selected = -1

    if (name.length < 1 || lastName.length < 1) {
      selected = 0
    } else if (!emailRegex.test(email)) {
      selected = 1
    } else if (!passwordRegex.test(password) || password.length < 8) {
      selected = 2
    } else if (password !== confirmPassword) {
      selected = 3
    } else if (age === undefined || age < 18 || age > 100) {
      selected = 4
    } else if (state === undefined) {
      selected = 5
    }

    if (selected >= 0) {
      throw new ValidationError(messages[selected])
    }
  }

  const handleRegister = () => {
    const userData = {
      name,
      lastName,
      email,
      gender: gender || '',
      password,
      age,
      state
    }

    fetch(ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': authValue.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data) || !('validationCode' in data)) {
          throw new DataError('')
        }

        if (!data.sucess) {
          toast.error('Algo salio mal al registrarte, intentalo de nuevo')
        } else {
          toast.success('Registro exitoso')
          setValidationCode(data.validationCode)
        }
      })
      .catch(() => {
        throw new ConnectionError('Ah ocurrido un error, revisa tu conexión')
      })
  }

  const handleSubmit = e => {
    e.preventDefault()

    try {
      validateData()
      handleRegister()
    } catch (error) {
      if (error instanceof ValidationError || error instanceof ConnectionError) {
        toast.error(error.message)
      }

      if (error instanceof DataError) {
        console.debug('Unexpected')
      }
    }
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
          <TextInput placeholder='Nombre' setValue={setName} />
          <TextInput placeholder='Apellido' setValue={setLastName} />
          <EmailInput setEmail={setEmail} />
          <Selector
            placeholder='Género'
            options={GENDER}
            selected={gender}
            setSelected={setGender}
          />
          <PasswordInput setPassword={setPassword} />
          <PasswordInput placeholder='Confirmar contraseña' setPassword={setConfirmPassword} />
          <NumberInput placeholder='Edad' setNumber={setAge} />
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
