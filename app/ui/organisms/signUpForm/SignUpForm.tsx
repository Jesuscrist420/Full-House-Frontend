'use client'
import React, { useState } from 'react';
import styles from './SignUpForm.module.scss';
import styles2 from '@/app/authentication/authentication.module.scss';
//import { registerUser } from '@/services/register.service';
import Swal from 'sweetalert2';
import FullHouseLogo from '../../atoms/logo/fullHouseLogo';
import classNames from 'classnames';

 const SignUpForm = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        //const res = await registerUser(username, email, password);

        /* if ((res).ok) {
            void Toast.fire({
                icon: 'success',
                title: 'User created successfully'
            })
        } */
    };

    const formStyles = classNames(styles.formContainer, styles2.signUpContainer);

    return (
        <div className={formStyles}>
            <form className={styles.signUpForm} action="#" onSubmit={handleSubmit}>
                <FullHouseLogo />
                <h1 className={styles.signUpFormTitle}>Create Account</h1>
                <input 
                    id="usernameInputSignUpForm" 
                    className={styles.signUpFormInput} 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => { setUsername(e.target.value); }} 
                />
                <input 
                    id="emailInputSignUpForm" 
                    className={styles.signUpFormInput} 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => { setEmail(e.target.value); }} 
                />
                <input 
                    id="passwordInputSignUpForm" 
                    className={styles.signUpFormInput} 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => { setPassword(e.target.value); }} 
                />
                <button className={styles.signUpFormButton}>¡Comenzar!</button>
            </form>
        </div>
    )
}

export default SignUpForm;