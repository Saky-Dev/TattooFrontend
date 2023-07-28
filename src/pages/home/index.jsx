import Carousel from '../../components/carousel'
import landing01 from '../../assets/pictures/landing-01.jpg'
import landing02 from '../../assets/pictures/landing-02.jpg'
import landing03 from '../../assets/pictures/landing-03.jpg'
import './index.sass'

const Home = () => {
  return (
    <main>
      <section className='almost'>
        <Carousel pictures={[landing01, landing02, landing03]} />
      </section>
      <section className='full' />
      <section className='almost' />
      <section className='full' />
      <section className='almost' />
    </main>
  )
}

export default Home
