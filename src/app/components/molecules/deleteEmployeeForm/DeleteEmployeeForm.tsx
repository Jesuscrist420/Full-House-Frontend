import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styles from './DeleteEmployeeForm.module.scss';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { deleteEmployee } from '@/services/employees/deleteEmployee.service';

type deleteEmployeeFormProps = {
    setEmployeeDeleteIsOpen: (val: boolean) => void,
    employeeSelected: any,
}

const DeleteEmployeeForm = ({ setEmployeeDeleteIsOpen, employeeSelected }: deleteEmployeeFormProps) => {

    const { data: session, status, update } = useSession();
    const token = session?.token;

    const handleDeleteEmployeeSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await deleteEmployee({ id: employeeSelected.user_id, token });
            if (res.ok) {
                setEmployeeDeleteIsOpen(false);
                update();
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleDeleteEmployeeSubmit}>
            <p>¿Estás seguro de que quieres eliminar el {employeeSelected.position} <strong>{employeeSelected.name}</strong>?</p>
            <SubmitFormButton text='Eliminar Empleado' />
        </form>
    )
}

export default DeleteEmployeeForm;
