'use client'

import { useState } from "react";
import FormLabel from "../../atoms/formLabel/FormLabel";
import SubmitFormButton from "../../atoms/submitFormButton/SubmitFormButton";
import styles from './AddEmployeeForm.module.scss';
import Swal from "sweetalert2";

type addEmployeeFormProps = {
    setAddEmployeeIsOpen: (val: boolean) => void,
    employeesList: {}[],
}

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

const AddEmployeeForm = ({ setAddEmployeeIsOpen, employeesList }: addEmployeeFormProps) => {

    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [employeeRole, setEmployeeRole] = useState('');

    const handleAddEmployeeSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        // const res = await addEmployee(employeeName);
        employeesList.push(
            {
                name: employeeName,
                email: employeeEmail,
                password: employeePassword,
                role: employeeRole,
                userId: "653c0608195e0930f96230f7",
                createdAt: "2023-11-26T18:49:41.082Z",
                updatedAt: "2023-11-26T18:49:41.082Z"
            },
        )
        let data;

        if ( /* res.status !== 500 */ true) {
            // data = await res.json()
            if ( /* !res.ok */ false) {
                void Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error[0]
                })
            }
        } else {
            data = {
                error: 'Category Already Exists'
            }
            if (/* !res.ok */ false) {
                void Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            }
        }

        if (/* (res).ok */ true) {
            void Toast.fire({
                icon: 'success',
                title: 'Category created successfully'
            })
            setEmployeeName('');
            setEmployeeEmail('');
            setEmployeePassword('');
            setEmployeeRole('');
            setAddEmployeeIsOpen(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleAddEmployeeSubmit} >
            <FormLabel text='Nombre' required />
            <input
                onChange={(e) => { setEmployeeName(e.target.value); }}
                className={styles.newInput}
                value={employeeName}
                type='text'
                placeholder='Nombre del nuevo empleado'
                required
            />
            <FormLabel text='Email' required />
            <input
                onChange={(e) => { setEmployeeEmail(e.target.value); }}
                className={styles.newInput}
                value={employeeEmail}
                type='email'
                placeholder='Email del nuevo empleado'
                required
            />
            <FormLabel text='Password' required />
            <input
                onChange={(e) => { setEmployeePassword(e.target.value); }}
                className={styles.newInput}
                value={employeePassword}
                type='password'
                placeholder='Contraseña'
                required
            />
            <FormLabel text='Cargo' required />
            <select
                onChange={(e) => { setEmployeeRole(e.target.value); }}
                className={styles.selectRole}
                value={employeeRole}
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