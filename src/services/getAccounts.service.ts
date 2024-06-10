export interface Account {
    id: number;
    "closing_timestamp": string
    "comment": string
    "opening_timestamp": string
    "restaurant_id": number
    "status": string
    "table_id": number
    "total": number
    "user_id": number

}
export async function getAccounts(token: string | unknown): Promise<Account[] | undefined> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })

    if (res.ok) {
        const accountsList = await res.json();
        return accountsList;
    }

    return undefined;
}