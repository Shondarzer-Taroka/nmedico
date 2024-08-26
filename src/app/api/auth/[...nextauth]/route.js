import { connectDB } from "@/lib/connectDB"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'

// const handler = NextAuth({
//     secret: process.env.NEXT_PUBLIC_SECRET,
//     session: {
//         strategy: 'jwt',
//         maxAge: 30 * 24 * 60 * 60, // 30 days
//     },
//     providers: [
//         CredentialsProvider({
//             // name: 'Credentials',
//             credentials: {
//                 username: {},
//                 password: {}
//             },



//             async authorize(credentials) {
//                 let { email, password,role } = credentials
//                 if (!email || !password) {
//                     return null

//                 }

//                 let db = await connectDB()
//                 let userCollection = db.collection('users')
//                 let currentUser = await userCollection.findOne({ email })

//                 if (!currentUser) {
//                     return null
//                 }
//                 let passwordMatch = bcrypt.compareSync(password, currentUser.password);
//                 if (!passwordMatch) {
//                     return null
//                 }

//                 return currentUser
//             }
//         }),

//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//           })
//     ],

//     callbacks: {
      
//         async jwt({ token, account ,user,}) {
//             // Persist the OAuth access_token and or the user id to the token right after signin
//             if (account) {
//                 token.role = user.role
//             //    token.profile=user.profile
//             }
//             return token
//         },
//           async session({ session, token, user }) {
//             // Send properties to the client, like an access_token and user id from a provider.
//             session.user.role = token.role
//             // session.user.profile=profileImage
//             return session
//         }
//     },
//     pages: {
//         signIn: '/login'
//     }
// })
export const authPtions={
    secret: process.env.NEXT_PUBLIC_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            // name: 'Credentials',
            credentials: {
                username: {},
                password: {}
            },



            async authorize(credentials) {
                let { email, password,role } = credentials
                if (!email || !password) {
                    return null

                }

                let db = await connectDB()
                let userCollection = db.collection('users')
                let currentUser = await userCollection.findOne({ email })

                if (!currentUser) {
                    return null
                }
                let passwordMatch = bcrypt.compareSync(password, currentUser.password);
                if (!passwordMatch) {
                    return null
                }

                return currentUser
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
    ],

    callbacks: {
      
        async jwt({ token, account ,user,}) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.role = user.role
            
            }
            return token
        },
          async session({ session, token, user }) {
           
            session.user.role = token.role
            
            return session
        }
    },
    pages: {
        signIn: '/login'
    }
}
const handler=NextAuth(authPtions)

export { handler as GET, handler as POST }






