import './index.sass'

const MainButton = ({ color = 'main', handleClick = () => { }, children }) => (
  <button className={`main-button type-${color}`} onClick={handleClick}>
    {children}
  </button>
)

export default MainButton
