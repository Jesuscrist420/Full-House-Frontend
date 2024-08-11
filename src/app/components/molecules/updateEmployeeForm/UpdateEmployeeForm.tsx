import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styles from './UpdateEmployeeForm.module.scss';
import FormLabel from '../../atoms/formLabel/FormLabel';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { updateEmployee } from '@/services/employees/updateEmployee.service';

type employeeFormProps = {
    employeeSelected?: any,
    setEditEmployeeIsOpen?: (val: boolean) => void,
}

const UpdateEmployeeForm = ({ employeeSelected, setEditEmployeeIsOpen }: employeeFormProps) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const [errorsName, setErrorsName] = useState([]);
    const [errorsEmail, setErrorsEmail] = useState([]);

    const { data: session, status, update } = useSession();
    const token = session?.token;

    useEffect(() => {
        if (employeeSelected) {
            setName(employeeSelected.name || '');
            setEmail(employeeSelected.email || '');
            setRole(employeeSelected.position || '');

            setErrorsName([]);
            setErrorsEmail([]);
        }
    }, [employeeSelected]);

    const handleUpdateEmployeeSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await updateEmployee({
                id: employeeSelected.user_id,
                name,
                email,
                role,
                token
            });

            if (res.ok) {
                setName('');
                setEmail('');
                setRole('');
                setErrorsName([]);
                setErrorsEmail([]);

                if (setEditEmployeeIsOpen !== undefined) {
                    setEditEmployeeIsOpen(false);
                }
            } else {
                if (res.errors) {
                    if (res.errors.name) {
                        setErrorsName(res.errors.name);
                    }
                    if (res.errors.email) {
                        setErrorsEmail(res.errors.email);
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }

    };

    return (

        <form className={styles.form} onSubmit={handleUpdateEmployeeSubmit}>

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
            <SubmitFormButton text={'Guardar Cambios'} />
        </form>
    )
}

export default UpdateEmployeeForm;