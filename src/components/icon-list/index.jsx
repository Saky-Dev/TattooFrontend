import './index.sass'

const IconList = ({ items = [], handleClick = () => {} }) => (
  <ul className='icon-list'>
    {items.map((item, index) => (
      <li key={index} className='item'>
        <img src={item.icon} alt={item.title} />
        <button linked={index} onClick={handleClick}>{item.title}</button>
      </li>
    ))}
  </ul>
)

export default IconList
