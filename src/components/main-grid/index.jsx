import './index.sass'

const MainGrid = ({ pictures = [], onClick = () => {}, masks = [], reverse = false }) => (
  <div className={`main-grid ${reverse ? 'reverse' : 'normal'} ${pictures.length < 5 ? 'partial' : 'full'}`}>
    {pictures.map((picture, index) => (
      <button onClick={() => { onClick(picture.id) }} key={index}>
        {masks.length >= index ? masks[index] : <div className='mask' />}
        <img src={picture.file} alt={`picture-${index}`} />
      </button>
    ))}
  </div>
)

export default MainGrid
