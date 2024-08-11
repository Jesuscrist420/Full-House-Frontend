import Swal from 'sweetalert2';

type DeleteEmployeeProps = {
    id: string | number,
    token: string | unknown,
}

export async function deleteEmployee({ id, token }: DeleteEmployeeProps): Promise<Response | any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!res.ok) {
        const text = await res.json()
        void Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: text.detail
        });
        return res;
    }

    if (res.ok) {
        void Swal.fire({
            icon: 'success',
            title: 'Empleado eliminado con éxito'
        });
    }

    return res;
}
