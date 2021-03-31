import styles from '../styles/blocks/Footer.module.scss'
import BackBtn from './parts/GoBackBtn'
import ContactBtn from './parts/ContactBtn'
import Link from 'next/link';

interface Props {
  isContactBtn: boolean,
  isBackBtn: boolean
}

export default function TheFooter({ isContactBtn, isBackBtn }: Props) {
  return (
    <>
      {isBackBtn &&
        <BackBtn />
      }
      {isContactBtn &&
        <ContactBtn />
      }
      <footer className={styles.footer}>
        <ul className={styles.footerNav}>
          <li className={styles.listItem}><Link href='/about'><a>ABOUT</a></Link></li>
          <li className={styles.listItem}><Link href='/works'><a>WORKS</a></Link></li>
          <li className={styles.listItem}><Link href='/contact'><a>CONTACT</a></Link></li>
        </ul>
        <p className={styles.copyrights}>
          ©️2021 Kan Hikida
        </p>
      </footer>
    </>
  )
}