import styles from '../styles/blocks/About.module.scss'
import Image from 'next/image'
import LeadBtn from './parts/LeadBtn'

export default function AboutSection() {
  return (
    <section className={styles.about}>
      <h2 className='subHeading'>ABOUT</h2>
      <div className={styles.sectionInner}>
        <div className='colorShadowImage'>
          <Image
            src={`/me@2x-min.jpg`}
            width={233}
            height={233}
            layout={'fixed'}
            loading={'lazy'}
          />
        </div>
        <div className={styles.profileText}>
          <p>株式会社メンバーズ所属Webデザイナーの<strong>疋田貫(Hikida Kan)</strong>です。サイトのデザイン/コーディングを主に行なっています。</p>
          <p>お客様とは<strong>パートナー</strong>として関わり並走しながら制作を進めます。お客様との対話の中でお客様が抱える思いを明確にし、デザインに落とし込みます。そして<strong>メンテナンス性</strong>を意識してコーディングを行い、Webサイトを制作します。</p>
          <p>お問い合わせページよりご依頼やお問い合せを承っています。</p>
        </div>
        <LeadBtn path={`/about`} text={`詳細を見る`}/>
      </div>
    </section>
  )
}