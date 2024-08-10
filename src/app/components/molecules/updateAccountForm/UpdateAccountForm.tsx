import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { Account, updateAccount } from '@/services/accounts/getAccounts.service';
import FormLabel from '../../atoms/formLabel/FormLabel';
import formStyles from './AddCategoryForm.module.scss';
import styles from '../../organisms/tablesAccordion/CategoriesAccordion.module.scss';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getTables } from '@/services/getTables.service';
import { FaPencilAlt } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

type UpdateAccountFormProps = {
    setUpdateAccountIsOpen: (val: boolean) => void,
    accountSelected: Account | null,
    setAccounts: (val: Account[]) => void,
    accounts: Account[],
}

const UpdateAccountForm = ({ setUpdateAccountIsOpen, accountSelected, setAccounts, accounts }: UpdateAccountFormProps) => {

    const [comment, setComment] = useState('');
    const [tableId, setTableId] = useState(0);
    const [total, setTotal] = useState(0);
    const [errorsComment, setErrorsComment] = useState<string[]>([]);
    const [errorsTotal, setErrorsTotal] = useState<string[]>([]);
    const [tables, setTables] = useState<{ id: string, name: string }[]>([]);

    const { data: session, status, update } = useSession();
    const token = session?.token;

    useEffect(() => {
        if (accountSelected) {
            setComment(accountSelected.comment || '');
            setTableId(accountSelected.table_id || 0);
            setTotal(accountSelected.total || 0);
        }
    }, [accountSelected]);

    useEffect(() => {
        // Fetch tables when component mounts
        const fetchTables = async () => {
            if (token) {
                const tablesList = await getTables(token);
                setTables(tablesList || []);
            }
        };
        fetchTables();
    }, [token]);

    const handleUpdateAccountSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            if (!accountSelected) return;

            const updatedAccount = {
                id: accountSelected.id,
                comment,
                table_id: tableId,
                total,
            };

            const res = await updateAccount(token, updatedAccount);

            if (res) {
                const updatedAccounts = accounts.map(acc => acc.id === res.id ? res : acc);
                setAccounts(updatedAccounts);
                setComment('');
                setTableId(0);
                setTotal(0);
                setUpdateAccountIsOpen(false);
                setErrorsComment([]);
                setErrorsTotal([]);
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
            console.error(e);
        }
    };

    return (
        <>
            <p className={styles.buttonGroupLabel}>Acciones para Platos:</p>
            <div className={styles.buttonsContainer}>
                <button className={styles.addButton} >
                    <FaPencilAlt />Agregar
                </button>
                <button className={styles.editButton} >
                    <FaPencilAlt />Editar
                </button>
                <button className={styles.deleteButton} >
                    <MdClose /> Eliminar
                </button>
            </div >
            <form className={formStyles.form} onSubmit={handleUpdateAccountSubmit}>
                <FormLabel text='Comentario' required />
                <input
                    onChange={(e) => { setComment(e.target.value); setErrorsComment([]); }}
                    className={formStyles.newInput}
                    value={comment}
                    type='text'
                    placeholder='Comentario'
                    required
                />
                {errorsComment.map((errorComment, index) => (
                    <p key={index} className={formStyles.error}>{errorComment}</p>
                ))}
                <FormLabel text='ID de la mesa' required />
                <select
                    onChange={(e) => setTableId(parseInt(e.target.value))}
                    className={formStyles.newInput}
                    value={tableId}
                    required
                >
                    <option value={0} disabled>Seleccione una mesa</option>
                    {tables.map((table) => (
                        <option key={table.id} value={table.id}>
                            {table.name}
                        </option>
                    ))}
                </select>
                <FormLabel text='Total' required />
                <input
                    onChange={(e) => { setTotal(parseFloat(e.target.value)); setErrorsTotal([]); }}
                    className={formStyles.newInput}
                    value={total}
                    type='number'
                    placeholder='Total'
                    required
                />
                {errorsTotal.map((errorTotal, index) => (
                    <p key={index} className={formStyles.error}>{errorTotal}</p>
                ))}
                <SubmitFormButton text='Actualizar Cuenta' />
            </form>
        </>
    );
}

export default UpdateAccountForm;
