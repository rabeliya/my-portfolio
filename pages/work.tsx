
import HeadComponent from '../components/Head'
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'

export default function WorkPage({profile}) {
  return (
    <>
      <HeadComponent
        title={`Kan Hikida's Portfolio`}
        description={`Webデザイナー疋田貫のポートフォリオサイトです`}
      />
      <TheHeader/>
      <main>
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