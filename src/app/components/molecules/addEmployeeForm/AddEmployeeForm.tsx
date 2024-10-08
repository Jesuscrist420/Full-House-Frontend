'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import styles from './AddEmployeeForm.module.scss';
import FormLabel from "../../atoms/formLabel/FormLabel";
import { createEmployee } from "@/services/employees/createEmployee.service";
import SubmitFormButton from "../../atoms/submitFormButton/SubmitFormButton";

type addEmployeeFormProps = {
    setAddEmployeeIsOpen: (val: boolean) => void,
}

const AddEmployeeForm = ({ setAddEmployeeIsOpen }: addEmployeeFormProps) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [errorsName, setErrorsName] = useState([]);
    const [errorsEmail, setErrorsEmail] = useState([]);
    const [errorsPassword, setErrorsPassword] = useState([]);

    const { data: session, status, update } = useSession();
    const token = session?.token;

    const handleAddEmployeeSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try{
            const res = await createEmployee({
                name,
                email,
                password,
                role,
                token
            });

            if(res.ok){
                setName('');
                setEmail('');
                setPassword('');
                setRole('');
                setAddEmployeeIsOpen(false);
            }else{
                if (res.errors) {
                    if (res.errors.name) {
                        setErrorsName(res.errors.name);
                    }
                    if (res.errors.email) {
                        setErrorsEmail(res.errors.email);
                    }
                    if (res.errors.password) {
                        setErrorsPassword(res.errors.password);
                    }
                }
            }
        }catch (e){
            console.log(e)
        }
    };

    return (
        <form className={styles.form} onSubmit={handleAddEmployeeSubmit} autoComplete="off" >
            <FormLabel text='Nombre' required />
            <input
                onChange={(e) => { setName(e.target.value); setErrorsName([]) }}
                className={styles.newInput}
                value={name}
                type='text'
                placeholder='Nombre del nuevo empleado'
                required
            />
            {errorsName?.map((errorName) => {
                return (
                    <p key={errorName} className={styles.error}>{errorName}</p>
                )
            })}

            <FormLabel text='Email' required />
            <input
                onChange={(e) => { setEmail(e.target.value); setErrorsEmail([]) }}
                className={styles.newInput}
                value={email}
                type='email'
                placeholder='Email del nuevo empleado'
                autoComplete="off"
                required
            />
            {errorsEmail?.map((errorEmail) => {
                    return (
                        <p key={errorEmail} className={styles.error}>{errorEmail}</p>
                    )
            })}

            <FormLabel text='Password' required />
            <input
                onChange={(e) => { setPassword(e.target.value); setErrorsPassword([]) }}
                className={styles.newInput}
                value={password}
                type='password'
                placeholder='Contraseña'
                autoComplete="new-password"
                required
            />
            {errorsPassword?.map((errorPass) => {
                    return (
                        <p key={errorPass} className={styles.error}>{errorPass}</p>
                    )
            })}
            
            <FormLabel text='Cargo' required />
            <select
                onChange={(e) => { setRole(e.target.value); }}
                className={styles.selectRole}
                value={role}
                name="role"
                required
            >
                <option value="">Selecciona el rol</option>
                <option value="Administrador">Administrador</option>
                <option value="Mesero">Mesero</option>
                <option value="Cocinero">Cocinero</option>
            </select>
            <SubmitFormButton text='Crear Empleado' />
        </form>
    )
}

export default AddEmployeeForm;