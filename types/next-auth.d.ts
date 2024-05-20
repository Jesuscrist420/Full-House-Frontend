import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        token: string | unknown,
        user: {
            /** The user's postal address. */
            id: number,
            email: string,
            role: string,
            address: string,
            restaurant_id: number,
        }
    }
}