
export async function getCategories(token: string | unknown): Promise<any> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })

    if (res.ok){
        const categoriesList = await res.json();
        return categoriesList;
    }

    return undefined;
}