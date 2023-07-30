import './index.sass'

const PasswordInput = ({ setPassword = () => {} }) => (
  <div className='password-input input-container'>
    <input
      required
      type='password'
      onInput={e => setPassword(e.target.value)}
      placeholder='Contraseña'
    />
  </div>
)

export default PasswordInput
