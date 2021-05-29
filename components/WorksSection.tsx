import styles from '../styles/blocks/Works.module.scss'
import Image from 'next/image'
import PropTypes from 'prop-types'
import Link from 'next/link'
import LeadBtn from './parts/LeadBtn'

export default function WorksSection({ works } :any) {
  return (
    <section className={styles.works}>
      <h2 className='subHeading'>WORKS</h2>
      <div className={styles.sectionInner}>
        <ul className={styles.workList}>
          {works.map(work => (
            <li key={work.id} className={styles.workItem}>
              <Link href={`/works/${work.id}`}>
                <a>
                  <Image 
                    src={work.images.url}
                    alt={work.title}
                    width={368}
                    height={208}
                    layout={'intrinsic'}
                    loading={'lazy'}
                    className='pointer'
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <LeadBtn path={`/works`} text={`他の作品を見る`}/>
      </div>
    </section>
  )
}

WorksSection.propTypes = {
  works: PropTypes.any
}