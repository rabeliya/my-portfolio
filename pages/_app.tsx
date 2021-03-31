// グローバルなCSSはこのファイルに読み込む
import 'reset-css'
import '../styles/base/globals.scss'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/navigation/navigation.scss'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
