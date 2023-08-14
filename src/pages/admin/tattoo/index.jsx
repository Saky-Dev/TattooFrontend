import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../common/context/auth'
import IconList from '../../../components/icon-list'
import MainGrid from '../../../components/main-grid'
import CATEGORIES from '../../../common/const/categories'
import { ConnectionError, DataError } from '../../../common/const/errors'
import { toast } from 'react-toastify'
import { ENDPOINTS } from '../../../common/const/paths'
import './index.sass'
import {
  Japanese, Dog, Moon, Comic, Demon,
  Skull, Videogames, Butterfly, Anime, Tree,
  Religion, Owl, Axe, Trash
} from '../../../common/const/static/icons'

const AdminTattoo = () => {
  const [tattoosList, setTattoosList] = useState([])
  const [categoryIndex, setCategoryIndex] = useState(-1)

  const auth = useContext(AuthContext)

  const categories = [
    { icon: Japanese, title: CATEGORIES.JAPANESE.TEXT, val: CATEGORIES.JAPANESE.VALUE },
    { icon: Dog, title: CATEGORIES.DOGS.TEXT, val: CATEGORIES.DOGS.VALUE },
    { icon: Moon, title: CATEGORIES.MOONS.TEXT, val: CATEGORIES.MOONS.VALUE },
    { icon: Comic, title: CATEGORIES.COMICS.TEXT, val: CATEGORIES.COMICS.VALUE },
    { icon: Demon, title: CATEGORIES.DEMONS.TEXT, val: CATEGORIES.DEMONS.VALUE },
    { icon: Skull, title: CATEGORIES.SKULLS.TEXT, val: CATEGORIES.SKULLS.VALUE },
    { icon: Videogames, title: CATEGORIES.VIDEOGAMES.TEXT, val: CATEGORIES.VIDEOGAMES.VALUE },
    { icon: Butterfly, title: CATEGORIES.BUTTERFLIES.TEXT, val: CATEGORIES.BUTTERFLIES.VALUE },
    { icon: Anime, title: CATEGORIES.ANIME.TEXT, val: CATEGORIES.ANIME.VALUE },
    { icon: Tree, title: CATEGORIES.TREES.TEXT, val: CATEGORIES.TREES.VALUE },
    { icon: Religion, title: CATEGORIES.RELIGION.TEXT, val: CATEGORIES.RELIGION.VALUE },
    { icon: Owl, title: CATEGORIES.OWLS.TEXT, val: CATEGORIES.OWLS.VALUE },
    { icon: Axe, title: CATEGORIES.AXES.TEXT, val: CATEGORIES.AXES.VALUE }
  ]

  const divideArrayIntoGroups = pictures => {
    const result = []

    for (let i = 0; i < pictures.length; i += 6) {
      const group = pictures.slice(i, i + 6)
      result.push(group)
    }

    return result
  }

  const getPictures = catNumber => {
    fetch(ENDPOINTS.TATTOOS, {
      method: 'POST',
      body: JSON.stringify({ category: categories[catNumber].val }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': auth.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError() }

        if (data.success) {
          if (!('pictures' in data)) { throw new DataError() }

          const splitedItems = divideArrayIntoGroups(data.pictures)
          setTattoosList(splitedItems)
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const handleCategoryClick = e => {
    const selected = document.querySelector('ul.icon-list li.selected')
    const linked = Number(e.target.getAttribute('linked'))

    try {
      getPictures(linked)
      setCategoryIndex(linked)
      if (selected) { selected.classList.remove('selected') }
      e.target.parentNode.classList.add('selected')
    } catch (error) {
      if (error instanceof ConnectionError || error instanceof DataError) {
        toast.error(error.message)
      }
    }
  }

  const deleteTattoo = id => {
    fetch(ENDPOINTS.ADMIN.REMOVETATTOO, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': auth.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError() }
        if (!data.success) {
          toast.error('Error al eliminar el tatuaje')
        } else {
          toast.success('El tatuaje ha sido eliminado')
          getPictures(categoryIndex)
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const handleDeleteClick = id => {
    try {
      deleteTattoo(id)
    } catch (error) {
      if (error instanceof ConnectionError || error instanceof DataError) {
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    auth.trustAdminValidation()
  }, [])

  return (
    <main className='admin tattoo'>
      <aside>
        <h2>Categorias</h2>
        <IconList items={categories} handleClick={handleCategoryClick} />
      </aside>
      <div className='content'>
        {tattoosList.length < 1
          ? <></>
          : tattoosList.map((pictures, index) => (
            <MainGrid
              key={index}
              pictures={pictures}
              onClick={handleDeleteClick}
              masks={pictures.map((_, i) => (
                <div className='mask' key={i}>
                  <img src={Trash} alt='Eliminar' title='Eliminar' />
                </div>
              ))}
              reverse={index % 2 !== 0}
            />
          ))}
      </div>
    </main>
  )
}

export default AdminTattoo
