import { useEffect, useState } from 'react'
import Spectacular from '../../components/spectacular'
import { ENDPOINTS } from '../../common/const/paths'
import { ConnectionError, DataError } from '../../common/const/errors'
import { toast } from 'react-toastify'
import { BranchSpectacular } from '../../common/const/static/pictures'
import './index.sass'

const Branches = () => {
  const [mapSrc, setMapSrc] = useState('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11255.768107873337!2d-98.74281219031587!3d20.12042571225826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d109ef4a99b49d%3A0x5936aae428973d42!2sReloj%20Monumental%20de%20Pachuca!5e0!3m2!1ses-419!2smx!4v1691423448374!5m2!1ses-419!2smx')
  const [locations, setLocations] = useState([
    {
      direction: 'C. Cayetano Gómez Pérez, Morelos',
      cp: '42040',
      city: 'Pachuca de Soto',
      state: 'Hidalgo',
      src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11255.768107873337!2d-98.74281219031587!3d20.12042571225826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d10987c184c541%3A0xea0dcd73ed3dbd82!2sHostal%20Makea%20Pachuca!5e0!3m2!1ses-419!2smx!4v1691435752025!5m2!1ses-419!2smx'
    },
    {
      direction: 'C. Cayetano Gómez Pérez, Morelos',
      cp: '42040',
      city: 'Pachuca de Soto',
      state: 'Hidalgo',
      src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11255.768107873337!2d-98.74281219031587!3d20.12042571225826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d109ef4a99b49d%3A0x5936aae428973d42!2sReloj%20Monumental%20de%20Pachuca!5e0!3m2!1ses-419!2smx!4v1691423448374!5m2!1ses-419!2smx'
    },
    {
      direction: 'C. Cayetano Gómez Pérez, Morelos',
      cp: '42040',
      city: 'Pachuca de Soto',
      state: 'Hidalgo',
      src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11255.768107873337!2d-98.74281219031587!3d20.12042571225826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d109ef4a99b49d%3A0x5936aae428973d42!2sReloj%20Monumental%20de%20Pachuca!5e0!3m2!1ses-419!2smx!4v1691423448374!5m2!1ses-419!2smx'
    }
  ])

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
    const parent = e.target.parentNode
    const src = parent.getAttribute('src')
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
        <p>Nuestras sucursales han sido cuidadosamente ubicadas estratégicamente para ofrecer accesibilidad y comodidad a nuestra diversa clientela. Cada ubicación ha sido seleccionada de acuerdo a las preferencias de nuestro público. Nuestra estrategia es un crecimiento constante, asegurando que el público pueda esperar más aperturas en el futuro, llevando nuestros servicios aún más cerca de nuestros clientes.</p>
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
          <iframe
            src={mapSrc}
            width='600' height='450'
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </div>
      </div>
    </main>
  )
}

export default Branches
