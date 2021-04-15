// this is works detail page
import TheFooter from '../../components/TheFooter'
import TheHeader from '../../components/TheHeader'
import HeadComponent from '../../components/Head'
import TopicPath from '../../components/parts/TopicPath'
import styles from '../../styles/pages/DetailWork.module.scss'
import { GetStaticProps } from 'next'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import Image from 'next/image'

SwiperCore.use([Navigation,Pagination,Autoplay])

interface Work {
  body: string,
  id: string,
  title: string,
  client: string,
  skill: string
}

export default function WorksIs({work}) {
  // const images = 
  // [
  //   '/slides/slide1/work1_slide1.jpg',
  //   '/slides/slide1/work1_slide2.jpg',
  //   '/slides/slide1/work1_slide3.jpg',
  // ]
  const images = 
  [
    {url: '/slides/slide1/work1_slide1.jpg', id: 1},
    {url: '/slides/slide1/work1_slide2.jpg', id: 2},
    {url: '/slides/slide1/work1_slide3.jpg', id: 3}
  ]
  return (
    <>
      <TheHeader/>
      <HeadComponent
        title={`Kan Hikida's Portfolio -${work.title}`}
        description={`Webデザイナー疋田貫のポートフォリオサイトの作品詳細ページです。個人制作からお仕事まで掲載しています。お仕事をご依頼される際の参考になればと思います。`}
      />
      <main>
        <TopicPath
          childTitle={'WORKS'}
          childPath={'/works'}
          detailTitle={work.title}
          detailPath={`/works/${work.id}`}
        />
        <section className={styles.work}>
          <h1 className='subHeading'>{work.title}</h1>
          <div className={styles.sectionInner}>
            <h2 className={styles.titleHeading}>{work.title}</h2>
            <div className={styles.swiperContainer}>
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={false}
                autoplay={
                  {
                    delay: 6000, disableOnInteraction: false
                  }
                }
                pagination={{clickable: true}}
                navigation
                width={664}
              >
                {images.map(image => {
                  return(
                    <SwiperSlide key={image.id}>
                      <Image
                        src={image.url}
                        width={664}
                        height={498}
                        layout={'fixed'}
                      />
                    </SwiperSlide>
                  )
                })}
              </Swiper>              
            </div>
            <p className={styles.clientName}>{work.client}</p>
            <p className={styles.skills}>{work.skill}</p>
            <div className={styles.bodyContents} dangerouslySetInnerHTML={{
              __html:`${work.body}`
              }}
            />
          </div>
        </section>
      <TheFooter isContactBtn={true} isBackBtn={true}/>
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
export const getStaticProps: GetStaticProps = async context => {
  const id = context.params.id
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY}
  }
  const data: Work = await fetch(`https://k-portfolio.microcms.io/api/v1/works/${id}?fields=body,id,title,client,skill`,key)
  .then(res => res.json())
  .catch(() => null)
  return {
    props: {
      work: data
    }
  }
}