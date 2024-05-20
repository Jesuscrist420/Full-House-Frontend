import { getUser } from "@/services/getUser.service"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    pages: {
        signIn: '/authentication'
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Cache-Control': 'max-age=120',
                        "Content-Type": "application/json"
                    }
                })

                const response = await res.json()

                // If no error and we have user data, return it
                if (res.ok && (Boolean(response.user))) {
                    return response
                }
                // Return null if user data could not be retrieved
                return null
            }
        }),
    ],
    callbacks: {
        async jwt({ token, trigger, user }) {
            if(trigger === "update"){
                const userInfo = token.user as any;
                const user = await getUser(userInfo.id);
                token.user = user;
            }
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token.user as any;
            session.token = token.token;
            return session;
        }
    },
    session: { strategy: "jwt" }
})

export { handler as GET, handler as POST }