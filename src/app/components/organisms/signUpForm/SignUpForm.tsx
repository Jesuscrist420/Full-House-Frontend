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
    const [error, setError] = useState([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try{
            const res = await registerUser(email, password, role);
        if (res.ok) {
            setEmail('');
            setPassword('');
            setRole('');
            setError([]);
        }else{
            if(res.errors){
                setError(res.errors.password);
            }
        }
        }catch(err){
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
                    onChange={(e) => { setEmail(e.target.value); }}
                />
                <input
                    id="passwordInputSignUpForm"
                    className={styles.signUpFormInput}
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => { setPassword(e.target.value); setError([]) }}
                />
                {error?.map( (error) => {
                    return(
                        <p key={error} className={styles.error}>{error}</p>
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