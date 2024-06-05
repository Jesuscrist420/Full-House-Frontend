
export async function getTables(token: string | unknown): Promise<any> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tables`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })

    if (res.ok){
        const tablesList = await res.json();
        return tablesList;
    }

    return undefined;
}