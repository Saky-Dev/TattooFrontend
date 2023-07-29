import './index.sass'

const Spectacular = ({ text = '', picture = undefined }) => {
  return (
    <div className='spectacular'>
      <span>{text}</span>
      <div className='mask' />
      {picture
        ? <img src={picture} alt={text} />
        : <></>}
    </div>
  )
}

export default Spectacular
