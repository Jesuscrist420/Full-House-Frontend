import { z } from 'zod';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

type ProductProps = {
    id: number,
    category_id: number,
    description: string,
    in_stock: boolean,
    name: string,
    nutrition_info: string,
    preparation_time: number,
    price: number,
    token: string | unknown,
}

export const UpdateProductFormSchema = z.object({
    name: z.string().min(1).max(24, { message: 'Máximo 24 Cáracteres' }),
    description: z.string(),
});

export async function updateProduct({id, category_id, description, in_stock, name, nutrition_info, preparation_time, price, token }: ProductProps): Promise<Response | any> {

    // Validate form fields
    const validatedFields = UpdateProductFormSchema.safeParse({
        name: name,
        description: description,
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dish/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            category_id,
            description,
            in_stock,
            name,
            nutrition_info,
            preparation_time,
            price
        }),
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
        void Toast.fire({
            icon: 'success',
            title: 'Producto actualizado con éxito'
        });
    }

    return res;
}
