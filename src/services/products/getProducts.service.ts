
export async function getProducts(token: string | unknown): Promise<any> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dish`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })

    if (res.ok){
        const productsList = await res.json();
        return productsList;
    }

    return undefined;
}