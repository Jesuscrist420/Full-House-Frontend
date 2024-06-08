// next JS form example Darkmode
// server side rendering

import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export default function Page() {
    const create = async (formData: FormData) => {
        'use server';
        console.log(formData);
        redirect('/dashboard');
    };
    return <form action={create} className="text-black">
        <input type="text" name="name" className=" text-black"/>
        <input type="password" name="password" />
        <button type="submit" className=" bg-blue-500 text-white">Submit</button>
    </form>

}