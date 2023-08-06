import { useState } from 'react'
import TempDataContext from './context'

const TempDataProvider = ({ children }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [category, setCategory] = useState('')

  return (
    <TempDataContext.Provider value={{
      email,
      password,
      category,
      setEmail,
      setPassword,
      setCategory
    }}
    >
      {children}
    </TempDataContext.Provider>
  )
}

export default TempDataProvider
