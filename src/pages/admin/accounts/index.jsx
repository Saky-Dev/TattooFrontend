import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../common/context/auth'
// import TextInput from '../../../components/text-input'
// import PasswordInput from '../../../components/password-input'
// import CombinedInput from '../../../components/combined-input'
import IconButton from '../../../components/icon-button'
import PATH, { ENDPOINTS } from '../../../common/const/paths'
import { ConnectionError, DataError } from '../../../common/const/errors'
import { Trash } from '../../../common/const/static/icons'
import './index.sass'

const AdminAccounts = () => {
  const [accounts, setAccounts] = useState(['main.1@shogun.ink', 'main.2@shogun.ink', 'main.3@shogun.ink', 'main.4@shogun.ink'])
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')

  const authValue = useContext(AuthContext)
  const navigate = useNavigate()

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

  const handleSubmit = () => {

  }

  useEffect(() => {
    if (!authValue.user.isAuthenticated || !authValue.user.isAdminAccess || !authValue.user.token) {
      clearData()
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
                onClick={() => {}}
              />
            </div>
          ))}
        </div>
      </section>
      <section className='add'>
        <h2>Agregar</h2>
        <form onSubmit={handleSubmit} />
      </section>
    </main>
  )
}

export default AdminAccounts
