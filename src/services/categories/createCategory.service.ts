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

type categoryProps = {
    name: string,
    description: string,
    token: string | unknown,
}

export const CreateCategoryFormSchema = z.object({
    name: z.string().min(1).max(14, {message: 'Máximo 14 Cáracteres'}),
    description: z.string(),
  })

export async function createCategory({name, description, token}: categoryProps): Promise<Response | any> {

    // Validate form fields
    const validatedFields = CreateCategoryFormSchema.safeParse({
        name: name,
        description: description
    })
    
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            description,
        }),
    });

    if (!res.ok) {
        void Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal'
        })
        return res;
    }

    if (res.ok) {
        void Toast.fire({
            icon: 'success',
            title: 'Categoría creada con éxito'
        })
    }

    return res;
}