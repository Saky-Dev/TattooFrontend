import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthContext, { AuthProvider } from './common/context/auth'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import Tattoo from './pages/tattoo'
import Login from './pages/login'
import PATHS, { ENDPOINTS } from './common/const/paths'
import { DataError, ConnectionError } from './common/const/errors'
import { ToastContainer } from 'react-toastify'
import './App.sass'

const AppPreview = () => {
  const authValue = useContext(AuthContext)

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
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (!('csrfToken' in data)) {
          throw new DataError('')
        }

        authValue.user.setCSRFToken(data.csrfToken)
      })
      .catch(() => {
        throw new ConnectionError('')
      })
  }

  const validateToken = token => {
    fetch(ENDPOINTS.TOKEN, {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': authValue.user.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('isValid' in data)) {
          throw new DataError('')
        }

        if (data.isValid) {
          authValue.user.setToken(token)
          authValue.user.setIsAuthenticated(true)
        }
      }).catch(() => {
        throw new ConnectionError('')
      })
  }

  useEffect(() => {
    let cookies = {}
    const onActionOnError = {
      ConnectionError: (repeatFunction = () => {}) => {
        repeatFunction()
      },
      DataError: () => {
        console.debug('Unexpected')
      }
    }

    if (document.cookie) {
      cookies = parseCookies()
    }

    if ('CSRFToken' in cookies) {
      authValue.user.setCSRFToken(cookies.CSRFToken)

      if ('token' in cookies) {
        try {
          validateToken(cookies.token)
        } catch (error) {
          if (error.name in onActionOnError) {
            onActionOnError[error.name](() => { validateToken(cookies.token) })
          }
        }
      }
    } else {
      try {
        getCSRFToken()
      } catch (error) {
        if (error.name in onActionOnError) {
          onActionOnError[error.name](() => { getCSRFToken() })
        }
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
