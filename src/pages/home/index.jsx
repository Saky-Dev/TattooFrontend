import { Link } from 'react-router-dom'
import Carousel from '../../components/carousel'
import Spectacular from '../../components/spectacular'
import landing01 from '../../assets/pictures/landing-01.jpg'
import landing02 from '../../assets/pictures/landing-02.jpg'
import landing03 from '../../assets/pictures/landing-03.jpg'
import landingGridJapanese from '../../assets/pictures/landing-grid-japanese.jpg'
import landingGridDogs from '../../assets/pictures/landing-grid-dogs.jpg'
import landingGridMoons from '../../assets/pictures/landing-grid-moons.jpg'
import landingGridComics from '../../assets/pictures/landing-grid-comics.jpg'
import landingGridDemons from '../../assets/pictures/landing-grid-demons.jpg'
import landingGridSkulls from '../../assets/pictures/landing-grid-skulls.jpg'
import landingGridButterflies from '../../assets/pictures/landing-grid-butterflies.jpg'
import landingGridVideogames from '../../assets/pictures/landing-grid-videogames.jpg'
import homeSpectacular from '../../assets/pictures/home-spectacular.jpg'
import './index.sass'

const Home = () => {
  const categoriesGrid = [
    { name: 'Japones', picture: landingGridJapanese },
    { name: 'Perros', picture: landingGridDogs },
    { name: 'Lunas', picture: landingGridMoons },
    { name: 'Comics', picture: landingGridComics },
    { name: 'Demonios', picture: landingGridDemons },
    { name: 'Calaveras', picture: landingGridSkulls },
    { name: 'Mariposas', picture: landingGridButterflies },
    { name: 'Videojuegos', picture: landingGridVideogames }
  ]

  const handleGridClick = e => {

  }

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
      <section className='almost categories'>
        <h2>Categorias</h2>
        <div className='grid'>
          {categoriesGrid.map((category, index) => (
            <Link to='/categories' key={index} onClick={handleGridClick} linked={index}>
              <span>{category.name}</span>
              <img src={category.picture} alt={category.name} />
            </Link>
          ))}
        </div>
      </section>
      <section className='full' />
      <section className='almost' />
    </main>
  )
}

export default Home
