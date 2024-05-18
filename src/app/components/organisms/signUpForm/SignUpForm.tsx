'use client'

import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './SignUpForm.module.scss';
import { registerUser } from '@/services/register.service';
import FullHouseLogo from '../../atoms/logo/fullHouseLogo';
import styles2 from '@/app/authentication/authentication.module.scss';

const SignUpForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errorsEmail, setErrorsEmail] = useState([]);
    const [errorsPass, setErrorsPass] = useState([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await registerUser(email, password, role);
            console.log('Res: ', res);
            if (res.ok) {
                setEmail('');
                setPassword('');
                setRole('');
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
            <form className={styles.signUpForm} action="#" onSubmit={handleSubmit}>
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
                <select
                    id="roleInputSignUpForm"
                    name="role"
                    className={styles.signUpFormInput}
                    value={role}
                    required
                    onChange={(e) => { setRole(e.target.value); }}
                >
                    <option value="">Selecciona el rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Mesero">Mesero</option>
                    <option value="Cocinero">Cocinero</option>
                </select>
                <button className={styles.signUpFormButton}>¡Comenzar!</button>
            </form>
        </div>
    )
}

export default SignUpForm;