import { useEffect, useState } from 'react'
import Carousel from '../../components/carousel'
import Spectacular from '../../components/spectacular'
import { ENDPOINTS } from '../../common/const/paths'
import { ConnectionError, DataError } from '../../common/const/errors'
import { About01, About02, About03, AboutSpectacular } from '../../common/const/static/pictures'
import { Test } from '../../common/const/static/icons'
import './index.sass'

const About = () => {
  const [tattooArtists, setTattooArtists] = useState([])

  const getArtists = () => {
    fetch(ENDPOINTS.ARTISTS, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data) && !('artists' in data)) {
          throw new DataError('')
        }

        if (data.success) {
          setTattooArtists(data.artists)
        }
      })
      .catch(() => {
        throw new ConnectionError('')
      })
  }

  useEffect(() => {
    try {
      getArtists()
    } catch (error) {
      if (error instanceof ConnectionError || error instanceof DataError) {
        console.debug('Unexpected')
      }
    }
  }, [])

  const displayArtists = () => (
    <section className='tattoo-artists'>
      <h2>Nuestros profesionales</h2>
      <div className='artists'>
        {tattooArtists.map((artist, index) => (
          <div className='artist' key={index}>
            <div className='mask'>
              <span>{artist.name}</span>
            </div>
            <img src={artist.picture} alt='Artista' />
          </div>
        ))}
      </div>
    </section>
  )

  return (
    <main className='about'>
      <Spectacular text='Nosotros' picture={AboutSpectacular} />
      <div className='about-content'>
        <section className='carousel'>
          <Carousel
            pictures={[About01, About02, About03]}
            text={<>¡Bienvenido a <b>SHOGUN.INK!</b> Somos un estudio donde el arte cobra vida y tus historias se convierten en obras maestras en la piel.</>}
            isParagraph
          />
        </section>
        <section className='text'>
          <p>Con estándares de <b>calidad y seguridad</b> impecables, utilizamos equipos de primera y nos mantenemos actualizados en las últimas técnicas y tendencias.</p>
          <p>Queremos ser parte de tu historia, creando un tatuaje significativo que te haga sentir orgulloso cada vez que lo veas.</p>
          <img src={Test} alt='Pruebas' />
        </section>
        {tattooArtists.length > 0
          ? displayArtists()
          : <></>}
        <section className='text'>
          <p>Nuestro equipo de artistas talentosos y apasionados fusiona la creatividad, la pasión y el compromiso para ofrecerte una experiencia <b>personalizada y única.</b> Valoramos la comunicación abierta, comprendiendo tus deseos y necesidades para crear un diseño que refleje tu autenticidad.</p>
        </section>
      </div>
    </main>
  )
}

export default About
