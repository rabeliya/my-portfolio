// グローバルなCSSはこのファイルに読み込む
import 'reset-css'
import '../styles/base/globals.scss'


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
