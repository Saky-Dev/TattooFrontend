import { useEffect } from 'react'
import SCOPE from './global/scripts/variables'
import Header from './components/header'
import './App.sass'

const App = () => {
  useEffect(() => {
    if (document.cookie) { SCOPE.isAuthenticated = true }
  })

  return (
    <>
      <Header />
    </>
  )
}

export default App
