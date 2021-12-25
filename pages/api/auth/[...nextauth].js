import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  site: process.env.NEXT_PUBLIC_SITE_URL,
  session: {
    jwt: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days

  },
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
      scope: ['user:email']
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text', required: true, placeholder: 'Username'},
        password: {label: 'Password', type: 'password', required: true}
      },
        async authorize (credentials, req) {
          
          const {email, password} = credentials

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/login`, {
            method: 'POST',
            body: JSON.stringify({email, password }),
            headers: {
              'Content-Type': 'application/json'
            },
          })

          const { auth_token } = await res.json()
          console.log(auth_token)

          const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/me`, {
            headers: {
              'Authorization': `Token ${auth_token}`
            }
          })

          const user = await data.json()

          console.log(user)

          if (data.status === 200 && user) {
            user.name = user.username
            return user 
          }


          return null
        }
      }) 
  ],
  jwt: {
    secret: 'secret',
  },
  callbacks: {
    async jwt ({token, user}) {
      console.log("JWT==>",JSON.stringify(token))

      if (user) {
        token.id = user.id
      }
      return token
      
    },
    async session (d) {

      console.log("SESSION==>", JSON.stringify(d))
      // session.user.id = user.id
      return d.session
    }
  }
})