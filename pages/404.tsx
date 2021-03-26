
import HeadComponent from '../components/Head'

export default function Custom404() {
  return (
    <>
      <HeadComponent
        title={`error:404 エラーが起きました`}
        description={`404エラーが起きました。ページが読み込めないため、お手数ですがページを開き直してください。`}
      />
      <main className="main">
        <p>ページがありません</p>
      </main>
    </>
  )
}