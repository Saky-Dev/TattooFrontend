import './index.sass'

const EmailInput = ({ placeholder = 'Correo', setEmail = () => {} }) => (
  <div className='email-input input-container'>
    <input
      required
      type='email'
      onInput={(e) => setEmail(e.target.value)}
      placeholder={placeholder}
    />
  </div>
)

export default EmailInput
