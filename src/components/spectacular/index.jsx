import './index.sass'

const Spectacular = ({ text = '', picture = undefined }) => {
  return (
    <div className='spectacular'>
      <h1>{text}</h1>
      <div className='mask' />
      {picture
        ? <img src={picture} alt={text} />
        : <></>}
    </div>
  )
}

export default Spectacular
