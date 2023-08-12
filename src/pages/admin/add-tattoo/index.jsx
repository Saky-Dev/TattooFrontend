import { useState } from 'react'
import ImageInput from '../../../components/image-input'
import NumberInput from '../../../components/number-input'
import MainButton from '../../../components/main-button'
import GhostButton from '../../../components/ghost-button'
import './index.sass'

const AddTattoo = () => {
  const [measures, setMearues] = useState([])
  const [imgPreview, setImgPreview] = useState(undefined)

  const handleAddMeasure = () => {
    setMearues([...measures, {
      width: 0,
      height: 0,
      price: 0
    }])
  }

  return (
    <main className='admin add-tattoo'>
      <h2>Nuevo tatuaje</h2>
      <div className='content'>
        <ImageInput image={imgPreview} setImage={setImgPreview} />
        <div className='measures'>
          <h3>Tamaños</h3>
          <div className='data'>
            <div className='headers'>
              <span>Ancho</span>
              <span>Alto</span>
              <span>Precio</span>
            </div>
            {measures.map((measure, index) => (
              <div className='measure' key={index}>
                <NumberInput placeholder='00' />
                <NumberInput placeholder='00' />
                <NumberInput placeholder='00' />
                <GhostButton>Eliminar</GhostButton>
              </div>
            ))}
            <div className='action-container'>
              {measures.length < 4
                ? <MainButton color='second' handleClick={handleAddMeasure}>Nuevo</MainButton>
                : <></>}
            </div>
          </div>
          <MainButton>
            Subir
          </MainButton>
        </div>
      </div>
    </main>
  )
}

export default AddTattoo
