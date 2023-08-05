import { useState } from 'react'
import AuthContext from './context'

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthProcess, setIsAuthProcess] = useState(false)
  const [token, setToken] = useState(null)

  return (
    <AuthContext.Provider value={{
      isAuthProcess,
      setIsAuthProcess,
      user: {
        isAuthenticated,
        setIsAuthenticated
      },
      admin: {
        token,
        setToken
      }
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
