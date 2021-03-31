
import Link from 'next/link'
import styles from '../../styles/parts/TopicPath.module.scss'

interface Props {
  childTitle: string,
  childPath: string,
  detailTitle: string,
  detailPath: string,
}

export default function TopicPath ({childTitle, childPath, detailTitle, detailPath }: Props) {
  return (
    <ul className={styles.topicPath}>
      <li className={styles.listItem}>
        <Link href="/">
          <a>HOME</a>
        </Link>
      </li>
      <li className={styles.listItem}>
        <Link href={childPath}>
          <a>{childTitle}</a>
        </Link>
      </li>
      {detailTitle && 
        <li className={styles.listItem}>
          <Link href={detailPath}>
            <a>{detailTitle}</a>
          </Link>
        </li>
      }
    </ul>
  )
}