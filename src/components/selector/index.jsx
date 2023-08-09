import { useState } from 'react'
import { DownArrow } from '../../common/const/static/icons'
import './index.sass'

const Selector = ({ placeholder = '', value = '', selected = '', options = [], setSelected = () => {} }) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleVisibilityClick = e => {
    e.preventDefault()
    setIsVisible(!isVisible)
  }

  const handleOptionClick = e => {
    e.preventDefault()
    const optionSelected = e.target.getAttribute('option')
    setSelected(optionSelected)
    setIsVisible(false)
  }

  return (
    <div className={`selector ${value}`}>
      <div className='header'>
        <span className='selected'>{selected || placeholder}</span>
        <button className={isVisible ? 'visible' : 'hidden'} onClick={handleVisibilityClick}>
          <img src={DownArrow} alt={isVisible ? 'ocultar' : 'mostrar'} />
        </button>
      </div>
      <div className={`content ${isVisible ? 'visible' : 'hidden'}`}>
        {options.map((option, index) => (
          <ul className='options' key={index}>
            <li>
              <button option={option} onClick={handleOptionClick}>{option}</button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default Selector
