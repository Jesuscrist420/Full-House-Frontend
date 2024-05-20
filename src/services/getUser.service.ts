import { User } from "@/app/lib/definitions";

export async function getUser(userId: number): Promise<User | undefined> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (res.ok){
        const user = await res.json();
        return user;
    }

    return undefined;
}