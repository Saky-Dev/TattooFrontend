import { useContext, useEffect } from 'react'
import AuthContext, { AuthProvider } from './common/context/auth'
import Header from './components/header'
import Footer from './components/footer'
import './App.sass'

const AppPreview = () => {
  const authValue = useContext(AuthContext)

  useEffect(() => {
    if (document.cookie) { authValue.user.setIsAuthenticated(true) }
  })

  return (
    <>
      <Header />
      <Footer />
    </>
  )
}

const App = () => (
  <AuthProvider>
    <AppPreview />
  </AuthProvider>
)

export default App
