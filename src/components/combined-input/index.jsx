import EmailInput from '../email-input'
import MainButton from '../main-button'
import './index.sass'

const CombinedInput = ({ type = 'text', color = 'main', children }) => {
  const types = {
    email: <EmailInput />
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
