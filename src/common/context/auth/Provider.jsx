import { useState } from 'react'
import AuthContext from './Context'

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [id, setId] = useState(null)

  return (
    <AuthContext.Provider value={{
      user: {
        isAuthenticated,
        setIsAuthenticated
      },
      admin: {
        isLoggedIn,
        id,
        setIsLoggedIn,
        setId
      }
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
