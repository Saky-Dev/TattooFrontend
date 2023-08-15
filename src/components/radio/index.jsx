import './index.sass'

const Radio = ({ options = [], setSeleted = () => {} }) => {
  const handleClick = (e, value) => {
    const parent = e.currentTarget.parentNode
    const selected = parent.querySelector('button.active')

    if (selected) { selected.classList.remove('active') }

    e.currentTarget.classList.add('active')
    setSeleted(value)
  }

  return (
    <div className='radio'>
      {options.map((option, index) => (
        <button onClick={e => handleClick(e, options.value)} key={index}>
          <div className='incator' />
          <span>{option.text}</span>
        </button>
      ))}
    </div>
  )
}

export default Radio
