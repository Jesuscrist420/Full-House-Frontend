import { User } from '@/app/lib/definitions'
import { signIn } from 'next-auth/react'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export async function loginUser(email: string, password: string): Promise<Response | undefined> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const object = await res.json();

    if(object.token){
        if(object?.user){
            await signIn('credentials', {email, password});
        }
        void Toast.fire({
            icon:'success',
            title: 'Signed in successfully'
        })
        return object.user;
    }else{
        void Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Email or Password!'
        })
    }
    return undefined;
}
