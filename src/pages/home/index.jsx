import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from '../../components/carousel'
import Spectacular from '../../components/spectacular'
import EmailInput from '../../components/email-input'
import CombinedInput from '../../components/combined-input'
import MainButton from '../../components/main-button'
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
import landingRegister from '../../assets/pictures/landing-register.jpg'
import onWhite01 from '../../assets/pictures/on-white-01.jpg'
import onWhite02 from '../../assets/pictures/on-white-02.jpg'
import onWhite03 from '../../assets/pictures/on-white-03.jpg'
import './index.sass'

const Home = () => {
  const [pictureIndex, setPictureIndex] = useState(0)

  const sloganPictures = [onWhite01, onWhite02, onWhite03]

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
    e.preventDefault()
    const linked = Number(e.target.getAttribute('linked'))
    console.log(categoriesGrid[linked])
  }

  const handleSubmit = e => e.preventDefault()

  const handleInterval = () => {
    let index = pictureIndex + 1
    if (index === sloganPictures.length) { index = 0 }
    setPictureIndex(index)
  }

  useEffect(() => {
    const changer = setInterval(handleInterval, 3500)
    return () => clearInterval(changer)
  })

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
            <div key={index}>
              <Link to='/categories' onClick={handleGridClick} linked={index}>{category.name}</Link>
              <img src={category.picture} alt={category.name} />
            </div>
          ))}
        </div>
      </section>
      <section className='full preregister'>
        <form onSubmit={handleSubmit}>
          <h2>Registro</h2>
          <p>Si estás buscando plasmar tu estilo único y personalidad en un tatuaje impresionante, estás en el lugar adecuado. Regístrate en nuestra página de tatuajes y déjanos ayudarte a encontrar al artista perfecto para que tu piel cuente la historia que deseas compartir con el mundo.</p>
          <div className='data-container'>
            <EmailInput />
            <CombinedInput type='password'>
              Registrar
            </CombinedInput>
          </div>
        </form>
        <div className='picture-container'>
          <div className='mask' />
          <img src={landingRegister} alt='tattoo girl' />
        </div>
      </section>
      <section className='almost slogan'>
        <img src={sloganPictures[pictureIndex]} alt='example' />
        <div className='slogan-text'>
          <div className='text'>
            <span>Tu <div className='bold'>historia</div></span>
            <span>Tu <div className='red'>piel,</div>nuestra tinta</span>
          </div>
          <div className='line' />
          <MainButton>
            Descubrir
          </MainButton>
        </div>
      </section>
    </main>
  )
}

export default Home
