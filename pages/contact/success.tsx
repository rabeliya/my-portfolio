import HeadComponent from '../../components/Head'
import TheHeader from '../../components/TheHeader' 
import TheFooter from '../../components/TheFooter' 
import HomeBtn from '../../components/parts/GoHomeBtn'
import styles from '../../styles/pages/SuccessPage.module.scss'

export default function SuccessPage() {
  return (
    <>
      <HeadComponent
        title={`Kan Hikida's Portfolio -メール送信完了`}
        description={`お問い合わせ内容を送信できました。`}
      />
      <TheHeader/>
      <main>
        <div className={styles.thanksWrapper}>
          <h1 className={styles.thanksText}>Thank you.</h1>
          <p className={styles.thanksSubText}>お問い合わせありがとうございました。</p>
          <p className={styles.dateText}>お返事に2~3日かかる場合がございますが何卒よろしくお願いいたします。</p>
          <HomeBtn/>
        </div>
      </main>
      <TheFooter isContactBtn={false} isBackBtn={false}/>
    </>
  )
}