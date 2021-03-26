import styles from '../styles/blocks/Footer.module.scss'
import ContactBtn from './parts/ContactBtn'
import Link from 'next/link';

export default function TheFooter() {
  return (
    <>
      <ContactBtn />
      <footer className={styles.footer}>
        <ul className={styles.footerNav}>
          <li className={styles.listItem}><Link href='/about'><a>ABOUT</a></Link></li>
          <li className={styles.listItem}><Link href='/work'><a>WORKS</a></Link></li>
          <li className={styles.listItem}><Link href='/contact'><a>CONTACT</a></Link></li>
        </ul>
        <p className={styles.copyrights}>
          ©️2021 Kan Hikida
        </p>
      </footer>
    </>
  )
}