import './index.sass'

const MainGrid = ({ pictures = [], onClick = () => {}, mask = <div className='mask' />, reverse = false }) => (
  <div className={`main-grid${reverse ? ' reverse' : ''}`}>
    {pictures.map((picture, index) => (
      <button onClick={onClick} key={index}>
        {mask}
        <img src={picture} alt={`picture-${index}`} />
      </button>
    ))}
  </div>
)

export default MainGrid
