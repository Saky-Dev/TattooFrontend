import { useState } from 'react'
import IconList from '../../components/icon-list'
import { TattooPicture } from '../../common/const/static/pictures'
import './index.sass'
import {
  Japanese, Dog, Moon, Comic, Demon,
  Skull, Videogames, Butterfly, Anime, Tree,
  Religion, Owl, Axe
} from '../../common/const/static/icons'

const Tatto = () => {
  const [tattoosList, setTattoosList] = useState([])

  const items = [
    { icon: Japanese, title: 'Japones', val: 'japanese' },
    { icon: Dog, title: 'Perros', val: 'dog' },
    { icon: Moon, title: 'Luna', val: 'moon' },
    { icon: Comic, title: 'Comics', val: 'comics' },
    { icon: Demon, title: 'Demonios', val: 'demons' },
    { icon: Skull, title: 'Calaveras', val: 'skull' },
    { icon: Videogames, title: 'Videojuegos', val: 'videogames' },
    { icon: Butterfly, title: 'Mariposas', val: 'butterflies' },
    { icon: Anime, title: 'Manga', val: 'manga' },
    { icon: Tree, title: 'Arboles', val: 'trees' },
    { icon: Religion, title: 'Religiosas', val: 'religion' },
    { icon: Owl, title: 'Búhos', val: 'owls' },
    { icon: Axe, title: 'Hachas', val: 'hachas' }
  ]

  const handleClick = e => {
    const selected = document.querySelector('ul.icon-list li.selected')
    if (selected) { selected.classList.remove('selected') }
    e.target.parentNode.classList.add('selected')
    console.log(e.target.getAttribute('linked'))
    setTattoosList([])
  }

  const pictureLanding = () => (
    <div className='picture-landing-container'>
      <div className='mask'>
        <span>Descubre nuestros nuevos diseños</span>
      </div>
      <img src={TattooPicture} alt='tattoo' className='landing' />
    </div>
  )

  return (
    <main className='tattoo'>
      <aside>
        <h2>Categorias</h2>
        <IconList items={items} handleClick={handleClick} />
      </aside>
      <div className='content'>
        {tattoosList.length < 1
          ? pictureLanding()
          : <></>}
      </div>
    </main>
  )
}

export default Tatto
