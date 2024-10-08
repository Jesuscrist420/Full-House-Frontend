import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styles from './AddCategoryForm.module.scss';
import { deleteTable } from '@/services/tables/deleteTable.service';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';

type deleteTableFormProps = {
    setDeleteTableIsOpen: (val: boolean) => void,
    tableSelected: any,
}

const DeleteTableForm = ({ setDeleteTableIsOpen, tableSelected }: deleteTableFormProps) => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [seats, setSeats] = useState(0);

    const { data: session, status, update } = useSession();

    const token = session?.token;

    useEffect(() => {
        if (tableSelected) {
            setName(tableSelected.name || '');
            setLocation(tableSelected.location || '');
            setSeats(tableSelected.seats || 0);
        }
    }, [tableSelected]);

    const handleDeleteTableSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await deleteTable({ id: tableSelected.id, token });
            if (res.ok) {
                setName('');
                setLocation('');
                setSeats(0);
                setDeleteTableIsOpen(false);
                update();
            } else {
                const text = await res.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: text.detail,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleDeleteTableSubmit}>
            <p>¿Estás seguro de que quieres eliminar la mesa <strong>{name}</strong> ubicada en <strong>{location}</strong> con <strong>{seats}</strong> asientos?</p>
            <SubmitFormButton text='Eliminar Mesa' />
        </form>
    )
}

export default DeleteTableForm;
