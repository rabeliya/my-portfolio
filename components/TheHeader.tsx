import styles from '../styles/blocks/Header.module.scss'
import Link from 'next/link';

export default function TheHeader() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <img
            src="/common/logo.png"
            alt="サイトのロゴ"
            className={styles.logoIcon} 
          />
        </a>
      </Link>
    </header>
  )
}