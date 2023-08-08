import './index.sass'

const PasswordInput = ({ placeholder = 'Contraseña', setPassword = () => {} }) => (
  <div className='password-input input-container'>
    <input
      required
      type='password'
      onInput={e => setPassword(e.target.value)}
      placeholder={placeholder}
    />
  </div>
)

export default PasswordInput
