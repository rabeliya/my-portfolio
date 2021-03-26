import styles from '../styles/blocks/Hero.module.scss'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroHeading}>
          <span className={styles.titleName}>KAN HIKIDA</span>
          <span className={styles.titleJob}>Web Designer</span>
          <p className={styles.titleSkills}>HTML / CSS / JavaScript / Design</p>
        </h1>
        <p className={styles.titleCopy}>あなたのWeb制作を、お手伝いします。</p>
        <div className={styles.scrollWrapper}>
          {/* publicの画像の読み込み方に注意 */}
          <img src="/SVG/arrow.svg" alt="矢印のアイコン" className={styles.arrowIcon} />
          <p className={styles.scrollText}>Scroll</p>
        </div>
      </div>
    </section>
  )
}