import { useEffect, useState } from 'react'
import './index.sass'

const Carousel = ({ pictures = [] }) => {
  const [buttons, setButtons] = useState([])

  const handleClick = e => {

  }

  useEffect(() => {
    setButtons(
      pictures.map((_, index) => (
        <button
          className='picture-seclector'
          key={index}
          linked={index}
          onClick={handleClick}
        />
      ))
    )
  })

  return (
    <div className='carousel'>
      {buttons.map(item => item)}
      <div className='mask' />
      {pictures.map((picture, index) => (
        <img src={picture} alt={`imagen-${index}`} key={index} />
      ))}
    </div>
  )
}

export default Carousel
