//if we want to put something in all the routes we put it here, fpr example header/Nav
import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main className='container'>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp