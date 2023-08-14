import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../common/context/auth'
import CombinedInput from '../../components/combined-input'
import TextInput from '../../components/text-input'
import NumberInput from '../../components/number-input'
import EmailInput from '../../components/email-input'
import PasswordInput from '../../components/password-input'
import Selector from '../../components/selector'
import MainButton from '../../components/main-button'
import IconButton from '../../components/icon-button'
import { Link, useNavigate } from 'react-router-dom'
import PATHS, { ENDPOINTS } from '../../common/const/paths'
import { ConnectionError, DataError, ValidationError } from '../../common/const/errors'
import { toast } from 'react-toastify'
import { GENDER, STATES } from '../../common/const/userinfo'
import { Back } from '../../common/const/static/icons'
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
  const [userCode, setUserCode] = useState(undefined)
  const [validationCode, setValidationCode] = useState(undefined)

  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.(com|es)$/
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/

  const validateData = () => {
    let selected = -1
    const messages = [
      'El nombre y el apellido no pueden estar vacios',
      'El correo no es valido, proporciona un correo gmail, hotmail o outlook',
      'La contraseña debe tener numero, letras, y almenos 8 caracteres',
      'Las contraseñas no coinciden',
      'Edad no valida, debes ser mayor de edad',
      'Elige un estado de residencia'
    ]

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

    if (selected >= 0) { throw new ValidationError(messages[selected]) }
  }

  const getValidationCode = () => {
    fetch(ENDPOINTS.GETCODE, {
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
          toast.error('Algo salio mal en el proceso, intentalo de nuevo')
        } else {
          if (!('validationCode' in data)) { throw new DataError() }
          setValidationCode(data.validationCode)
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const handleCodeSubmit = e => {
    e.preventDefault()

    try {
      validateData()
      getValidationCode()
    } catch (error) {
      if (error instanceof DataError) { console.debug('Unexpected') }
      if (error instanceof ValidationError || error instanceof ConnectionError) {
        toast.error(error.message)
      }
    }
  }

  const validCode = () => {
    if (validationCode !== userCode) {
      throw new ValidationError('El código no es correcto')
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
        'X-CSRFToken': auth.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError() }

        if (!data.success) {
          toast.error('Algo salio mal al registrarte, intentalo de nuevo')
        } else {
          toast.success('Registro exitoso')
          setTimeout(() => { navigate(PATHS.AUTH.LOGIN) }, 5000)
        }
      })
      .catch(() => {
        throw new ConnectionError('Ocurrió un error, revisa tu conexión')
      })
  }

  const handleRegisterSubmit = e => {
    e.preventDefault()

    try {
      validCode()
      handleRegister()
    } catch (error) {
      if (error instanceof DataError) { console.debug('Unexpected') }
      if (error instanceof ValidationError || error instanceof ConnectionError) {
        toast.error(error.message)
      }
    }
  }

  const handleBack = () => {
    setValidationCode(undefined)
    setUserCode(undefined)
  }

  useEffect(() => {
    auth.setIsAuthProcess(true)
    return () => { auth.setIsAuthProcess(false) }
  }, [])

  const FirstStepCode = (
    <>
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
      <PasswordInput
        placeholder='Confirmar contraseña'
        setPassword={setConfirmPassword}
      />
      <NumberInput placeholder='Edad' setNumber={setAge} />
      <Selector
        placeholder='Estado'
        options={STATES}
        selected={state}
        setSelected={setState}
      />
      <MainButton>Registrarse</MainButton>
    </>
  )

  const NextStepCode = (
    <>
      <p>Se ha enviado el código de validación a tu correo</p>
      <CombinedInput type='text' placeholder='Código de verificación' setValue={setUserCode}>
        Completar
      </CombinedInput>
    </>
  )

  return (
    <main className='register'>
      <div className='container'>
        {validationCode
          ? <IconButton name='atras' onClick={handleBack} icon={Back} />
          : <></>}
        <div className='title'>
          <span className='logo'>SHOGUN.INK</span>
          <h2>Registrar</h2>
        </div>
        <form
          onSubmit={!validationCode ? handleCodeSubmit : handleRegisterSubmit}
          className={!validationCode ? 'first-step' : 'next-step'}
        >
          {!validationCode ? FirstStepCode : NextStepCode}
        </form>
        <div className='links'>
          <Link to={PATHS.AUTH.LOGIN}>Iniciar sesión</Link>
        </div>
      </div>
    </main>
  )
}

export default Register
