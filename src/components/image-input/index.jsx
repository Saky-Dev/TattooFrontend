import { Upload } from '../../common/const/static/icons'
import './index.sass'

const ImageInput = ({ image = undefined, setImage = () => {} }) => (
  <div className='image-input'>
    <img src={Upload} alt='upload' />
    {image
      ? <img src={image} alt='preview' />
      : <></>}
    <input
      type='file'
      accept='image/png, image/jpeg'
      onInput={e => {
        const reader = new window.FileReader()
        reader.onload = () => { setImage(reader.result) }
        reader.readAsDataURL(e.target.files[0])
      }}
    />
  </div>
)

export default ImageInput
