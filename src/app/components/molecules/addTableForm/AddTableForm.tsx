import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { createTable } from '@/services/createTable.service';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './AddCategoryForm.module.scss';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';

type addTableFormProps = {
    setAddTableIsOpen: (val: boolean) => void,
    isEdit?: boolean,
    tableSelected?: any,
}

const AddTableForm = ({ setAddTableIsOpen, isEdit = false, tableSelected }: addTableFormProps) => {

    const [name, setName] = useState('');
    const [available, setAvailable] = useState(true);
    const [location, setLocation] = useState('');
    const [seats, setSeats] = useState(0);
    const [errorsName, setErrorsName] = useState([]);
    const [errorsDescription, setErrorsDescription] = useState([]);

    const { data: session, status, update } = useSession();

    const token = session?.token;

    const handleAddTableSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await createTable({ name, available, location, seats, token });
            if (res.ok) {
                setName('');
                setAvailable(true);
                setLocation('');
                setSeats(0);
                setAddTableIsOpen(false);
                setErrorsName([]);
                setErrorsDescription([]);
                update();
            } else {
                if (res.errors) {
                    if (res.errors.name) {
                        setErrorsName(res.errors.name);
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
        let data;
    };

    return (
        <form className={styles.form} onSubmit={handleAddTableSubmit} >
            <FormLabel text='Nombre de la mesa' required />
            <input
                onChange={(e) => { setName(e.target.value); setErrorsName([]); }}
                className={styles.newInput}
                value={name}
                type='text'
                placeholder='Nombre de la nueva mesa'
                required
            />
            {errorsName?.map((errorName) => {
                return (
                    <p key={errorName} className={styles.error}>{errorName}</p>
                )
            })}
            <FormLabel text='Ubicación' required />
            <input
                onChange={(e) => { setLocation(e.target.value); setErrorsDescription([]); }}
                className={styles.newInput}
                value={location}
                type='text'
                placeholder='Ubicación de la mesa'
                required
            />
            {errorsDescription?.map((errorDescription) => {
                return (
                    <p key={errorDescription} className={styles.error}>{errorDescription}</p>
                )
            })}
            <FormLabel text='Número de asientos' required />
            <input
                onChange={(e) => { setSeats(parseInt(e.target.value)); setErrorsDescription([]); }}
                className={styles.newInput}
                value={seats}
                type='number'
                placeholder='Número de asientos de la mesa'
                required
            />
            {errorsDescription?.map((errorDescription) => {
                return (
                    <p key={errorDescription} className={styles.error}>{errorDescription}</p>
                )
            })}

            <SubmitFormButton text='Crear Mesa' />
        </form>
    )
}

export default AddTableForm;