import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../common/context/auth'
import Shortcuts from '../shortcuts'
import { BrandLogo, Shopping, User, Analytics } from '../../common/const/static/icons'
import './index.sass'

const Header = () => {
  const authValue = useContext(AuthContext)

  const userItems = {
    navbar: [
      { text: 'Tatuajes', path: '/tattoo' },
      { text: 'Top', path: '/top' },
      { text: 'Sucursales', path: '/branches' },
      { text: 'Nosotros', path: '/about' }
    ],
    shortcuts: [
      { img: Shopping, text: 'carrito', path: '/cart' },
      {
        img: User,
        text: authValue.user.isAuthenticated
          ? 'perfil'
          : 'login',
        path: authValue.user.isAuthenticated
          ? '/profile'
          : '/login'
      }
    ]
  }

  const adminItems = {
    navbar: [
      { text: 'Gestores', path: '/admin/users' },
      { text: 'Agregar', path: '/admin/add' },
      { text: 'Tatuajes', path: '/admin/tattoo' },
      { text: 'Sucursales', path: '/admin/branches' }
    ],
    shortcuts: [
      { img: Analytics, text: 'analytics', path: '/admin/analytics' },
      {
        img: User,
        text: 'carrito',
        path: '/',
        handleClick: e => {
          if (!window.confirm('¿Cerrar sesion?')) {
            e.preventDefault()
          } else {
            authValue.admin.setIsLoggedIn(false)
            authValue.admin.setId('')
          }
        }
      }
    ]
  }

  const listNavbar = () => {
    const navbar = authValue.admin.isLoggedIn
      ? adminItems.navbar
      : userItems.navbar

    return (
      navbar.map((item, index) => (
        <li key={index}>
          <Link to={item.path}>{item.text}</Link>
        </li>
      ))
    )
  }

  return (
    <header>
      <div className='west'>
        <img src={BrandLogo} alt='logo' />
        <Link to={authValue.admin.isLoggedIn ? '/admin/users' : '/'}>
          <span>SHOGUN.INK</span>
        </Link>
      </div>
      <div className='center'>
        <nav>
          <ul>
            {listNavbar()}
          </ul>
        </nav>
      </div>
      <div className='east'>
        <Shortcuts
          list={authValue.admin.isLoggedIn
            ? adminItems.shortcuts
            : userItems.shortcuts}
        />
      </div>
    </header>
  )
}

export default Header
