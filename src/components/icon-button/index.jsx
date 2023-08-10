import './index.sass'

const IconButton = ({ color = 'main', icon = undefined, name = '', onClick = () => {} }) => (
  <button className={`icon-button ${color}`} onClick={onClick}>
    {icon
      ? <img src={icon} alt={name} title={name} />
      : <></>}
  </button>
)

export default IconButton
