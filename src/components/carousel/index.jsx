import { useEffect } from 'react'
import './index.sass'

const Carousel = ({ pictures = [], text = '', isParagraph = false }) => {
  const handleClick = e => {
    const selectors = [...document.querySelectorAll('div.carousel button.picture-selector')]
    const imgContainer = document.querySelector('div.carousel div.pictures')
    const active = selectors.find(selector => selector.classList.contains('active'))
    const next = e ? e.target : (active.nextSibling || selectors[0])
    const index = Number(next.getAttribute('linked'))
    const step = imgContainer.scrollWidth / pictures.length

    active.classList.remove('active')
    next.classList.add('active')

    imgContainer.scrollTo({
      top: 0,
      left: step * index,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const changer = setInterval(handleClick, 3000)
    return () => clearInterval(changer)
  }, [])

  return (
    <div className='carousel'>
      {
        isParagraph
          ? <p className='text'>{text}</p>
          : <span className='text'>{text}</span>
      }
      <div className='selector-container'>
        {pictures.map((_, index) => (
          <button
            className={`picture-selector${index === 0 ? ' active' : ''}`}
            key={index}
            linked={index}
            onClick={handleClick}
          />
        ))}
      </div>
      <div className='mask' />
      <div className='pictures'>
        {pictures.map((picture, index) => (
          <img src={picture} alt={`imagen-${index}`} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Carousel
