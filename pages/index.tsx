import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          hello to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <Link href='/posts/first-post'><a>跳到第一篇文章</a></Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
