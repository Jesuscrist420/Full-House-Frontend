import React, { useState, useEffect } from 'react';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './UpdateAccountForm.module.scss';
import { Account, getAccount, updateDish } from '@/services/accounts/getAccounts.service';

type UpdateDishFormProps = {
    accountId: number;
    dishId: number;
    initialQuantity: number;
    setIsOpen: (val: boolean) => void;
    token: string;
};

interface Dish {
    category_id: number;
    description: string;
    id: number;
    in_stock: boolean;
    name: string;
    nutrition_info: string;
    preparation_time: number;
    price: number;
    restaurant_id: number;
}

interface DishWithQuantity {
    dish: Dish;
    quantity: number;
}

interface ApiResponse {
    account: Account;
    dishes: DishWithQuantity[];
}

const UpdateDishForm = ({ accountId, dishId, initialQuantity, setIsOpen, token }: UpdateDishFormProps) => {
    const [newDishId, setNewDishId] = useState<number>(dishId);
    const [quantity, setQuantity] = useState<number>(initialQuantity);
    const [errors, setErrors] = useState<string[]>([]);
    const [dishes, setDishes] = useState<DishWithQuantity[]>([]);

    useEffect(() => {
        // Fetch existing dishes for the account
        const fetchAccountDishes = async () => {
            if (token) {
                const accountData: ApiResponse = await getAccount(token, accountId);
                setDishes(accountData.dishes || []);
            }
        };

        fetchAccountDishes();
    }, [token, accountId
    ]);

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
            <FormLabel text="Select Dish" required />
            <select
                onChange={(e) => setNewDishId(parseInt(e.target.value))}
                className={styles.newInput}
                value={newDishId}
                required
            >
                <option value={0} disabled>Select a dish</option>
                {dishes.map((dishWithQuantity) => (
                    <option key={dishWithQuantity.dish.id} value={dishWithQuantity.dish.id}>
                        {dishWithQuantity.dish.name}
                    </option>
                ))}
            </select>
            <FormLabel text="Quantity" required />
            <input
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className={styles.newInput}
                type="number"
                value={quantity}
                placeholder="Quantity"
                required
            />
            {errors.map((error, index) => (
                <p key={index} className={styles.error}>{error}</p>
            ))}
            <SubmitFormButton text="Update Dish" />
        </form>
    );
};

export default UpdateDishForm;
