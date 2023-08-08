import EmailInput from '../email-input'
import PasswordInput from '../password-input'
import MainButton from '../main-button'
import './index.sass'

const CombinedInput = ({ placeholder = '', type = 'text', color = 'main', setValue = () => {}, children }) => {
  const types = {
    email: <EmailInput setEmail={setValue} placeholder={placeholder || null} />,
    password: <PasswordInput setPassword={setValue} placeholder={placeholder || null} />
  }

  return (
    <div className='combined-input'>
      {types[type]}
      <MainButton color={color}>
        {children}
      </MainButton>
    </div>
  )
}

export default CombinedInput
