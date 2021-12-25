import type { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export async function getServerSideProps (context: any) {
  const s = await getSession(context)
  console.log(s)

  return {
    props: {
      user: s?.user || null
    }
  }
}


const Profile = ({ user }: any) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Kanairo Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Profile Page</h1>
        
        <div>
         {
           user?.image &&
          <img src={user?.image} width={200} height={200} />
         } 

         
         <div className="flex">
           <p>Name</p>
           <p>{user?.name}</p>
         </div>
         <div className="flex">
           <p>Email</p>
           <p>{user?.email}</p>
         </div>
        </div>
      
      </main>
    </div>
  )
}
Profile.auth = true
export default Profile