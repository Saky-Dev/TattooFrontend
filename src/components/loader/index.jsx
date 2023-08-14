import { Rings } from 'react-loader-spinner'
import './index.sass'

const Loader = () => (
  <Rings
    height='200'
    width='200'
    color='#FF1457'
    visible
    ariaLabel='rings-loading'
  />
)

export default Loader
