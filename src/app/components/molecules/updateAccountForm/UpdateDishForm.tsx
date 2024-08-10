import React, { useState } from 'react';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './AddCategoryForm.module.scss';
import { updateDish } from '@/services/accounts/getAccounts.service';

type UpdateDishFormProps = {
    accountId: number;
    dishId: number;
    initialQuantity: number;
    setIsOpen: (val: boolean) => void;
    token: string;
};

const UpdateDishForm = ({ accountId, dishId, initialQuantity, setIsOpen, token }: UpdateDishFormProps) => {
    const [newDishId, setNewDishId] = useState<number>(dishId);
    const [quantity, setQuantity] = useState<number>(initialQuantity);
    const [errors, setErrors] = useState<string[]>([]);

    const handleUpdateDishSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (quantity <= 0) {
            setErrors(['Invalid quantity']);
            return;
        }

        try {
            const res = await updateDish(token, accountId, newDishId, quantity);
            if (res) {
                setIsOpen(false);
                setErrors([]);
            } else {
                setErrors(['Failed to update dish']);
            }
        } catch (e) {
            console.error(e);
            setErrors(['Error updating dish']);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleUpdateDishSubmit}>
            <FormLabel text="ID del Plato" required />
            <input
                onChange={(e) => setNewDishId(parseInt(e.target.value))}
                className={styles.newInput}
                type="number"
                value={newDishId}
                placeholder="ID del Plato"
                required
            />
            <FormLabel text="Cantidad" required />
            <input
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className={styles.newInput}
                type="number"
                value={quantity}
                placeholder="Cantidad"
                required
            />
            {errors.map((error, index) => (
                <p key={index} className={styles.error}>{error}</p>
            ))}
            <SubmitFormButton text="Actualizar Plato" />
        </form>
    );
};

export default UpdateDishForm;
