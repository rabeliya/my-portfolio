import HeadComponent from '../components/Head'
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'
import Image from 'next/image'
import styles from '../styles/pages/AboutPage.module.scss'
import TopicPath from '../components/parts/TopicPath'
import { GetStaticProps } from 'next'
import ContactBtn from '../components/parts/ContactBtn'

interface Profile {
  body: string,
  title: string,
  id: string
}

export default function AboutPage({ profile }) {
  return (
    <>
      <HeadComponent
        title={`Kan Hikida's Portfolio -プロフィールページ`}
        description={`Webデザイナー疋田貫のポートフォリオサイトのプロフィールページです。経歴や技能についての詳細を記載しています。ご依頼のきっかけになれば幸いです。他にもご不明な点はお問い合わせくださいませ。`}
      />
      <TheHeader/>
      <main className={styles.main}>
        <TopicPath
          childTitle={'ABOUT'}
          childPath={'/about'}
          detailTitle={''}
          detailPath={''}
        />
        <section className={styles.about}>
          <h1 className='subHeading'>ABOUT</h1>
          <div className={styles.sectionInner}>
            <div className={styles.imgWrapper}>
              <div className='colorShadowImage'>
                <Image
                  src={`/common/me@2x-min.jpg`}
                  width={233}
                  height={233}
                  layout={'fixed'}
                  loading={'lazy'}
                  quality={100}
                />
              </div>
            </div> 
            <div className={styles.textWrapper}>
              <ul>
                {profile.map((profile: Profile) => (
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
  const data = await fetch('https://k-portfolio.microcms.io/api/v1/profile?fields=body,title,id',key)
  .then(res => res.json())
  .catch(() => null)
  return {
    props: {
      profile: data.contents
    }
  }
}