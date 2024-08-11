import React, { useState } from 'react';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './UpdateAccountForm.module.scss';
import { addDish } from '@/services/accounts/getAccounts.service';

type AddDishFormProps = {
    accountId: number;
    setIsOpen: (val: boolean) => void;
    token: string;
};

const AddDishForm = ({ accountId, setIsOpen, token }: AddDishFormProps) => {
    const [dishId, setDishId] = useState<number | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [errors, setErrors] = useState<string[]>([]);

    const handleAddDishSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (dishId === undefined || quantity <= 0) {
            setErrors(['Invalid dish or quantity']);
            return;
        }

        try {
            const res = await addDish(token, accountId, dishId, quantity);
            if (res) {
                setIsOpen(false);
                setErrors([]);
            } else {
                setErrors(['Failed to add dish']);
            }
        } catch (e) {
            console.error(e);
            setErrors(['Error adding dish']);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleAddDishSubmit}>
            <FormLabel text="ID Plato" required />
            <input
                onChange={(e) => setDishId(parseInt(e.target.value))}
                className={styles.newInput}
                type="number"
                placeholder="id plato"
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
            <SubmitFormButton text="Agregar Plato" />
        </form>
    );
};

export default AddDishForm;
