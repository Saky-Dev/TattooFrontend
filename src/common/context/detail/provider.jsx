import { useState } from 'react'
import DetailContext from './context'

const DetailProvider = ({ children }) => {
  const [pictureId, setPictureId] = useState(null)
  const [picture, setPicture] = useState(null)
  const [measures, setMeasures] = useState(null)
  const [price, setPrice] = useState(null)
  const [sizeSelected, setSizeSelected] = useState(null)
  const [tags, setTags] = useState(null)
  const [cluster, setCluster] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const request = () => {

  }

  return (
    <DetailContext.Provider
      value={{
        setPictureId,
        setPicture
      }}
    >
      {children}
    </DetailContext.Provider>
  )
}

export default DetailProvider
