import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession, signIn } from 'next-auth/react'
import Navbar from '../components/Navbar'


function Auth({ children }: { children: React.ReactNode } |  any) {
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (status === "loading") return
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, status])

  if (isUser) {
    return children
  }
  return <div>Loading...</div>
}


function Kanairo({ Component, pageProps: { session, ...pageProps} }: AppProps | any) {
  return (
    <>
      <SessionProvider session={session}>
        <Navbar />
        {
          Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )
        }
      </SessionProvider>
    </>
  )
}
export default Kanairo

