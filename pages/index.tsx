import HeadComponent from '../components/Head'
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import WorksSection from '../components/WorksSection'
import ContactBtn from '../components/parts/ContactBtn'
import { GetStaticProps } from 'next'
import styles from '../styles/pages/HomePage.module.scss'

export default function Home({works}:any) {
  return (
    <>
      <HeadComponent
        title={`Kan Hikida's Portfolio -ホーム`}
        description={`Webデザイナー疋田貫のポートフォリオサイトです。ウェブ制作のお仕事を承っています。ご依頼やご相談がありましたらお問い合わせページからお問い合わせくださいませ。`}
      />
      <TheHeader/>
      <main className={styles.main}>
        <HeroSection/>
        <AboutSection/>
        <WorksSection works={works}/>
        <ContactBtn/>
      </main>
      <TheFooter/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY}
  }
  const data = await fetch('https://k-portfolio.microcms.io/api/v1/works?fields=images,id&orders=-publishedAt&limit=3',key)
  .then(res => res.json())
  .catch(() => null)
  return {
    props: {
      works: data.contents
    }
  }
}
// npm run devで開発サーバーを立ち上げる
// npm run build で静的ファイルを生成できる