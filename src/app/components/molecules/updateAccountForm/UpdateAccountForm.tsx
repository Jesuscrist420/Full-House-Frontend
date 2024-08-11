import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { Account, updateAccount } from '@/services/accounts/getAccounts.service';
import FormLabel from '../../atoms/formLabel/FormLabel';
import formStyles from './UpdateAccountForm.module.scss';
import styles from '../../organisms/tablesAccordion/TablesAccordion.module.scss';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getTables } from '@/services/getTables.service';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import AddDishForm from './AddDishForm';
import UpdateDishForm from './UpdateDishForm';
import DeleteDishForm from './DeleteDishForm';

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
    const token = session?.token as string;

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

    // State to track which dish form is currently open
    const [openForm, setOpenForm] = useState<'add' | 'update' | 'delete' | null>(null);
    const [selectedDishId, setSelectedDishId] = useState<number | null>(null);
    const [selectedDishQuantity, setSelectedDishQuantity] = useState<number>(1);

    const toggleForm = (formType: 'add' | 'update' | 'delete') => {
        if (openForm === formType) {
            setOpenForm(null); // Close the form if it's already open
        } else {
            setOpenForm(formType); // Open the selected form
        }
    };

    const handleUpdateDish = (dishId: number, quantity: number) => {
        setSelectedDishId(dishId);
        setSelectedDishQuantity(quantity);
        toggleForm('update');
    };

    const handleDeleteDish = (dishId: number) => {
        setSelectedDishId(dishId);
        toggleForm('delete');
    };

    return (
        <>
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
            <br />
            <p className={styles.buttonGroupLabel}>Acciones para Platos:</p>
            <div className={styles.buttonsContainer}>
                <button className={styles.addButton} onClick={() => toggleForm('add')}>
                    <FaPlus />Agregar
                </button>
                <button className={styles.editButton} onClick={() => handleUpdateDish(selectedDishId || 0, selectedDishQuantity)}>
                    <FaPencilAlt />Editar
                </button>
                <button className={styles.deleteButton} onClick={() => handleDeleteDish(selectedDishId || 0)}>
                    <MdClose /> Eliminar
                </button>
            </div >
            {openForm === 'add' && (
                <AddDishForm accountId={accountSelected?.id || 0} setIsOpen={() => setOpenForm(null)} token={token} />
            )}
            {openForm === 'update' && (
                <UpdateDishForm accountId={accountSelected?.id || 0} dishId={selectedDishId || 0} initialQuantity={selectedDishQuantity} setIsOpen={() => setOpenForm(null)} token={token} />
            )}
            {openForm === 'delete' && (
                <DeleteDishForm accountId={accountSelected?.id || 0} setIsOpen={() => setOpenForm(null)} token={token} />
            )}
        </>
    );
}

export default UpdateAccountForm;
