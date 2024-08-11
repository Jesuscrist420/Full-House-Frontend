import React, { useState } from 'react';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './UpdateAccountForm.module.scss';
import { deleteDish } from '@/services/accounts/getAccounts.service';

type DeleteDishFormProps = {
    accountId: number;
    setIsOpen: (val: boolean) => void;
    token: string;
};

const DeleteDishForm = ({ accountId, setIsOpen, token }: DeleteDishFormProps) => {
    const [dishId, setDishId] = useState<number | undefined>();
    const [errors, setErrors] = useState<string[]>([]);

    const handleDeleteDishSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (dishId === undefined) {
            setErrors(['Dish ID is required']);
            return;
        }

        try {
            const res = await deleteDish(token, accountId, dishId);
            if (res) {
                setIsOpen(false);
                setErrors([]);
            } else {
                setErrors(['Failed to delete dish']);
            }
        } catch (e) {
            console.error(e);
            setErrors(['Error deleting dish']);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleDeleteDishSubmit}>
            <FormLabel text="ID del Plato" required />
            <input
                onChange={(e) => setDishId(parseInt(e.target.value))}
                className={styles.newInput}
                type="number"
                placeholder="ID del Plato"
                required
            />
            {errors.map((error, index) => (
                <p key={index} className={styles.error}>{error}</p>
            ))}
            <SubmitFormButton text="Borrar Plato" />
        </form>
    );
};

export default DeleteDishForm;
