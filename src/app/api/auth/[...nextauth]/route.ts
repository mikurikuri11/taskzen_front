import axios from 'axios'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import LineProvider from 'next-auth/providers/line'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID ?? '',
      clientSecret: process.env.LINE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider
      const uid = user?.id
      const name = user?.name
      const email = user?.email
      try {
        const response = await axios.post(`${apiUrl}/auth/${provider}/callback`, {
          provider,
          uid,
          name,
          email,
        })
        if (response.status === 200) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.log('エラー', error)
        return false
      }
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
    }),
  },
})

export { handler as GET, handler as POST }
