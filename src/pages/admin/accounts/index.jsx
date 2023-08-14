import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../common/context/auth'
import TextInput from '../../../components/text-input'
import PasswordInput from '../../../components/password-input'
import CombinedInput from '../../../components/combined-input'
import IconButton from '../../../components/icon-button'
import Loader from '../../../components/loader'
import PATH, { ENDPOINTS } from '../../../common/const/paths'
import { ValidationError, ConnectionError, DataError } from '../../../common/const/errors'
import { toast } from 'react-toastify'
import { Trash } from '../../../common/const/static/icons'
import './index.sass'

const AdminAccounts = () => {
  const [accounts, setAccounts] = useState(['main.1@shogun.ink', 'main.2@shogun.ink', 'main.3@shogun.ink', 'main.4@shogun.ink'])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const authValue = useContext(AuthContext)
  const navigate = useNavigate()

  const emailRegex = /^[a-zA-Z0-9.]+$/
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/

  const clearData = () => {
    authValue.user.setIsAuthenticated(false)
    authValue.user.setIsAdminAccess(false)
    authValue.user.setToken(null)

    navigate(PATH.PUBLIC.HOME)
  }

  const getAccounts = () => {
    fetch(ENDPOINTS.ADMIN.ACCOUNTS, {
      method: 'GET',
      headers: { 'X-CSRFToken': authValue.csrfToken }
    })
      .then(response => response.json())
      .then(data => {
        if (!('accounts' in data)) { throw new DataError('') }

        setAccounts(data.accounts)
      })
      .catch(() => { throw new ConnectionError('') })
  }

  const validateAdmin = () => {
    fetch(ENDPOINTS.ADMIN.VALIDATE, {
      method: 'POST',
      body: JSON.stringify({ token: authValue.user.token }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': authValue.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('isAdmin' in data)) { throw new DataError('') }

        data.isAdmin
          ? getAccounts()
          : clearData()
      })
      .catch(() => { throw new ConnectionError('') })
  }

  const removeAdmin = account => {
    fetch(ENDPOINTS.ADMIN.REMOVEACOUNT, {
      method: 'POST',
      body: JSON.stringify({ email: account }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': authValue.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError('') }

        if (!data.success) {
          toast.error('No se pudo eliminar el administrador')
        } else {
          toast.error(`Se ha eliminado a ${account}`)
          const temp = accounts.filter(item => item !== account)
          setAccounts(temp)
        }
      })
  }

  const validateData = () => {
    let selected = -1
    const messages = [
      'El correo no es valido, usa solo letras, numeros y punto',
      'La contraseña debe tener numero, letras, y almenos 8 caracteres',
      'Las contraseñas no coinciden'
    ]

    if (!emailRegex.test(email)) {
      selected = 0
    } else if (!passwordRegex.test(password) || password.length < 8) {
      selected = 1
    } else if (password !== confirmPassword) {
      selected = 2
    }

    if (selected >= 0) { throw new ValidationError(messages[selected]) }
  }

  const addAdminAccount = () => {
    fetch(ENDPOINTS.ADMIN.ADDACOUNT, {
      method: 'POST',
      body: JSON.stringify({ email: `${email}@shogun.ink`, password }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': authValue.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError('') }

        if (!data.success) {
          toast.error('No se pudo registrar el administrador')
        } else {
          toast.success('Registro completado')

          setAccounts([...accounts, `${email}@shogun.ink`])

          setEmail('')
          setPassword('')
          setConfirmPassword('')
        }
      })
      .catch(() => {
        throw new ConnectionError('Ocurrió un error, revisa tu conexión')
      })
  }

  const handleSubmit = e => {
    e.preventDefault()

    try {
      validateData()
      addAdminAccount()
    } catch (error) {
      if (error instanceof DataError) { console.debug('Unexpected') }
      if (error instanceof ValidationError || error instanceof ConnectionError) {
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    const loader = document.querySelector('div[aria-label="rings-loading"]')

    if (!authValue.user.isAuthenticated || !authValue.user.isAdminAccess || !authValue.user.token) {
      clearData()
    } else {
      loader.style.display = 'none'
    }

    try {
      validateAdmin()
    } catch (error) {
      // clearData()
      if (error instanceof DataError) { console.debug('Unexpected') }
      if (error instanceof ConnectionError) { console.debug('Connection failed') }
    }
  }, [])

  return (
    <main className='admin accounts'>
      <Loader />
      <section className='existing'>
        <h2>Cuentas</h2>
        <div className='accounts-list'>
          {accounts.map((account, index) => (
            <div className='account' key={index}>
              <p><b>Usuario: </b>{account}</p>
              <IconButton
                icon={Trash}
                color='main'
                name='eliminar'
                onClick={removeAdmin(account)}
              />
            </div>
          ))}
        </div>
      </section>
      <section className='add'>
        <h2>Agregar</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            complement='@shogun.ink'
            placeholder='Correo'
            setValue={setEmail}
          />
          <PasswordInput setPassword={setPassword} />
          <CombinedInput
            type='password'
            placeholder='Confirmar contraseña'
            setValue={setConfirmPassword}
          >
            Agregar
          </CombinedInput>
        </form>
      </section>
    </main>
  )
}

export default AdminAccounts
