import { z } from 'zod';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

type productProps = {
    category_id: number,
    description: string,
    in_Stock: boolean,
    name: string,
    nutrition_info: string,
    preparation_time: number,
    price: number,
    token: string | unknown,
}

export const CreateProductFormSchema = z.object({
    name: z.string().min(1).max(14, {message: 'Máximo 14 Cáracteres'}),
    description: z.string(),
  })

export async function createProduct({category_id, description, in_Stock, name, nutrition_info, preparation_time, price, token}: productProps): Promise<Response | any> {

    // Validate form fields
    const validatedFields = CreateProductFormSchema.safeParse({
        name: name,
        description: description
    })
    
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dish`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            category_id,
            description,
            in_Stock,
            name,
            nutrition_info,
            preparation_time,
            price
        }),
    });

    if (!res.ok) {
        const text = await res.json()
        console.log(text);
        void Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: text.detail,
        })
        return res;
    }

    if (res.ok) {
        void Toast.fire({
            icon: 'success',
            title: 'Producto creado con éxito'
        })
    }

    return res;
}