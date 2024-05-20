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

type restaurantProps = {
    name: string,
    address: string,
    phoneNumber: string,
    token: string | unknown,
}

export const CreateRestaurantFormSchema = z.object({
    name: z.string().min(1).max(18, {message: 'Máximo 18 Cáracteres'}),
    address: z.string(),
    phoneNumber: z.string().min(7, { message: 'Mínimo 7 Dígitos' }).max(10, {message: 'Máximo 10 Dígitos'})
  })

export async function createRestaurant({name, address, phoneNumber, token}: restaurantProps): Promise<Response | any> {

    // Validate form fields
    const validatedFields = CreateRestaurantFormSchema.safeParse({
        name: name,
        address: address,
        phoneNumber: phoneNumber
    })
    
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            address,
            phoneNumber
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
            title: 'Restaurante creado con éxito'
        })
    }

    return res;
}