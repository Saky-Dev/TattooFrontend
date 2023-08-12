import './index.sass'

const GhostButton = ({ color = 'main', handleClick = () => { }, children }) => (
  <button className={`ghost-button type-${color}`} onClick={handleClick}>
    {children}
  </button>
)

export default GhostButton
