import NextAuth from 'next-auth'

interface MyUser {
  email: string
  trusted: boolean
}

declare module 'next-auth' {
  interface Session {
    user: MyUser
  }
  interface User extends MyUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: MyUser
  }
}
