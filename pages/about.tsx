import HeadComponent from '../components/Head'
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'
import Link from 'next/link';
import styles from '../styles/pages/AboutPage.module.scss'
import Image from 'next/image'

// ぱんくずリストをコンポーネント化したい
export default function AboutPage({profile}) {
  return (
    <>
      <HeadComponent
        title={`Kan Hikida's Portfolio -プロフィールページ`}
        description={`Webデザイナー疋田貫のポートフォリオサイトのプロフィールページです。経歴や技能についての詳細を記載しています。ご依頼のきっかけになれば幸いです。他にもご不明な点はお問い合わせくださいませ。`}
      />
      <TheHeader/>
      <main>
        <ul className='breadcrumbTrail'>
          <li className='listItem'>
            <Link href="/">
              <a>HOME</a>
            </Link>
          </li>
          <li className='listItem'>
            <Link href="/about">
              <a>ABOUT</a>
            </Link>
          </li>
        </ul>
        <section className={styles.about}>
          <h1 className='subHeading'>About</h1>
          <div className={styles.sectionInner}>
            <div className={styles.imgWrapper}>
              <div className='colorShadowImage'>
                <Image
                  src={`/me@2x-min.jpg`}
                  width={233}
                  height={233}
                  layout={'fixed'}
                  loading={'lazy'}
                />
              </div>
            </div> 
            <div className={styles.textWrapper}>
              <ul>
                {profile.map(profile => (
                  <li key={profile.id}>
                    <h2>{profile.title}</h2>
                    <div dangerouslySetInnerHTML=
                      {{ __html:`${profile.body}` }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <TheFooter/>
    </>
  )
}

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY}
  }
  const data = await fetch('https://k-portfolio.microcms.io/api/v1/profile',key)
  .then(res => res.json())
  .catch(() => null)
  return {
    props: {
      profile: data.contents
    }
  }
}