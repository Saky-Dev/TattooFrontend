import { Link } from 'react-router-dom'
import logo from '../../assets/icons/shogunink.svg'
import shopping from '../../assets/icons/shopping-bag.svg'
import user from '../../assets/icons/user-circle.svg'

import './index.sass'

const navItems = [
  {
    text: 'Tatuajes',
    path: '/tattoo'
  },
  {
    text: 'Top',
    path: '/top'
  },
  {
    text: 'Sucursales',
    path: '/branches'
  },
  {
    text: 'Nosotros',
    path: '/about'
  }
]

const shortcuts = [
  {
    img: shopping,
    text: 'carrito',
    path: '/cart'
  },
  {
    img: user,
    text: 'perfil',
    path: '/profile'
  }
]

const Header = () => {
  return (
    <header>
      <div className='west'>
        <img src={logo} alt='logo' />
        <h1>SHOGUN.INK</h1>
      </div>
      <div className='center'>
        <nav>
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className='east'>
        <ul>
          {shortcuts.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <img src={item.img} alt={item.text} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default Header
