import './index.sass'

const NumberInput = ({ placeholder = '0', setNumber = () => {}, complement = '' }) => (
  <div className='number-input input-container'>
    <input
      required
      type='number'
      onInput={e => setNumber(Number(e.target.value))}
      placeholder={placeholder}
    />
    {complement
      ? <p>{complement}</p>
      : <></>}
  </div>
)

export default NumberInput
