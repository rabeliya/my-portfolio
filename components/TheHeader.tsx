import styles from '../styles/blocks/Header.module.scss'
import Link from 'next/link';

export default function TheHeader() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.logoIcon}>LOGO</a>
      </Link>
    </header>
  )
}