
import HeadComponent from '../components/Head'
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'
import ContactBtn from '../components/parts/ContactBtn'
import styles from '../styles/pages/WorksPage.module.scss'
import { Pagination } from '@material-ui/lab';
import React,{ useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import TopicPath from '../components/parts/TopicPath'

interface Images {
  url: string,
  height: number,
  width: number
}

interface Works {
  id: string,
  title: string,
  images: Images
}

interface Props {
  works: Works[],
  totalCount: number,
  limit: number
}

export default function WorkPage({ works,totalCount, limit }:Props) {  
  const router = useRouter()
  const offset = router.query.offset
  const rooter = useRouter()
  const handleChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      rooter.push(`/works/page/${page}`)
    },
    [rooter]
  )
  return (
    <>
      <HeadComponent
        title={`Kan Hikida's Portfolio -作品集ページ`}
        description={`Webデザイナー疋田貫のポートフォリオサイトです。今までの作品を一覧でまとめています。`}
      />
      <TheHeader/>
      <main className={styles.main}>
        <TopicPath
          childTitle={'WORKS'}
          childPath={'/works'}
          detailTitle={''}
          detailPath={''}
        />
        <section className={styles.works}>
          <h1 className='subHeading'>WORKS</h1>
          <div className={styles.sectionInner}>
            <ul className={styles.workList}>
            {works.map(work => (
              <li key={work.id} className={styles.workItem}>
                <Link href={`/works/${work.id}`}>
                  <a className='pointer'>
                    <Image 
                      src={work.images.url}
                      alt={work.title}
                      width={368}
                      height={208}
                      layout={'intrinsic'}
                      loading={'lazy'}
                    />
                  </a>
                </Link>
              </li>
            ))}
            </ul>
            <Pagination
              count={Math.ceil(totalCount / limit)}
              shape='rounded'              
              color='primary'
              variant='outlined'
              onChange={handleChangePage}
            />
          </div>
        </section>
        <ContactBtn/>
      </main>
      <TheFooter/>
    </>
  )
}

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY}
  }
  const data = await fetch('https://k-portfolio.microcms.io/api/v1/works?fields=id,images&orders=publishedAt&limit=6',key)
  .then(res => res.json())
  .catch(() => null)
  return {
    props: {
      works: data.contents,
      totalCount: data.totalCount,
      limit: data.limit
    }
  }
}