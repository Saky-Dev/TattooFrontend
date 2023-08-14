import { useState } from 'react'
import AuthContext from './context'
import { useNavigate } from 'react-router-dom'
import PATHS, { ENDPOINTS } from '../../const/paths'
import { ConnectionError, DataError } from '../../const/errors'

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthProcess, setIsAuthProcess] = useState(false)
  const [isAdminAccess, setIsAdminAccess] = useState(false)
  const [csrfToken, setCSRFToken] = useState(null)
  const [token, setToken] = useState(null)

  const navigate = useNavigate()

  const clearUserData = () => {
    setIsAuthenticated(false)
    setIsAdminAccess(false)
    setToken(null)

    navigate(PATHS.PUBLIC.HOME)
  }

  const authLoginValidation = () => {
    if (isAuthenticated) {
      token && isAdminAccess
        ? navigate(PATHS.ADMIN.ACCOUNTS)
        : navigate(PATHS.USER.PROFILE)
    }
  }

  const adminRequest = () => {
    fetch(ENDPOINTS.ADMIN.VALIDATE, {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('isAdmin' in data)) { throw new DataError() }
        if (!data.isAdmin) { clearUserData() }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const trustAdminValidation = () => {
    const loader = document.querySelector('div[aria-label="rings-loading"]')

    if (!isAuthenticated || !isAdminAccess || !token) {
      clearUserData()
    } else {
      loader.style.display = 'none'
    }

    try {
      adminRequest()

      return true
    } catch (error) {
      if (error instanceof DataError) { console.debug('Unexpected') }
      if (error instanceof ConnectionError) { console.debug('Connection failed') }
      clearUserData()

      return false
    }
  }

  return (
    <AuthContext.Provider value={{
      isAuthProcess,
      csrfToken,
      setIsAuthProcess,
      setCSRFToken,
      authLoginValidation,
      trustAdminValidation,
      user: {
        isAuthenticated,
        isAdminAccess,
        token,
        setIsAuthenticated,
        setIsAdminAccess,
        setToken
      }
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
