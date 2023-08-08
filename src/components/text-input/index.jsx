import './index.sass'

const TextInput = ({ placeholder = 'Texto', complement = '', setValue = () => {} }) => (
  <div className='text-input input-container'>
    <input
      required
      type='text'
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
    />
    {complement
      ? <p>{complement}</p>
      : <></>}
  </div>
)

export default TextInput
