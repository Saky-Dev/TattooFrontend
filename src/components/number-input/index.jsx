import './index.sass'

const NumberInput = ({ placeholder = '0', setNumber = () => {} }) => (
  <div className='number-input input-container'>
    <input
      required
      type='number'
      onInput={e => setNumber(Number(e.target.value))}
      placeholder={placeholder}
    />
  </div>
)

export default NumberInput
