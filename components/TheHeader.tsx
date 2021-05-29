import styles from '../styles/blocks/Header.module.scss'
import Link from 'next/link';

export default function TheHeader() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <img
            src="/common/logo.svg"
            alt="サイトのロゴ"
            className={styles.logoIcon} 
            width={81}
            height={54}
          />
        </a>
      </Link>
    </header>
  )
}