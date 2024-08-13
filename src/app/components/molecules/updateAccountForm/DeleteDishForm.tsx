import React, { useState, useEffect } from 'react';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './UpdateAccountForm.module.scss';
import { Account, deleteDish, getAccount } from '@/services/accounts/getAccounts.service';

type DeleteDishFormProps = {
    accountId: number;
    setIsOpen: (val: boolean) => void;
    token: string;
    fetchAccountDishes: () => void;
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

const DeleteDishForm = ({ accountId, setIsOpen, token, fetchAccountDishes }: DeleteDishFormProps) => {
    const [dishId, setDishId] = useState<number | undefined>();
    const [errors, setErrors] = useState<string[]>([]);
    const [dishes, setDishes] = useState<DishWithQuantity[]>([]);

    useEffect(() => {
        // Fetch dishes for the account when the component mounts
        const fetchAccountDishes = async () => {
            if (token) {
                const accountData: ApiResponse = await getAccount(token, accountId);
                setDishes(accountData.dishes || []);
            }
        };

        fetchAccountDishes();
    }, [token, accountId]);

    const handleDeleteDishSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (dishId === undefined) {
            setErrors(['Debes seleccionar un plato para eliminar']);
            return;
        }

        try {
            const res = await deleteDish(token, accountId, dishId);
            if (res) {
                await fetchAccountDishes();
                setIsOpen(false);
                setErrors([]);
            } else {
                setErrors(['No se pudo eliminar el plato']);
            }
        } catch (e) {
            console.error(e);
            setErrors(['Error al eliminar el plato']);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleDeleteDishSubmit}>
            <FormLabel text="Seleccionar Plato" required />
            <select
                onChange={(e) => setDishId(parseInt(e.target.value))}
                className={styles.newInput}
                value={dishId}
                required
            >
                <option value={0} disabled>Selecciona un plato</option>
                {dishes.map((dishWithQuantity) => (
                    <option key={dishWithQuantity.dish.id} value={dishWithQuantity.dish.id}>
                        {dishWithQuantity.dish.name}
                    </option>
                ))}
            </select>
            {errors.map((error, index) => (
                <p key={index} className={styles.error}>{error}</p>
            ))}
            <SubmitFormButton text="Borrar Plato" />
        </form>
    );
};

export default DeleteDishForm;
