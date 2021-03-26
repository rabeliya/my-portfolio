import HeadComponent from '../components/Head'
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'
import Link from 'next/link';

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
            <Link href="#">
              <a>ABOUT</a>
            </Link>
          </li>
        </ul>
        <h1>About</h1>
        <ul>
          {profile.map(profile => (
            <li key={profile.id}>
              {profile.title}
              {profile.body}
            </li>
          ))}
        </ul>
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