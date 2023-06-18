'use client';
import Image from 'next/image';
import styles from './page.module.css';
import Grid from './grid';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Get spacex last launch data_</p>
      </div>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          style={{ marginTop: 70 }}
          src='/spacex.svg'
          alt='Mars Logo'
          width={400}
          height={400}
          priority
        />
      </div>
      <Grid />
    </main>
  );
}
