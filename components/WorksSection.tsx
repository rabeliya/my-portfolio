import styles from '../styles/blocks/Works.module.scss'
import Image from 'next/image'
import PropTypes from 'prop-types'
import Link from 'next/link'

// export default function AboutSection() {
//   return (
//     <section className={styles.works}>
//       <h2 className='subHeading'>WORKS</h2>
//       <div className={styles.sectionInner}>
//         <ul>
//         </ul>
//         <button className='leadButton shadow pointer'>他の作品を見る {`>`}</button>
//       </div>
//     </section>
//   )
// }
export default function WorksSection({ works } :any) {
  return (
    <section className={styles.works}>
      <h2 className='subHeading'>WORKS</h2>
      <div className={styles.sectionInner}>
        <ul className={styles.workList}>
          {works.map(work => (
            <li key={work.id} className={styles.workItem}>
              {/* カードと画像の隙間がわからん!!! */}
              <Link href={`/works/${work.id}`}>
                <a>
                  <Image 
                    src={work.images.url}
                    alt={work.title}
                    width={392}
                    height={221}
                    layout={'fixed'}
                    loading={'lazy'}
                    className='pointer'
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <button className='leadButton shadow pointer'><Link href='/work'><a>他の作品を見る {`>`}</a></Link></button>
      </div>
    </section>
  )
}

WorksSection.propTypes = {
  works: PropTypes.any
}