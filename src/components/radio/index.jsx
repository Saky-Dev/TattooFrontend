import './index.sass'

const Radio = ({ options = [], setSelected = () => {} }) => {
  const handleClick = (e, value) => {
    const parent = e.currentTarget.parentNode
    const selected = parent.querySelector('button.active')

    if (selected) { selected.classList.remove('active') }

    e.currentTarget.classList.add('active')
    setSelected(value)
  }

  return (
    <div className='radio'>
      {options.map((option, index) => (
        <button onClick={e => handleClick(e, option.value)} key={index}>
          <div className='indicator' />
          <span>{option.text}</span>
        </button>
      ))}
    </div>
  )
}

export default Radio
