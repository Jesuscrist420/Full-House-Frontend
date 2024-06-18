export interface Account {
    "id": number;
    "closing_timestamp": string
    "comment": string
    "opening_timestamp": string
    "restaurant_id": number
    "status": string
    "table_id": number
    "total": number
    "user_id": number

}
export interface CreateAccount {
    "comment": string
    "table_id": number
    "total": number
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

export async function addAccount(token: string | unknown, account: CreateAccount): Promise<any> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(account)
    })

    if (res.ok) {
        return res.json();
    }

    return undefined;
}

export async function updateAccount(token: string | unknown, account: Account): Promise<any> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/${account.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(account)
    })

    if (res.ok) {
        return res.json();
    }

    return undefined;
}

export async function deleteAccount(token: string | unknown, account: Account): Promise<any> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/${account.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (res.ok) {
        return res.json();
    }

    return undefined;
}

export async function closeAccount(token: string | unknown, account: Account): Promise<any> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/${account.id}/close`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(account)
    })

    if (res.ok) {
        return res.json();
    }

    return undefined;
}

/* add dish with POST /accounts/{account_id}/dishes
query dish_id and quantity
*/
export async function addDish(token: string | unknown, account_id: number, dish_id: number, quantity: number): Promise<any> {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/${account_id}/dishes/?dish_id=${dish_id}&quantity=${quantity}`;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/${account_id}/dishes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })

    if (res.ok) {
        return res.json();
    }

    return undefined;
}
/* update dish in account with PUT /accounts/{account_id}/dishes/{dish_id}
query quantity
*/
export async function updateDish(token: string | unknown, account_id: number, dish_id: number, quantity: number): Promise<any> {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/${account_id}/dishes/${dish_id}?quantity=${quantity}`;
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })

    if (res.ok) {
        return res.json();
    }

    return undefined;
}
/* delete dish in account with DELETE /accounts/{account_id}/dishes/{dish_id}
*/
export async function deleteDish(token: string | unknown, account_id: number, dish_id: number): Promise<any> {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts/${account_id}/dishes/${dish_id}`;
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })

    if (res.ok) {
        return res.json();
    }

    return undefined;
}