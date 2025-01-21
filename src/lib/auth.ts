import NextAuth, { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
// import Instagram from "next-auth/providers/instagram"
// import LINE from "next-auth/providers/line"
// import Threads from "next-auth/providers/threads"
// import Tiktok from "next-auth/providers/tiktok"
// import Twitter from "next-auth/providers/twitter"

export const authConfig = {
  providers: [Google, Github],
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
});
