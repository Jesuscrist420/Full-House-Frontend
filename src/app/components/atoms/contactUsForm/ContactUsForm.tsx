'use client'
import { useState } from "react";
import styles from "./ContactUsForm.module.scss";
import Swal from "sweetalert2";

const ContactUsForm = () => {
    
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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "1a9474fa-5bf2-4fb9-b5f1-802f8f53840f");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: json
        });
        const result = await response.json();
        
        if (result.success) {
            setName('');
            setEmail('');
            setMessage('');
            void Toast.fire({
                icon: 'success',
                title: 'Correo Enviado'
            })
            console.log(result);
        }
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <input 
                required
                className={styles.input}
                type='text'
                name='name'
                value={name}
                placeholder='¿Cuál es tu nombre?'
                onChange={(e) => { setName(e.target.value); }}
            />
            <input 
                required
                className={styles.input}
                type='email'
                name='email'
                value={email}
                placeholder='¿Cuál es tu correo?'
                onChange={(e) => { setEmail(e.target.value); }}
            />
            <textarea 
                required
                className={styles.input}
                name='message'
                value={message}
                placeholder='Déjanos saber tu mensaje'
                onChange={(e) => { setMessage(e.target.value); }}
            />
            <button className={styles.submitButton} type="submit">Enviar</button>
        </form>
    )
}

export default ContactUsForm;