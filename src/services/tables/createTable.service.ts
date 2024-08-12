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
/*
{
  "available": true,
  "location": "Window",
  "name": "Table 1",
  "seats": 4
}
*/
type TableProps = {
    available: boolean,
    location: string,
    name: string,
    seats: number,
    token: string | unknown,
}

export const CreateTableFormSchema = z.object({
    name: z.string().min(1).max(14, {message: 'Máximo 14 Cáracteres'}),
    available: z.boolean(),
    location: z.string().min(1).max(14, {message: 'Máximo 14 Cáracteres'}),
    seats: z.number().int().positive(),
    
  })

export async function createTable({name, available, location, seats ,token}: TableProps): Promise<Response | any> {

    // Validate form fields
    const validatedFields = CreateTableFormSchema.safeParse({
        name: name,
        available: available,
        location: location,
        seats: seats,
    })
    
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tables`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            available,
            location,
            seats
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
            title: 'Mesa creada con éxito'
        })
    }

    return res;
}