import { useContext, useState } from 'react'
import AuthContext from '../auth'
import DetailContext from './context'
import MainButton from '../../../components/main-button'
import MainGrid from '../../../components/main-grid'
import SimpleList from '../../../components/simple-list'
import IconButton from '../../../components/icon-button'
import Radio from '../../../components/radio'
import { ENDPOINTS } from '../../const/paths'
import { ConnectionError, DataError } from '../../const/errors'
import { Close, Shopping } from '../../const/static/icons'
import { toast } from 'react-toastify'
import './index.sass'

const DetailProvider = ({ children }) => {
  const [pictureId, setPictureId] = useState('')
  const [picture, setPicture] = useState()
  const [measures, setMeasures] = useState([])
  const [selected, setSelected] = useState(undefined)
  const [tags, setTags] = useState([])
  const [cluster, setCluster] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [onCart, setOnCart] = useState([])

  const auth = useContext(AuthContext)

  const reset = () => {
    setPictureId('')
    setPicture(null)
    setMeasures([])
    setSelected(undefined)
    setTags([])
    setCluster([])
    setIsVisible(false)
  }

  const divideArrayIntoGroups = pictures => {
    const result = []

    for (let i = 0; i < pictures.length; i += 6) {
      const group = pictures.slice(i, i + 6)
      result.push(group)
    }

    return result
  }

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
        if (!('success' in data)) { throw new DataError() }
        if (!data.success) {
          toast.error('Ocurrio un error al obtener la información de la imagen')
          reset()
        } else {
          if (!('measures' in data) || !('tags' in data)) { throw new DataError() }

          setMeasures(data.measures)
          setTags(data.tags)
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const clusterRequest = () => {
    fetch(ENDPOINTS.CLUSTER, {
      method: 'POST',
      body: JSON.stringify({ pictureId }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': auth.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError() }
        if (!data.success) {
          toast.error('No se pudieron obtener las recomendaciones')
        } else {
          if (!('cluster' in data)) { throw new DataError() }

          const splitedItems = divideArrayIntoGroups(data.cluster)
          setCluster(splitedItems)
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const getPictureDetail = () => {
    try {
      pictureRequest()
      clusterRequest()
    } catch (error) {
      if (error instanceof ConnectionError) { toast.error(error.message) }
      if (error instanceof DataError) { console.debug('Unexpected') }
    }
  }

  const handleChangePicture = id => {
    const copy = [...cluster]
    const clicked = copy.find(pic => pic.id === id)

    setPictureId(id)
    setPicture(clicked.file)

    setMeasures([])
    setSelected(undefined)
    setTags([])
    setCluster([])

    getPictureDetail()
  }

  const addToCart = () => {
    if (onCart.length > 4 && selected !== undefined) {
      toast.error('Has alcanzado el límite de tatuajes en carrito')
    } else {
      const newCart = [...onCart, { pictureId, measures: selected }]
      setOnCart(newCart)
      toast.success('Tatuaje añadido al carrito')
    }
  }

  return (
    <DetailContext.Provider
      value={{
        setPictureId,
        getPictureDetail,
        reset,
        setIsVisible,
        isVisible,
        onCart,
        setOnCart,
        setPicture
      }}
    >
      <div className={`picture-detail ${isVisible ? 'visible' : 'hidden'}`}>
        <div className='container'>
          <IconButton
            icon={Close}
            name='Cerrar'
            onClick={reset}
          />
          <div className='picture'>
            <img src={`data:image/jpeg;base64,${picture}`} alt='imagen' />
          </div>
          <div className='data'>
            <section className='measures'>
              <h3>Tamaños</h3>
              <Radio
                options={measures.map(measure => ({
                  text: `${measure.width}x${measure.height} cm`,
                  value: measure
                }))}
                setSelected={setSelected}
              />
            </section>
            <section className='tags'>
              <h3>Tags</h3>
              <SimpleList items={tags} />
            </section>
            <section className='add'>
              <MainButton color='main' handleClick={addToCart}>
                <>
                  <p>Agregar</p>
                  <img src={Shopping} alt='shoppiing' />
                </>
              </MainButton>
              <span className='price'>{selected ? `$ ${selected.price.toLocaleString()}` : ''}</span>
            </section>
            <section className='cluster'>
              <h2>Similares</h2>
              {cluster.map((sub, index) => (
                <MainGrid
                  pictures={sub}
                  onClick={handleChangePicture}
                  reverse={index % 2 !== 0}
                  key={index}
                />
              ))}
            </section>
          </div>
        </div>
      </div>
      {children}
    </DetailContext.Provider>
  )
}

export default DetailProvider
