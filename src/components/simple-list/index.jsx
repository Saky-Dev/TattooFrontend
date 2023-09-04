import { useContext } from 'react'
import DetailContext from '../../common/context/detail'
import TempDataContext from '../../common/context/tempData'
import { useNavigate } from 'react-router-dom'
import PATHS from '../../common/const/paths'
import CATEGORIES from '../../common/const/categories'
import './index.sass'

const SimpleList = ({ items = [] }) => {
  const detail = useContext(DetailContext)
  const tempData = useContext(TempDataContext)

  const navigate = useNavigate()

  const handleClick = e => {
    const value = e.currentTarget.getAttribute('category')
    tempData.setCategory(value)

    if (detail.isVisible) { detail.reset() }

    navigate(PATHS.PUBLIC.TATTOOS)
  }

  return (
    <ul className='simple-list'>
      {items.map((item, index) => {
        const tag = Object.values(CATEGORIES).find(category => item === category.VALUE)
        return (
          <li key={index}>
            <button onClick={handleClick} category={tag.VALUE}>{tag.TEXT}</button>
          </li>
        )
      })}
    </ul>
  )
}

export default SimpleList
