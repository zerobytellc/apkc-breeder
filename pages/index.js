import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.home}>
       <h2>Welcome to the APKC Breeder site</h2>
      <div>
        <p>Welcome to the APKC Breeder database of the <Link href="https://americanpomskykennelclub.org">American Pomsky Kennel Club</Link>.</p>
      </div>
    </div>
  )
}
