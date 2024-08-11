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

type employeeProps = {
    name: string,
    email: string,
    password: string,
    role: string,
    token: string | unknown,
}

export const CreateEmployeeFormSchema = z.object({
    name: z.string().min(1).max(24, { message: 'Máximo 24 Cáracteres!' }),
    email: z.string().email({ message: 'Email inválido' }).trim(),
    password: z
        .string()
        .min(6, { message: 'Al menos 6 carácteres!' })
        .regex(/[a-zA-Z]/, { message: 'Debe contener al menos una letra!' })
        .regex(/[0-9]/, { message: 'Debe contener al menos un número!' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Debe contener un carácter Especial!',
        })
        .trim(),
})

export async function createEmployee({ name, email, password, role, token }: employeeProps): Promise<Response | any> {

    // Validate form fields
    const validatedFields = CreateEmployeeFormSchema.safeParse({
        name: name,
        email: email,
        password: password,
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            email,
            password,
            position: role
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
            title: 'Empleado creado con éxito'
        })
    }

    return res;
}