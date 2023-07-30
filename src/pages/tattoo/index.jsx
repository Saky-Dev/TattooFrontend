import { useState } from 'react'
import IconList from '../../components/icon-list'
import Torii from '../../assets/icons/torii.svg'
import Paw from '../../assets/icons/paw-filled.svg'
import Moon from '../../assets/icons/moon-filled.svg'
import Book from '../../assets/icons/book.svg'
import Ghost from '../../assets/icons/ghost-filled.svg'
import Skull from '../../assets/icons/skull.svg'
import Pacman from '../../assets/icons/pacman.svg'
import Butterfly from '../../assets/icons/butterfly.svg'
import Funimation from '../../assets/icons/brand-funimation.svg'
import Leaf from '../../assets/icons/leaf.svg'
import Cross from '../../assets/icons/cross.svg'
import Feather from '../../assets/icons/feather.svg'
import Axe from '../../assets/icons/axe.svg'
import TattooPicture from '../../assets/pictures/tattoo-picture.jpg'
import './index.sass'

const Tatto = () => {
  const [tattoosList, setTattoosList] = useState([])

  const items = [
    { icon: Torii, title: 'Japones', val: 'japanese' },
    { icon: Paw, title: 'Perros', val: 'dog' },
    { icon: Moon, title: 'Luna', val: 'moon' },
    { icon: Book, title: 'Comics', val: 'comics' },
    { icon: Ghost, title: 'Demonios', val: 'demons' },
    { icon: Skull, title: 'Calaveras', val: 'skull' },
    { icon: Pacman, title: 'Videojuegos', val: 'videogames' },
    { icon: Butterfly, title: 'Mariposas', val: 'butterflies' },
    { icon: Funimation, title: 'Manga', val: 'manga' },
    { icon: Leaf, title: 'Arboles', val: 'trees' },
    { icon: Cross, title: 'Religiosas', val: 'religion' },
    { icon: Feather, title: 'Búhos', val: 'owls' },
    { icon: Axe, title: 'Hachas', val: 'hachas' }
  ]

  const handleClick = e => {
    console.log(e.target.getAttribute('linked'))
    setTattoosList([])
  }

  return (
    <main className='tattoo'>
      <aside>
        <h2>Categorias</h2>
        <IconList items={items} handleClick={handleClick} />
      </aside>
      <div className='content'>
        {tattoosList.length < 1
          ? <img src={TattooPicture} alt='tattoo' />
          : <></>}
      </div>
    </main>
  )
}

export default Tatto
