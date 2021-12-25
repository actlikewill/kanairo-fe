import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useSession, getSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export async function getServerSideProps (context: any) {
  return {
    props: {
      // props for the page
    }
  }
}


const Dashboard = () => {
  const { data: session } =  useSession()



  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Kanairo Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Dashboard</h1>
      </main>
    </div>
  )
}

Dashboard.auth = true
export default Dashboard