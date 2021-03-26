// this is works detail page
import HeadComponent from '../../components/Head'

export default function WorksIs({works}) {
  return (
    <>
      <HeadComponent
        title={`Kan Hikida's Portfolio -${works.title}`}
        description={`Webデザイナー疋田貫のポートフォリオサイトの作品詳細ページです。個人制作からお仕事まで掲載しています。お仕事をご依頼される際の参考になればと思います。`}
      />
      <main>
        <h1>{works.title}</h1>
        <div dangerouslySetInnerHTML={{
          __html:`${works.body}`
          }}
        />
      </main>
    </>
  )
}

// 静的生成のパス指定
export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY}
  }
  const data = await fetch('https://k-portfolio.microcms.io/api/v1/works',key)
  .then(res => res.json())
  .catch(() => null)
  const paths = data.contents.map(content => `/works/${content.id}`)
  return {paths,fallback: false}
}

// データをテンプレートに渡す
export const getStaticProps = async context => {
  const id = context.params.id
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY}
  }
  const data = await fetch(`https://k-portfolio.microcms.io/api/v1/works/${id}`,key)
  .then(res => res.json())
  .catch(() => null)
  return {
    props: {
      works: data
    }
  }
}