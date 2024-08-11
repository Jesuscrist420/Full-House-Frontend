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

type EmployeeProps = {
    id: string,
    name: string,
    email: string,
    role: string,
    token: string | unknown,
}

export const UpdateEmployeeFormSchema = z.object({
    name: z.string().min(1).max(24, { message: 'Máximo 24 Cáracteres!' }),
    email: z.string().email({ message: 'Email inválido' }).trim(),
});

export async function updateEmployee({ id, name, email, role, token }: EmployeeProps): Promise<Response | any> {

    // Validate form fields
    const validatedFields = UpdateEmployeeFormSchema.safeParse({
        name: name,
        email: email,
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            email,
            position: role
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
            title: 'Empleado actualizado con éxito'
        });
    }

    return res;
}
