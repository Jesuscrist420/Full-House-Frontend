import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styles from './AddCategoryForm.module.scss';
import FormLabel from '../../atoms/formLabel/FormLabel';
import { updateTable } from '@/services/tables/updateTable.service';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';

type updateTableFormProps = {
    setUpdateTableIsOpen: (val: boolean) => void,
    tableSelected: any,
}

const UpdateTableForm = ({ setUpdateTableIsOpen, tableSelected }: updateTableFormProps) => {

    const [name, setName] = useState('');
    const [available, setAvailable] = useState(true);
    const [location, setLocation] = useState('');
    const [seats, setSeats] = useState(0);
    const [errorsName, setErrorsName] = useState([]);
    const [errorsDescription, setErrorsDescription] = useState([]);

    const { data: session, status, update } = useSession();

    const token = session?.token;

    useEffect(() => {
        if (tableSelected) {
            setName(tableSelected.name || '');
            setAvailable(tableSelected.available || true);
            setLocation(tableSelected.location || '');
            setSeats(tableSelected.seats || 0);
        }
    }, [tableSelected]);

    const handleUpdateTableSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await updateTable({ id: tableSelected.id, name, available, location, seats, token });
            if (res.ok) {
                setName('');
                setAvailable(true);
                setLocation('');
                setSeats(0);
                setUpdateTableIsOpen(false);
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
    };

    return (
        <form className={styles.form} onSubmit={handleUpdateTableSubmit} >
            <FormLabel text='Nombre de la mesa' required />
            <input
                onChange={(e) => { setName(e.target.value); setErrorsName([]); }}
                className={styles.newInput}
                value={name}
                type='text'
                placeholder='Nombre de la mesa'
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

            <SubmitFormButton text='Actualizar Mesa' />
        </form>
    )
}

export default UpdateTableForm;
