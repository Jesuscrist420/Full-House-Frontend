'use client'

import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './SignUpForm.module.scss';
import { registerUser } from '@/services/authentication/register.service';
import FullHouseLogo from '../../atoms/logo/fullHouseLogo';
import styles2 from '@/app/authentication/authentication.module.scss';

const SignUpForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorsEmail, setErrorsEmail] = useState([]);
    const [errorsPass, setErrorsPass] = useState([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await registerUser(email, password);
            console.log('Res: ', res);
            if (res.ok) {
                setEmail('');
                setPassword('');
                setErrorsEmail([]);
                setErrorsPass([]);
            } else {
                if (res.errors) {
                    if (res.errors.email) {
                        setErrorsEmail(res.errors.email);
                    } else if (res.errors.password){
                        setErrorsPass(res.errors.password);
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const formStyles = classNames(styles.formContainer, styles2.signUpContainer);

    return (
        <div className={formStyles}>
            <form id='registerForm' className={styles.signUpForm} action="#" onSubmit={handleSubmit}>
                <FullHouseLogo />
                <h1 className={styles.signUpFormTitle}>Create Account</h1>
                <input
                    id="emailInputSignUpForm"
                    className={styles.signUpFormInput}
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => { setEmail(e.target.value); setErrorsEmail([]) }}
                />
                {errorsEmail?.map((errorEmail) => {
                    return (
                        <p key={errorEmail} className={styles.error}>{errorEmail}</p>
                    )
                })}
                <input
                    id="passwordInputSignUpForm"
                    className={styles.signUpFormInput}
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => { setPassword(e.target.value); setErrorsPass([]) }}
                />
                {errorsPass?.map((errorPass) => {
                    return (
                        <p key={errorPass} className={styles.error}>{errorPass}</p>
                    )
                })}
                <button className={styles.signUpFormButton}>¡Comenzar!</button>
            </form>
        </div>
    )
}

export default SignUpForm;