import HeadComponent from '../../components/Head'
import TheHeader from '../../components/TheHeader' 
import TheFooter from '../../components/TheFooter' 
import BackBtn from '../../components/parts/GoBackBtn'
import styles from '../../styles/pages/FailedPage.module.scss'

export default function ErrorPage() {
  return (
    <>
      <HeadComponent
          title={`Kan Hikida's Portfolio -エラー`}
          description={`エラーが発生しました。ブラウザをリロードしてください。`}
      />
      <TheHeader/>
      <main>
        <div className={styles.errorWrapper}>
          <h1 className={styles.errorText}>Error occured</h1>
          <p className={styles.errorSubText}>エラーが発生しました...</p>
          <p className={styles.announceText}>お手数ですが一つ前のページにお戻りください。</p>
          <BackBtn/>
        </div>
      </main>
      <TheFooter />
    </>
  )
}