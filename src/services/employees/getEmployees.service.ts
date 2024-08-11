
export async function getEmployees(token: string | unknown): Promise<any> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })

    if (res.ok){
        const employeesList = await res.json();
        return employeesList;
    }

    return undefined;
}