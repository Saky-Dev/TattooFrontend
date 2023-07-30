import EmailInput from '../email-input'
import PasswordInput from '../password-input'
import MainButton from '../main-button'
import './index.sass'

const CombinedInput = ({ type = 'text', color = 'main', setValue = () => {}, children }) => {
  const types = {
    email: <EmailInput setEmail={setValue} />,
    password: <PasswordInput setPassword={setValue} />
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
