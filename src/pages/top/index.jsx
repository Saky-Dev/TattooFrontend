import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../common/context/auth'
import MainGrid from '../../components/main-grid'
import Spectacular from '../../components/spectacular'
import { ENDPOINTS } from '../../common/const/paths'
import { ConnectionError, DataError } from '../../common/const/errors'
import { toast } from 'react-toastify'
import { HeartFilled } from '../../common/const/static/icons'
import { TopSpectacular } from '../../common/const/static/pictures'
import './index.sass'

const Top = () => {
  const [tattoos, setTattoos] = useState([])

  const auth = useContext(AuthContext)

  const divideArrayIntoGroups = pictures => {
    const result = []

    for (let i = 0; i < pictures.length; i += 6) {
      const group = pictures.slice(i, i + 6)
      result.push(group)
    }

    return result
  }

  const getPictures = () => {
    fetch(ENDPOINTS.TOP, {
      method: 'GET',
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

          const images = divideArrayIntoGroups(data.pictures)
          setTattoos(images)
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  useEffect(() => {
    try {
      getPictures()
    } catch (error) {
      if (error instanceof ConnectionError) { toast.error(error.message) }
      if (error instanceof DataError) { console.debug('Unexpected') }
    }
  }, [])

  return (
    <main className='top'>
      <Spectacular picture={TopSpectacular} text='Top' />
      <div className='top-content'>
        {tattoos.map((pictures, index) => (
          <MainGrid
            key={index}
            pictures={pictures}
            onClick={() => {}}
            masks={pictures.map((picture, i) => (
              <div className='mask' key={i}>
                <img src={HeartFilled} alt='like' />
                <span className='likes'>{`${picture.likes}`.toLocaleString()}</span>
              </div>
            ))}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </main>
  )
}

export default Top
