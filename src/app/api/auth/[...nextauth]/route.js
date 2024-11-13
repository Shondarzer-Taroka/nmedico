



// import { connectDB } from "@/lib/connectDB";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from 'bcrypt';

// export const authOptions = {
//   secret: process.env.SECRET, // Correcting the secret key
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         username: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         let { email, password, role } = credentials;

//         if (!email || !password) {
//           return null;
//         }

//         let db = await connectDB();
//         let userCollection = db.collection('users');
//         let currentUser = await userCollection.findOne({ email });

//         if (!currentUser) {
//           return null;
//         }

//         let passwordMatch = await bcrypt.compare(password, currentUser.password);
//         if (!passwordMatch) {
//           return null;
//         }

//         return currentUser;
//       },
//     }),

  
//   ],

//   callbacks: {
//     async jwt({ token, account, user }) {
//       // Persist the OAuth access_token and or the user id to the token right after signin
//       if (account && user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token, user }) {
//       // Set role in session
//       if (token.role) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
  
//   pages: {
//     signIn: '/login',
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };





// import { connectDB } from "@/lib/connectDB";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from 'bcrypt';

// export const authOptions = {
//   secret: process.env.SECRET,
  
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//     updateAge: 24 * 60 * 60, // Update every day
//     cookies: {
//       sessionToken: {
//         name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
//         options: {
//           httpOnly: true,
//           secure: process.env.NODE_ENV === 'production', // Only send secure cookies in production
//           sameSite: 'lax',
//           path: '/',
//         },
//       },
//     },
//   },
  
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         username: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         let { email, password, role } = credentials;

//         if (!email || !password) {
//           return null;
//         }

//         let db = await connectDB();
//         let userCollection = db.collection('users');
//         let currentUser = await userCollection.findOne({ email });

//         if (!currentUser) {
//           return null;
//         }

//         let passwordMatch = await bcrypt.compare(password, currentUser.password);
//         if (!passwordMatch) {
//           return null;
//         }

//         return currentUser;
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
//     }),
//     FacebookProvider({
//       clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET
//     })
//   ],

//   callbacks: {
//     async jwt({ token, account, user }) {
//       if (account && user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token.role) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },

//   pages: {
//     signIn: '/login',
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };




// // for setting role google

import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
  secret: process.env.SECRET,
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update every day
    cookies: {
      sessionToken: {
        name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Only send secure cookies in production
          sameSite: 'lax',
          path: '/',
        },
      },
    },
  },
  
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        let { email, password, role } = credentials;

        if (!email || !password) {
          return null;
        }

        let db = await connectDB();
        let userCollection = db.collection('users');
        let currentUser = await userCollection.findOne({ email });

        if (!currentUser) {
          return null;
        }

        let passwordMatch = await bcrypt.compare(password, currentUser.password);
        if (!passwordMatch) {
          return null;
        }

        return currentUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET
    })
  ],

  callbacks: {
    // JWT callback to include role
    async jwt({ token, account, user }) {
      const db = await connectDB();
      const userCollection = db.collection('users');
  
      if (account) {
        // Check if user exists in DB
        const dbUser = await userCollection.findOne({ email: token.email });
  
        if (dbUser) {
          // If user exists, get the role from DB
          token.role = dbUser.role;
        } else {
          // If user does not exist (OAuth login), create new user with default role
          const newUser = {
            name: user.name || '',
            email: user.email || '',
            image: user.image ||'',
            role: 'user', // Default role
            createdAt: new Date(),
          };
          await userCollection.insertOne(newUser);
          token.role = newUser.role;
        }
      }
  
      return token;
    },
  
    // Session callback to include role in session
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };







// import { connectDB } from "@/lib/connectDB";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from 'bcrypt';

// export const authOptions = {
//   secret: process.env.SECRET,

//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60,
//     updateAge: 24 * 60 * 60,
//   },

//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;

//         if (!email || !password) return null;

//         const db = await connectDB();
//         const userCollection = db.collection('users');
//         const currentUser = await userCollection.findOne({ email });

//         if (!currentUser) return null;

//         const passwordMatch = await bcrypt.compare(password, currentUser.password);
//         if (!passwordMatch) return null;

//         return currentUser;
//       },
//     }),
    
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
//     }),

//     FacebookProvider({
//       clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
//     }),
//   ],

//   callbacks: {
//     // JWT callback to include role
//     async jwt({ token, account, user }) {
//       const db = await connectDB();
//       const userCollection = db.collection('users');

//       if (account) {
//         // Check if user exists in DB
//         const dbUser = await userCollection.findOne({ email: token.email });

//         if (dbUser) {
//           // If user exists, get the role from DB
//           token.role = dbUser.role;
//         } else {
//           // If user does not exist (OAuth login), create new user with default role
//           const newUser = {
//             name: user.name,
//             email: user.email,
//             image: user.image,
//             role: 'user', // Default role
//             createdAt: new Date(),
//           };
//           await userCollection.insertOne(newUser);
//           token.role = newUser.role;
//         }
//       }

//       return token;
//     },

//     // Session callback to include role in session
//     async session({ session, token }) {
//       if (token.role) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },

//   pages: {
//     signIn: '/login',
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
