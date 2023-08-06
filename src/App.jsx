import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthContext, { AuthProvider } from './common/context/auth'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import Tattoo from './pages/tattoo'
import Login from './pages/login'
import PATHS from './common/const/paths'
import { ToastContainer } from 'react-toastify'
import './App.sass'

const AppPreview = () => {
  const authValue = useContext(AuthContext)

  useEffect(() => {
    if (document.cookie) {
      authValue.user.setIsAuthenticated(true)
    }
  })

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        draggable={false}
        closeOnClick
        pauseOnHover
        theme='light'
      />
      <Header />
      <Routes>
        <Route path={PATHS.PUBLIC.HOME} element={<Home />} />
        <Route path={PATHS.PUBLIC.TATTOOS} element={<Tattoo />} />
        <Route path={PATHS.AUTH.LOGIN} element={<Login />} />
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
