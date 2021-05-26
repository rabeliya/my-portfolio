// this is works detail page
import React, { useState } from 'react'
import TheFooter from '../../components/TheFooter'
import TheHeader from '../../components/TheHeader'
import HeadComponent from '../../components/Head'
import ContactBtn from '../../components/parts/ContactBtn'
import TopicPath from '../../components/parts/TopicPath'
import styles from '../../styles/pages/DetailWork.module.scss'
import { GetStaticProps } from 'next'
import { SRLWrapper } from "simple-react-lightbox"

interface Work {
  body: string,
  id: string,
  title: string,
  client: string,
  skill: string
}


export default function WorksIs({work}) {

  const images = 
  [
    'slide1.jpg',
    'slide2.jpg',
    'slide3.jpg',
  ]

  const options = {
    
  }
  
  return (
    <>
      <HeadComponent
        title={`Kan Hikida's Portfolio -${work.title}`}
        description={`Webデザイナー疋田貫のポートフォリオサイトの作品詳細ページです。個人制作からお仕事まで掲載しています。お仕事をご依頼される際の参考になればと思います。`}
      />
      <TheHeader/>
      <main className={styles.main}>
        <TopicPath
          childTitle={'WORKS'}
          childPath={'/works'}
          detailTitle={work.title}
          detailPath={`/works/${work.id}`}
        />
        <section className={styles.work}>
          <h1 className='subHeading'>個別作品ページ</h1>
          <div className={styles.sectionInner}>
            <h2 className={styles.titleHeading}>{work.title}</h2>
            <div className={styles.thumbnails}>
              <SRLWrapper className={styles.slideContent}>
                {images.map((image,index) => {
                  return (
                    <a
                      href={`/slides/${ work.id + '/' + image}`}
                      className={styles.imgLink}
                      key={index}
                    >
                      <img
                        src={`/slides/${ work.id + '/' + image}`}
                        alt={image}
                        className={styles.slideImg}
                      />
                    </a>
                  )
                })}
              </SRLWrapper>
            </div>
            <p className={styles.clientName}>{work.client}</p>
            <p className={styles.skills}>{work.skill}</p>
            <div className={styles.bodyContents} dangerouslySetInnerHTML={{
              __html:`${work.body}`
              }}
            />
          </div>
        </section>
        <ContactBtn/>
      </main>
      <TheFooter/>
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