import Carousel from '../../components/carousel'
import Spectacular from '../../components/spectacular'
import landing01 from '../../assets/pictures/landing-01.jpg'
import landing02 from '../../assets/pictures/landing-02.jpg'
import landing03 from '../../assets/pictures/landing-03.jpg'
import homeSpectacular from '../../assets/pictures/home-spectacular.jpg'
import './index.sass'

const Home = () => {
  return (
    <main className='home'>
      <section className='almost'>
        <Carousel
          pictures={[landing01, landing02, landing03]}
          text={
            <>
              <div className='line'>
                <span className='red'>Conoce</span>Nuestras
              </div>
              <div className='line'>Sucursales</div>
            </>
          }
          isParagraph={false}
        />
      </section>
      <section className='full'>
        <Spectacular text='SHOGUN.INK' picture={homeSpectacular} />
      </section>
      <section className='almost' />
      <section className='full' />
      <section className='almost' />
    </main>
  )
}

export default Home
