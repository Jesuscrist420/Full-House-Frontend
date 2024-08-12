import Swal from 'sweetalert2';

type DeleteTableProps = {
    id: string | number,
    token: string | unknown,
}

export async function deleteTable({ id, token }: DeleteTableProps): Promise<Response | any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tables/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!res.ok) {
        void Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal'
        });
        return res;
    }

    if (res.ok) {
        void Swal.fire({
            icon: 'success',
            title: 'Mesa eliminada con éxito'
        });
    }

    return res;
}
