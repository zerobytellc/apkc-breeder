import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Admin() {
    return (
        <div className={styles.home}>
            <h2>APKC Administration</h2>
            <div>
                <p>This is where you will manage the registered breeders, including adding new breeders, de-activating breeders that are not current on their membership, and any other activities associated with breeder registrations.</p>
            </div>
        </div>
    )
}
