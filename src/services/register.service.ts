import Swal from 'sweetalert2'
import { signIn } from "next-auth/react";
import { FormState, SignupFormSchema } from '@/app/lib/definitions';

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

export async function registerUser(email: string, password: string, role: string): Promise<Response | any> {

    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        email: email,
        password: password,
    })
    
    console.log('Validated Fields: ',validatedFields);
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            role
        }),
    });

    if (!res.ok) {
        void Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong'
        })
        return res;
    }

    if (res.ok) {
        void Toast.fire({
            icon: 'success',
            title: 'User created successfully'
        })
    }

    return res;
}