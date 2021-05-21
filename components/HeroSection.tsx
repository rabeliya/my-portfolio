import styles from '../styles/blocks/Hero.module.scss'
import LeadBtn from './parts/LeadBtn'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroHeading}>
          <p className={styles.titleName}>
            KAN HIKIDA
          </p>
          <p className={styles.titleJob}>
            Web Designer
          </p>
          <p className={styles.titleSkills}>HTML / CSS / JavaScript / Design</p>
        </h1>
        <LeadBtn
          path={`/works`}
          text={`作品集を見る`}
        />
        <div className={styles.scrollWrapper}>
          <span className={styles.arrowIcon}></span>
          <p className={styles.scrollText}>Scroll</p>
        </div>
      </div>
    </section>
  )
}