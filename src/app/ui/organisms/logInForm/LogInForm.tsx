'use client'
import React , {useState} from 'react';
import styles from './LogInForm.module.scss';
import styles2 from '@/app/authentication/authentication.module.scss';
//import { loginUser } from '@/services/login.service'
import Swal from 'sweetalert2';
import FullHouseLogo from '../../atoms/logo/fullHouseLogo';
import classNames from 'classnames';

export default function LogInForm(): JSX.Element{

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

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        //const res = await loginUser(email , password);
        /* if ((res).ok){
            void Toast.fire({
                icon:'success',
                title: 'Signed in successfully'
            })
        } */
    }

    const formStyles = classNames(styles.formContainer, styles2.signInContainer);

    return(
        <div className={formStyles}>
            <form className={styles.logInForm} action="#" onSubmit={handleSubmit}>
                <FullHouseLogo />
                <h1 className={styles.logInFormTitle}>Iniciar Sesión</h1>
                <input 
                    id="emailInputSignInForm" 
                    className={styles.logInFormInput} 
                    type="email" placeholder="Email" 
                    value={email} 
                    onChange={(e) => {setEmail(e.target.value)}} 
                />
                <input 
                    id="passwordInputSignInForm" 
                    className={styles.logInFormInput} 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => { setPassword(e.target.value); }} 
                />
                <button type='submit' className={styles.logInFormButton}>Ingresar</button>
                <span className={styles.logInFormSpan}><a style={{fontSize:'12px', color: '#00a4fc'}} href="#">Olvidaste tu contraseña?</a></span>
            </form>
        </div>
    )
}