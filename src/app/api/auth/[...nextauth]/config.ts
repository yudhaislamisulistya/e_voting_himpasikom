import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      credentials: {
        email: { type: 'text' },
      },
      async authorize(credentials, req) {
        const user = {
          id: '',
          email: credentials?.email,
          trusted: false,
        }
        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        return (
          (profile?.email?.endsWith('@mail.ugm.ac.id') ?? false) ||
          (profile?.email?.endsWith('@ugm.ac.id') ?? false)
        )
      } else if (account?.provider === 'credentials') {
        return (
          (user.email?.endsWith('@mail.ugm.ac.id') ?? false) ||
          (user.email?.endsWith('@ugm.ac.id') ?? false)
        )
      }
      return false
    },
    async jwt({ token, user, account, profile }) {
      if (account) {
        const fromGoogle = account.provider === 'google'
        token.user = {
          email: (fromGoogle ? profile?.email : user.email) ?? 'xxx',
          trusted: account.provider == 'google',
        }
      }
      return token
    },
    async session({ session, token, user }) {
      session.user = token.user

      return session
    },
  },
  pages: {
    error: '/',
  },
}
