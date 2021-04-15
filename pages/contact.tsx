import HeadComponent from '../components/Head'
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'
import styles from '../styles/pages/ContactPage.module.scss'
import TopicPath from '../components/parts/TopicPath'
import ContactForm from '../components/parts/ContactForm'


export default function ContactPage({contact}) {
  return (
    <>
      <HeadComponent
        title={`Kan Hikida's Portfolio -お問い合わせページ`}
        description={`Webデザイナー疋田貫のポートフォリオサイトのお問い合わせページです。サイト制作やリニューアルについてのご相談がありましたら、是非フォームからお問い合わせください。`}
      />
      <TheHeader/>
      <main>
        <TopicPath
          childTitle={'CONTACT'}
          childPath={'/contact'}
          detailTitle={''}
          detailPath={''}
        />
        <section className={styles.contact}>
          <h1 className='subHeading'>CONTACT</h1>
          <div 
            className={styles.sectionInner}>
            <div
              className={styles.bodyContents} dangerouslySetInnerHTML={{
              __html:`${contact.body}`
              }}
            />
            <ContactForm/>
          </div>
        </section>
      </main>
      <TheFooter isContactBtn={false} isBackBtn={true}/>
    </>
  )
}

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY}
  }
  const data = await fetch('https://k-portfolio.microcms.io/api/v1/contact?fields=id,body',key)
  .then(res => res.json())
  .catch(() => null)
  return {
    props: {
      contact: data.contents[0]
    }
  }
}