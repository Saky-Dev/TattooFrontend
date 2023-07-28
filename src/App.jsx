import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthContext, { AuthProvider } from './common/context/auth'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import './App.sass'

const AppPreview = () => {
  const authValue = useContext(AuthContext)

  useEffect(() => {
    if (document.cookie) { authValue.user.setIsAuthenticated(true) }
  })

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
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
