import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:'246830549205-t2u4pmoj6p4g1uosq7url55hn73fk69m.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    // ...add more providers here
 
  ],
 callbacks:{ async session({session,token}){
    session.user.tag = session.user.name.split(" ").join("").toLocaleLowerCase()
    session.user.uid = token.sub
    return session
      
  }},
  
  secret: 'GDFVjvD456346FBGhs24234DFDDS23565FGbhgs-sb423sgbDFBD4223sdD76FHGFsdfs'
}

export default NextAuth(authOptions)