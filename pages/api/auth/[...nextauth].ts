import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    {
      id: "netlify",
      name: "Netlify",
      type: "oauth",
      version: "2.0",
      authorization: "https://app.netlify.com/authorize?scope=user",
      token: "https://api.netlify.com/oauth/token",
      userinfo: "https://api.netlify.com/api/v1/user",
      profile(profile: any) {
        return {
          id: profile.id,
          name: profile.full_name || profile.email,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
      clientId: process.env.AUTH_NETLIFY_ID!,
      clientSecret: process.env.AUTH_NETLIFY_SECRET!,
      style: {
        logo: "/netlify.svg",
        bg: "#00C7B7",
        text: "#fff",
      },
    },
    {
      id: "yandex",
      name: "Yandex",
      type: "oauth",
      version: "2.0",
      authorization: "https://oauth.yandex.ru/authorize?scope=login:email login:info login:avatar",
      token: "https://oauth.yandex.ru/token",
      userinfo: "https://login.yandex.ru/info?format=json",
      profile(profile: any) {
        return {
          id: profile.id || profile.psuid,
          name: profile.display_name || profile.real_name || profile.login,
          email: profile.default_email || profile.emails?.[0],
          image: profile.default_avatar_id 
            ? `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200`
            : null,
        }
      },
      clientId: process.env.AUTH_YANDEX_ID!,
      clientSecret: process.env.AUTH_YANDEX_SECRET!,
      style: {
        logo: "/yandex.svg",
        bg: "#FC3F1D",
        text: "#fff",
      },
    },
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          })

          if (!response.ok) {
            return null
          }

          const user = await response.json()

          return {
            id: user.id.toString(),
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            image: user.image,
          }
        } catch (error) {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
}

export default NextAuth(authOptions)
