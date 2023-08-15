import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../common/context/auth'
import CombinedInput from '../../../components/combined-input'
import TextInput from '../../../components/text-input'
import ImageInput from '../../../components/image-input'
import Selector from '../../../components/selector'
import Loader from '../../../components/loader'
import IconButton from '../../../components/icon-button'
import { ENDPOINTS } from '../../../common/const/paths'
import { STATES } from '../../../common/const/userinfo'
import { ValidationError, ConnectionError, DataError } from '../../../common/const/errors'
import { toast } from 'react-toastify'
import { Trash } from '../../../common/const/static/icons'
import './index.sass'

const AdminBranches = () => {
  const [locations, setLocations] = useState([])
  const [direction, setDirection] = useState('')
  const [cp, setCP] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState(undefined)
  const [mapSrc, setMapSrc] = useState('')
  const [artistName, setaArtistName] = useState('')
  const [artistPicture, setArtistPicture] = useState(undefined)

  const auth = useContext(AuthContext)

  const cpRegex = /^[0-9]+$/

  const getBranches = () => {
    fetch(ENDPOINTS.BRANCHES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': auth.token
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError() }
        if (!data.success) {
          toast.error('Error al traer la información de las sucursales, contacta a servicio técnico')
        } else {
          if (!('branchees' in data)) { throw new DataError() }
          setLocations(data.branches)
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const removeLocation = id => {
    fetch(ENDPOINTS.ADMIN.REMOVEBRANCH, {
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
          toast.error('No se pudo eliminar la sucursal')
        } else {
          toast.error('Se ha eliminado la sucursal')
          const newLocations = locations.filter(item => item.id !== id)
          setLocations(newLocations)
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const handleRemoveClick = id => {
    try {
      removeLocation(id)
    } catch (error) {
      if (error instanceof DataError || error instanceof ConnectionError) {
        toast.error(error.message)
      }
    }
  }

  const validateData = () => {
    if (direction === '' || cp === '' || city === '' || mapSrc === '' || artistName === '') {
      throw new ValidationError('Todos los campos deben de estar llenos')
    }
    if (!cpRegex.test(cp)) { throw new ValidationError('El código postal solo pueden ser números') }
    if (!state) { throw new ValidationError('Elige un estado') }
    if (!artistPicture) { throw new ValidationError('Tienes que subir una imagen') }
  }

  const addNewBranch = () => {
    const data = { direction, cp, city, state, mapSrc, artistName, artistPicture }
    fetch(ENDPOINTS.ADMIN.ADDBRANCH, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': auth.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError() }
        if (!data.success) {
          toast.error('Error al registrar la sucursal')
        } else {
          toast.error('Sucursal añadida de forma correcta')
          setDirection('')
          setCP('')
          setCity('')
          setState(undefined)
          setMapSrc('')
          setaArtistName('')
          setArtistPicture(undefined)
          getBranches()
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const handleSumbit = e => {
    e.preventDefault()

    try {
      validateData()
      addNewBranch()
    } catch (error) {
      if (error instanceof DataError || error instanceof ValidationError || error instanceof ConnectionError) {
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    /* if (auth.trustAdminValidation()) {
      getBranches()
    } */
  }, [])

  return (
    <main className='admin brancnes'>
      <section className='existing'>
        <h2>Sucursales</h2>
        <div className='list'>
          {locations.map((location, index) => (
            <div className='branch' key={index}>
              <div>
                <span>{location.direction}, {location.cp}</span>
                <p>{location.city}, {location.state}</p>
              </div>
              <IconButton
                icon={Trash}
                color='main'
                name='eliminar'
                onClick={() => { handleRemoveClick(location.id) }}
              />
            </div>
          ))}
        </div>
      </section>
      <section className='add'>
        <div className='location-data'>
          <form className='input' onSubmit={handleSumbit}>
            <TextInput placeholder='Dirección' setValue={setDirection} />
            <TextInput placeholder='CP' setValue={setCP} />
            <TextInput placeholder='Ciudad' setValue={setCity} />
            <Selector
              placeholder='Estado'
              options={STATES}
              selected={state}
              setSelected={setState}
            />
            <CombinedInput
              placeholder='Src'
              type='text'
              setValue={setMapSrc}
            >
              Agregar
            </CombinedInput>
          </form>
          <div className='preview'>
            <h2>Preview</h2>
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
        <div className='artist-data'>
          <h2>Tatuador</h2>
          <TextInput placeholder='Nombre' setValue={setaArtistName} />
          <ImageInput image={artistPicture} setImage={setArtistPicture} />
        </div>
      </section>
    </main>
  )
}

export default AdminBranches
