import HeadComponent from '../../../components/Head'
import TheHeader from '../../../components/TheHeader'
import TheFooter from '../../../components/TheFooter'
import TopicPath from '../../../components/parts/TopicPath'
import ContactBtn from '../../../components/parts/ContactBtn'
import { Pagination } from '@material-ui/lab';
import styles from '../../../styles/pages/WorksPage.module.scss'
import React,{ useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next'

const PER_PAGE = 6

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

export default function WorkPage({ works,totalCount, limit }: Props) {  
  const router = useRouter()
  // String()としてStringオブジェクトに入れることで
  // offsetがstringやstring[]でも対応している
  // Number.parseIntで、対象が文字列でない場合は文字列
  // に変換した後で整数に変換する
  const offset = router.query.id ? Number.parseInt(String(router.query.id)) : 1
  const handleChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      router.push(`/works/page/${page}`)
    },
    [router]
  )
  return (
    <>
      <HeadComponent
        title={`Kan Hikida's Portfolio - 作品集ページ`}
        description={`Webデザイナー疋田貫のポートフォリオサイトです。このページでは作品集を掲載しています。`}
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
                      quality={100}
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
              page={offset}
            />
          </div>
        </section>
        <ContactBtn/>
      </main>
      <TheFooter/>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY}
  }
  const res = await fetch('https://k-portfolio.microcms.io/api/v1/works',key)

  const repos = await res.json()
  const pageNumbers = []
  const range = (start :number,end :number) => [...Array(end - start + 1)].map((_,i) => start + i)
  // ex) range(1,5) -> [1,2,3,4,5]
  const paths = range(1,Math.ceil(repos.totalCount / PER_PAGE)).map(repo => `/works/page/${repo}`)
  // fallback false returns 404 error
  return {paths,fallback: false}
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number.parseInt(String(context.params.id))
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY}
  }
  const data = await fetch(`https://k-portfolio.microcms.io/api/v1/works?fields=id,images&orders=publishedAt&offset=${(id -1) * 6}&limit=6`,key)
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
