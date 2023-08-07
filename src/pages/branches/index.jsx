import { useEffect, useState } from 'react'
import Spectacular from '../../components/spectacular'
import { ENDPOINTS } from '../../common/const/paths'
import { ConnectionError, DataError } from '../../common/const/errors'
import { toast } from 'react-toastify'
import { BranchSpectacular } from '../../common/const/static/pictures'
import './index.sass'

const Branches = () => {
  const [mapSrc, setMapSrc] = useState('')
  const [locations, setLocations] = useState([])

  const getBranches = () => {
    fetch(ENDPOINTS.BRANCHES, {
      method: 'GET',
      headers: {
        'Content-Type': 'json/application'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data) && !('branches' in data)) {
          throw new DataError('')
        }

        if (data.success) {
          setLocations(data.branches)
        }
      })
      .catch(() => {
        throw new ConnectionError('Ha ocurrido un error, revisa tu conexión')
      })
  }

  const handleOnClick = e => {
    const active = document.querySelector('ul.locations li.location button.active')
    const parent = e.target.tagName.toLowerCase() === 'button' ? e.target : e.target.parentNode
    const src = parent.getAttribute('src')

    if (active) {
      active.classList.remove('active')
    }

    parent.classList.add('active')
    setMapSrc(src)
  }

  useEffect(() => {
    try {
      getBranches()
    } catch (error) {
      if (error instanceof ConnectionError) {
        toast.error(error.message)
      }
      if (error instanceof DataError) {
        console.debug('Unexpected')
      }
    }
  }, [])

  return (
    <main className='branches'>
      <Spectacular picture={BranchSpectacular} text='Sucursales' />
      <div className='branches-content'>
        <p className='presentation'>Nuestras sucursales han sido cuidadosamente ubicadas estratégicamente para ofrecer accesibilidad y comodidad a nuestra diversa clientela. Cada ubicación ha sido seleccionada de acuerdo a las preferencias de nuestro público. Nuestra estrategia es un crecimiento constante, asegurando que el público pueda esperar más aperturas en el futuro, llevando nuestros servicios aún más cerca de nuestros clientes.</p>
        <div className='map'>
          <aside>
            <h2>Direcciones</h2>
            <ul className='locations'>
              {locations.map((location, index) => (
                <li className='location' key={index}>
                  <button src={location.src} onClick={handleOnClick}>
                    <span>{location.direction}, {location.cp}</span>
                    <p>{location.city}, {location.state}</p>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          {mapSrc
            ? <iframe
                src={mapSrc}
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            : <div className='mask' />}
        </div>
      </div>
    </main>
  )
}

export default Branches
