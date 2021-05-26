// グローバルなCSSはこのファイルに読み込む
import 'reset-css'
import '../styles/base/globals.scss'
import SimpleReactLightbox from 'simple-react-lightbox'

function MyApp({ Component, pageProps }) {
  return (
    <SimpleReactLightbox>
      <Component {...pageProps} />
    </SimpleReactLightbox>
  )
}

export default MyApp
