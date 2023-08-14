import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../common/context/auth'
import Spectacular from '../../components/spectacular'
import { ENDPOINTS } from '../../common/const/paths'
import { ConnectionError, DataError } from '../../common/const/errors'
import { toast } from 'react-toastify'
import { BranchSpectacular } from '../../common/const/static/pictures'
import './index.sass'

const Branches = () => {
  const [mapSrc, setMapSrc] = useState('')
  const [locations, setLocations] = useState([])

  const auth = useContext(AuthContext)

  const getBranches = () => {
    fetch(ENDPOINTS.BRANCHES, {
      method: 'GET',
      headers: {
        'Content-Type': 'json/application',
        'X-CSRFToken': auth.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError() }

        if (data.success) {
          if (!('branches' in data)) { throw new DataError() }
          setLocations(data.branches)
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const handleOnClick = e => {
    const active = document.querySelector('ul.locations li.location button.active')
    const src = e.currentTarget.getAttribute('src')

    if (active) { active.classList.remove('active') }

    e.currentTarget.classList.add('active')
    setMapSrc(src)
  }

  useEffect(() => {
    try {
      getBranches()
    } catch (error) {
      if (error instanceof ConnectionError) { toast.error(error.message) }
      if (error instanceof DataError) { console.debug('Unexpected') }
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
