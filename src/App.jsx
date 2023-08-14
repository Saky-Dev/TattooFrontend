import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthContext, { AuthProvider } from './common/context/auth'
import { TempDataProvider } from './common/context/tempData'
import { DetailProvider } from './common/context/detail'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import Tattoo from './pages/tattoo'
import About from './pages/about'
import Branches from './pages/branches'
import Top from './pages/top'
import Login from './pages/login'
import ForgotPassword from './pages/forgot-password'
import Register from './pages/register'
import AdminAccounts from './pages/admin/accounts'
import AdminAddTattoo from './pages/admin/add-tattoo'
import AdminTattoo from './pages/admin/tattoo'
import AdminBranches from './pages/admin/branches'
import PATHS, { ENDPOINTS } from './common/const/paths'
import { DataError, ConnectionError } from './common/const/errors'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.sass'

const AppPreview = () => {
  const auth = useContext(AuthContext)

  const parseCookies = () => {
    const cookies = document.cookie.split(';')
    const jsonCookies = {}

    for (const cookie of cookies) {
      const [key, value] = cookie.split('=')
      jsonCookies[key] = value
    }

    return jsonCookies
  }

  const getCSRFToken = () => {
    fetch(ENDPOINTS.COOKIE, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError() }

        if (!data.success) {
          throw new ConnectionError()
        } else {
          if (!('csrfToken' in data)) { throw new DataError() }
          auth.setCSRFToken(data.csrfToken)
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const validateToken = token => {
    fetch(ENDPOINTS.TOKEN, {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': auth.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('isValid' in data)) { throw new DataError() }

        if (data.isValid) {
          const now = new Date().getTime()
          const expTime = now + 1000 * 60 * 60 * 24 * 3

          auth.user.setToken(token)
          auth.user.setIsAuthenticated(true)

          document.cookie = `token=${token}; path=/; expires=${expTime}`
          document.cookie = `csrfToken=${auth.csrfToken}; path=/; expires=${expTime}`
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  useEffect(() => {
    let cookies = {}

    if (document.cookie) { cookies = parseCookies() }

    if ('csrfToken' in cookies) {
      auth.setCSRFToken(cookies.csrfToken)

      if ('token' in cookies) {
        try {
          validateToken(cookies.token)
        } catch (error) {
          if (error instanceof ConnectionError) { validateToken(cookies.token) }
          if (error instanceof DataError) { console.debug('Unexpected') }
        }
      }
    } else {
      try {
        getCSRFToken()
      } catch (error) {
        if (error instanceof ConnectionError) { validateToken(cookies.token) }
        if (error instanceof DataError) { console.debug('Unexpected') }
      }
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
        <Route path={PATHS.PUBLIC.TOP} element={<Top />} />
        <Route path={PATHS.PUBLIC.ABOUT} element={<About />} />
        <Route path={PATHS.PUBLIC.BRANCHES} element={<Branches />} />
        <Route path={PATHS.AUTH.LOGIN} element={<Login />} />
        <Route path={PATHS.AUTH.FORGOT} element={<ForgotPassword />} />
        <Route path={PATHS.AUTH.REGISTER} element={<Register />} />
        <Route path={PATHS.ADMIN.ACCOUNTS} element={<AdminAccounts />} />
        <Route path={PATHS.ADMIN.ADD} element={<AdminAddTattoo />} />
        <Route path={PATHS.ADMIN.TATTOOS} element={<AdminTattoo />} />
        <Route path={PATHS.ADMIN.BRANCHES} element={<AdminBranches />} />
      </Routes>
      <Footer />
    </>
  )
}

const App = () => (
  <AuthProvider>
    <DetailProvider>
      <TempDataProvider>
        <AppPreview />
      </TempDataProvider>
    </DetailProvider>
  </AuthProvider>
)

export default App
