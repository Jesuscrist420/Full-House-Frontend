import Swal from 'sweetalert2';

type DeleteProductProps = {
    id: string | number,
    token: string | unknown,
}

export async function deleteProduct({ id, token }: DeleteProductProps): Promise<Response | any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dish/${id}`, {
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
            title: 'Producto eliminado con éxito'
        });
    }

    return res;
}
