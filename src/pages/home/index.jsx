import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import TempDataContext from '../../common/context/tempData'
import Carousel from '../../components/carousel'
import Spectacular from '../../components/spectacular'
import EmailInput from '../../components/email-input'
import CombinedInput from '../../components/combined-input'
import MainButton from '../../components/main-button'
import PATHS from '../../common/const/paths'
import CATEGORIES from '../../common/const/categories'
import './index.sass'
import {
  LandingCarousel01, LandingCarousel02, LandingCarousel03,
  LandingGridButterflies, LandingGridComics, LandingGridDemons,
  LandingGridDogs, LandingGridJapanese, LandingGridMoons,
  LandingGridSkulls, LandingGridVideogames, LandingRegister,
  HomeSpectacular, LandingWhite01, LandingWhite02, LandingWhite03
} from '../../common/const/static/pictures'

const Home = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pictureIndex, setPictureIndex] = useState(0)

  const tempData = useContext(TempDataContext)

  const navigate = useNavigate()

  const sloganPictures = [LandingWhite01, LandingWhite02, LandingWhite03]

  const categoriesGrid = [
    { name: CATEGORIES.JAPANESE.TEXT, picture: LandingGridJapanese, value: CATEGORIES.JAPANESE.VALUE },
    { name: CATEGORIES.DOGS.TEXT, picture: LandingGridDogs, value: CATEGORIES.DOGS.VALUE },
    { name: CATEGORIES.MOONS.TEXT, picture: LandingGridMoons, value: CATEGORIES.MOONS.VALUE },
    { name: CATEGORIES.COMICS.TEXT, picture: LandingGridComics, value: CATEGORIES.COMICS.VALUE },
    { name: CATEGORIES.DEMONS.TEXT, picture: LandingGridDemons, value: CATEGORIES.DEMONS.VALUE },
    { name: CATEGORIES.SKULLS.TEXT, picture: LandingGridSkulls, value: CATEGORIES.SKULLS.VALUE },
    { name: CATEGORIES.BUTTERFLIES.TEXT, picture: LandingGridButterflies, value: CATEGORIES.BUTTERFLIES.VALUE },
    { name: CATEGORIES.VIDEOGAMES.TEXT, picture: LandingGridVideogames, value: CATEGORIES.VIDEOGAMES.VALUE }
  ]

  const handleGridClick = e => {
    const linked = Number(e.currentTarget.getAttribute('linked'))
    tempData.setCategory(categoriesGrid[linked].value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    tempData.setEmail(email)
    tempData.setPassword(password)

    navigate(PATHS.AUTH.REGISTER)
  }

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
          pictures={[LandingCarousel01, LandingCarousel02, LandingCarousel03]}
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
        <Spectacular text='SHOGUN.INK' picture={HomeSpectacular} />
      </section>
      <section className='almost categories'>
        <h2>Categorias</h2>
        <div className='grid'>
          {categoriesGrid.map((category, index) => (
            <div key={index}>
              <Link to={PATHS.PUBLIC.TATTOOS} onClick={handleGridClick} linked={index}>{category.name}</Link>
              <img src={category.picture} alt={category.name} />
            </div>
          ))}
        </div>
      </section>
      <section className='full preregister'>
        <form onSubmit={handleSubmit}>
          <h2>Registro</h2>
          <p>Busca plasmar tu estilo único y personalidad a traves de la tinta. Regístrate ahora y déjanos ayudarte a encontrar al artista perfecto para que tu piel cuente la historia que deseas compartir con el mundo.</p>
          <div className='data-container'>
            <EmailInput setEmail={setEmail} />
            <CombinedInput type='password' setValue={setPassword}>
              Registrar
            </CombinedInput>
          </div>
        </form>
        <div className='picture-container'>
          <div className='mask' />
          <img src={LandingRegister} alt='tattoo girl' />
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
          <Link to={PATHS.PUBLIC.TATTOOS}>
            <MainButton>
              Descubrir
            </MainButton>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Home
