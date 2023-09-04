import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../common/context/auth'
import ImageInput from '../../../components/image-input'
import NumberInput from '../../../components/number-input'
import MainButton from '../../../components/main-button'
import GhostButton from '../../../components/ghost-button'
import Loader from '../../../components/loader'
import { ValidationError, ConnectionError, DataError } from '../../../common/const/errors'
import { toast } from 'react-toastify'
import { ENDPOINTS } from '../../../common/const/paths'
import './index.sass'

const AdminAddTattoo = () => {
  const [measures, setMearues] = useState([])
  const [image, setImage] = useState(undefined)

  const auth = useContext(AuthContext)

  const handleAddMeasure = () => {
    setMearues([...measures, {
      width: 0,
      height: 0,
      price: 0
    }])
  }

  const handleSetMeasure = (value, index, param) => {
    const copy = [...measures]
    copy[index][param] = value
    setMearues(copy)
  }

  const handleDeleteMeasure = () => {
    const copy = [...measures]
    copy.pop()
    setMearues(copy)
  }

  const validateData = () => {
    if (image === undefined) {
      throw new ValidationError('Tienes que seleccionar una imagen')
    }

    measures.forEach(measure => {
      if (measure.width < 1 || measure.height < 1 || measure.price < 1) {
        throw new ValidationError('Todos los datos deben ser numeros mayores a 0')
      }
    })
  }

  const handleUpload = () => {
    fetch(ENDPOINTS.ADMIN.UPLOADTATTOO, {
      method: 'POST',
      body: JSON.stringify({ image, measures }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': auth.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError() }

        if (!data.success) {
          toast.error('Error al subir la información')
        } else {
          if (!('categories' in data)) { throw new DataError() }
          toast.success(`La imagen se subio de forma correcta, clasificada como ${data.categories.map(category => category)}`)

          setImage(undefined)
          setMearues([])
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const handleClickSubmit = () => {
    try {
      validateData()
      handleUpload()
    } catch (error) {
      if (error instanceof ValidationError || error instanceof ValidationError || error instanceof DataError) {
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    auth.trustAdminValidation()
  }, [])

  return (
    <main className='admin add-tattoo'>
      <Loader />
      <h2>Nuevo tatuaje</h2>
      <div className='content'>
        <ImageInput image={image} setImage={setImage} />
        <div className='measures'>
          <h3>Tamaños</h3>
          <div className='data'>
            <div className='headers'>
              <span>Ancho</span>
              <span>Alto</span>
              <span>Precio</span>
            </div>
            {measures.map((_, index) => (
              <div className='measure' key={index}>
                <NumberInput
                  placeholder='00'
                  complement='cm'
                  setNumber={value => {
                    handleSetMeasure(value, index, 'width')
                  }}
                />
                <NumberInput
                  placeholder='00'
                  complement='cm'
                  setNumber={value => {
                    handleSetMeasure(value, index, 'height')
                  }}
                />
                <NumberInput
                  placeholder='00'
                  complement='pesos'
                  setNumber={value => {
                    handleSetMeasure(value, index, 'price')
                  }}
                />
                {index + 1 === measures.length
                  ? <GhostButton handleClick={handleDeleteMeasure}>Eliminar</GhostButton>
                  : <></>}
              </div>
            ))}
            <div className='action-container'>
              {measures.length < 4
                ? <MainButton color='second' handleClick={handleAddMeasure}>Nuevo</MainButton>
                : <></>}
            </div>
          </div>
          <MainButton handleClick={handleClickSubmit}>
            Subir
          </MainButton>
        </div>
      </div>
    </main>
  )
}

export default AdminAddTattoo
