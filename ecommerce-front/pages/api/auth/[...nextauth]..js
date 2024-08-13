import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user = {
          id: token.id, // Ensure user.id is included
          name: token.name,
          email: token.email,
          image: token.picture,
        };
        session.accessToken = token.accessToken; // Include accessToken in session
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub; // Profile ID is used as user ID
        token.email = profile.email;
        token.name = profile.name;
        token.picture = profile.picture;
        token.accessToken = account.access_token;
        console.log("acc",account);
        console.log("pro",profile);


      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,  // Ensure this is set in your environment
};

export default NextAuth(authOptions);
