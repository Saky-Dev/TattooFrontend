import { useContext, useState } from 'react'
import AuthContext from '../auth'
import DetailContext from './context'
import MainButton from '../../../components/main-button'
import MainGrid from '../../../components/main-grid'
import SimpleList from '../../../components/simple-list'
import Radio from '../../../components/radio'
import { ENDPOINTS } from '../../const/paths'
import { ConnectionError, DataError } from '../../const/errors'
import { Close, Shopping } from '../../const/static/icons'
import { toast } from 'react-toastify'
import './index.sass'

const DetailProvider = ({ children }) => {
  const [pictureId, setPictureId] = useState('')
  const [picture, setPicture] = useState(null)
  const [measures, setMeasures] = useState([])
  const [selected, setSelected] = useState(undefined)
  const [tags, setTags] = useState([])
  const [cluster, setCluster] = useState([])
  const [isVisible, setIsVisible] = useState(true)
  const [onCart, setOnCart] = useState([])

  const auth = useContext(AuthContext)

  const pictureRequest = () => {
    fetch(ENDPOINTS.DETAIL, {
      method: 'POST',
      body: JSON.stringify({ pictureId }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': auth.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {

      })
      .catch(() => {})
  }

  const getPictureDetail = () => {
    try {
      pictureRequest()
    } catch (error) {
      if (error instanceof ConnectionError) { toast.error(error.message) }
      if (error instanceof DataError) { console.debug('Unexpected') }
    }
  }

  const addToCart = () => {
    if (onCart.length > 4) {
      toast.error('Has alcanzado el límite de tatuajes en carrito')
    } else {
      const newCart = [...onCart, { pictureId, selected }]
      setOnCart(newCart)
      toast.success('Tatuaje añadido al carrito')
    }
  }

  const reset = () => {
    setPictureId('')
    setPicture(null)
    setMeasures([])
    setSelected(undefined)
    setTags([])
    setCluster([])
    setIsVisible(false)
  }

  return (
    <DetailContext.Provider
      value={{
        setPictureId,
        getPictureDetail,
        reset,
        setIsVisible,
        onCart,
        setOnCart
      }}
    >
      <div className={`picture-detail ${isVisible ? 'visible' : 'hidden'}`}>
        <div className='container'>
          <button className='close' onClick={() => { setIsVisible(false) }}>
            <img src={Close} alt='Cerrar' title='Cerrar' />
          </button>
          <div className='picture'>
            <img src={`data:image/jpeg;base64,${picture}`} alt='imagen' />
          </div>
          <div className='data'>
            <div className='measures'>
              <h3>Tamaños</h3>
              <Radio
                options={measures.map(measure => ({
                  text: `${measure.width}x${measure.height} cm`,
                  value: measure
                }))}
                setSelected={setSelected}
              />
            </div>
            <div className='tags'>
              <h3>Tags</h3>
              <SimpleList items={tags} />
            </div>
            <div className='add'>
              <MainButton color='main' handleClick={addToCart}>
                <div>
                  <p>Agregar</p>
                  <img src={Shopping} alt='shoppiing' />
                </div>
              </MainButton>
              <span className='price'>{selected ? selected.price : ''}</span>
            </div>
            <div className='cluster'>
              <h2>Similares</h2>
              {cluster.map((sub, index) => (
                <MainGrid
                  pictures={sub}
                  onClick={() => {}}
                  reverse={index % 2 !== 0}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {children}
    </DetailContext.Provider>
  )
}

export default DetailProvider
