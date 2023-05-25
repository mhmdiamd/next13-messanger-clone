import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'


import prisma from '@/app/libs/prismadb'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials : {
        email : {label : "email", type : "text"},
        password : {label : "password", type : "password"},
      },
      async authorize(credentials) {
        // console.log(credentials)
        if(!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials")
        } 

        // Get user First
        const user = await prisma.user.findUnique({
          where :{
            email: credentials?.email
          }
        })


        // Error handling if user not found
        if(!user || !user?.hashedPassword) {
          throw new Error("Invalid Credentials")
        }


        // Password match comparasion 
        const isCorrectPassword = await bcrypt.compare(
          credentials?.password as string,
          user?.hashedPassword
        )

        if (!isCorrectPassword){
          throw new Error("Invalid Credentials")
        } 

        return user
      }
    })
  ],
  debug : process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}