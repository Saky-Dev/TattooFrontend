import { useContext, useEffect } from 'react'
import AuthContext, { AuthProvider } from './common/context/auth'
import Header from './components/header'
import './App.sass'

const AppPreview = () => {
  const authValue = useContext(AuthContext)

  useEffect(() => {
    if (document.cookie) { authValue.user.setIsAuthenticated(true) }
  })

  return (
    <>
      <Header />
    </>
  )
}

const App = () => (
  <AuthProvider>
    <AppPreview />
  </AuthProvider>
)

export default App
