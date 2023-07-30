import './index.sass'

const EmailInput = ({ setEmail = () => {} }) => (
  <div className='email-input input-container'>
    <input
      required
      type='email'
      onInput={(e) => setEmail(e.target.value)}
      placeholder='Correo'
    />
  </div>
)

export default EmailInput
