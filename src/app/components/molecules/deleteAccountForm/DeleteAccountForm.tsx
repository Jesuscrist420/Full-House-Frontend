import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { deleteAccount, closeAccount, Account } from '@/services/accounts/getAccounts.service';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './AddCategoryForm.module.scss';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';


type DeleteAccountFormProps = {
    setDeleteAccountIsOpen: (val: boolean) => void,
    accountSelected: Account | null,
}

const DeleteAccountForm = ({ setDeleteAccountIsOpen, accountSelected }: DeleteAccountFormProps) => {

    const [comment, setComment] = useState('');
    const [tableId, setTableId] = useState(0);
    const [total, setTotal] = useState(0);

    const { data: session, status, update } = useSession();

    const token = session?.token;

    useEffect(() => {
        if (accountSelected) {
            setComment(accountSelected.comment || '');
            setTableId(accountSelected.table_id || 0);
            setTotal(accountSelected.total || 0);
        }
    }, [accountSelected]);

    const handleDeleteAccountSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            if (!accountSelected) {
                return;
            }
            const res = await deleteAccount(token, accountSelected);
            if (res) {
                setComment('');
                setTableId(0);
                setTotal(0);
                setDeleteAccountIsOpen(false);
                update();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal',
                });
            }
        } catch (e) {
            console.log(e);
        }
    };
    const handleCloseAccountSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            if (!accountSelected) {
                return;
            }
            const res = await closeAccount(token, accountSelected);
            if (res) {
                setComment('');
                setTableId(0);
                setTotal(0);
                setDeleteAccountIsOpen(false);
                update();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal',
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <form className={styles.form} onSubmit={handleCloseAccountSubmit}>
                <p>¿Estás seguro de que quieres cerrar la cuenta con el comentario <strong>{comment}</strong>, para la mesa con ID <strong>{tableId}</strong>, y un total de <strong>{total}</strong>?</p>
                <SubmitFormButton text='Cerrar Cuenta' />
            </form>
            <hr className="p-2  "/>
            <form className={styles.form} onSubmit={handleDeleteAccountSubmit}>
                <p>¿Estás seguro de que quieres eliminar la cuenta con el comentario <strong>{comment}</strong>, para la mesa con ID <strong>{tableId}</strong>, y un total de <strong>{total}</strong>?</p>
                <SubmitFormButton text='Eliminar Cuenta' />

            </form>
        </>
    )
}

export default DeleteAccountForm;
