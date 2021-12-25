import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

const Home: NextPage = () => {

  const { data: session, status} = useSession()
  console.log({status, session});
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Kanairo | Home</title>
        <meta name="description" content="Kanairo, buy and sell in Nairobi and beyond." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="flex justify-center py-16 w-100 border-black bg-gray-200">
          <div className="flex flex-col items-center justify-center">
            <img src="/kanairo-logo2.svg" width={200} height={200} />
            <div>
              <input type="text" className="px-4 py-1 rounded-sm mx-2 border-2 my-2" placeholder="Search for products" />
              <button className="text-white px-4 py-1 border-2 border-teal-500 rounded-sm font-bold bg-teal-500 ">Search</button>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
          Powered by Kanairo WebSpaces
      </footer>
    </div>
  )
}

export default Home
