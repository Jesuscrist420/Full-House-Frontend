import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { Account, addAccount } from '@/services/accounts/getAccounts.service';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './AddCategoryForm.module.scss';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { set } from 'zod';


type AddAccountFormProps = {
    setAddAccountIsOpen: (val: boolean) => void,
    accounts: Account[],
    setAccounts: (val: Account[]) => void
}

const AddAccountForm = ({ setAddAccountIsOpen,accounts, setAccounts  }: AddAccountFormProps) => {

    const [comment, setComment] = useState('');
    const [tableId, setTableId] = useState(0);
    const [total, setTotal] = useState(0);
    const [errorsComment, setErrorsComment] = useState([]);
    const [errorsTotal, setErrorsTotal] = useState([]);

    const { data: session, status, update } = useSession();

    const token = session?.token;

    const handleAddAccountSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await addAccount(token, { comment, table_id: tableId, total });
            if (res) {
                setComment('');
                setTableId(0);
                setTotal(0);
                setAddAccountIsOpen(false);
                setErrorsComment([]);
                setErrorsTotal([]);
                setAccounts([...accounts, res]);
                update();
            } else {
                if (res.errors) {
                    if (res.errors.comment) {
                        setErrorsComment(res.errors.comment);
                    }
                    if (res.errors.total) {
                        setErrorsTotal(res.errors.total);
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleAddAccountSubmit}>
            <FormLabel text='Comentario' required />
            <input
                onChange={(e) => { setComment(e.target.value); setErrorsComment([]); }}
                className={styles.newInput}
                value={comment}
                type='text'
                placeholder='Comentario'
                required
            />
            {errorsComment?.map((errorComment) => (
                <p key={errorComment} className={styles.error}>{errorComment}</p>
            ))}
            <FormLabel text='ID de la mesa' required />
            <input
                onChange={(e) => { setTableId(parseInt(e.target.value)); }}
                className={styles.newInput}
                value={tableId}
                type='number'
                placeholder='ID de la mesa'
                required
            />
            <FormLabel text='Total' required />
            <input
                onChange={(e) => { setTotal(parseFloat(e.target.value)); setErrorsTotal([]); }}
                className={styles.newInput}
                value={total}
                type='number'
                placeholder='Total'
                required
            />
            {errorsTotal?.map((errorTotal) => (
                <p key={errorTotal} className={styles.error}>{errorTotal}</p>
            ))}
            <SubmitFormButton text='Crear Cuenta' />
        </form>
    )
}

export default AddAccountForm;
