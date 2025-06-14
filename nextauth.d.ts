import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name: string
            email: string
            emailVerified: string
            image: string
            role: string
        } & DefaultSession["user"]
    }
}