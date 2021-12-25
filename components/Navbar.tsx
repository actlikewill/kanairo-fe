import styles from '../styles/Navbar.module.css'
import  Link  from 'next/link'
import { FC } from "react"
import { signIn, signOut, useSession } from "next-auth/react"

const Navbar:FC = () => {

  const {data: session, status } = useSession()
  return (
    <nav className={styles.navbar}>
      <ul className={status === 'loading' ? styles.loading : styles.loaded}>
        <li><Link href="/"><a>Home</a></Link></li>
        <li><Link href="/profile"><a>Profile</a></Link></li>
        <li><Link href="/dashboard"><a>Dashboard</a></Link></li>
      
        {
          status !== 'loading' && !session && (
          <li><Link href="#">
              <a onClick={(e) => {
                e.preventDefault()
                signIn('Credentials')
              }} >Sign In
              </a>
            </Link>
          </li>
          )
        }

        {
          status !== 'loading' && session && (

            <li><Link href="#">
              <a onClick={(e) => {
                e.preventDefault()
                signOut()}}>
                Sign Out
                </a>
              </Link>
            </li>
          )

        }

        {
          status === 'loading' && (<li>Loading ...</li>)
        }
         {
           status === 'authenticated' && session?.user  && (<li>Welcome {session?.user.name}</li>)
         }

      </ul> 
    </nav>
  )
} 

export default Navbar