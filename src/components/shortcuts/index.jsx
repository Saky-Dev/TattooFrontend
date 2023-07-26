import { Link } from 'react-router-dom'
import './index.sass'

const Shortcuts = ({ list = [] }) => (
  <ul className='shortcuts'>
    {list.map((item, index) => (
      <li key={index}>
        <Link to={item.path} onClick={item.handleClick}>
          <img src={item.img} alt={item.text} />
        </Link>
      </li>
    ))}
  </ul>
)

export default Shortcuts
