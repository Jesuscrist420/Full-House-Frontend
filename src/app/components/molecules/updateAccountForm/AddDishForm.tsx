import React, { use, useEffect, useState } from 'react';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import FormLabel from '../../atoms/formLabel/FormLabel';
import styles from './UpdateAccountForm.module.scss';
import { addDish, getAccount } from '@/services/accounts/getAccounts.service';
import { getProducts } from '@/services/products/getProducts.service';

type AddDishFormProps = {
    accountId: number;
    setIsOpen: (val: boolean) => void;
    token: string;
};

const AddDishForm = ({ accountId, setIsOpen, token }: AddDishFormProps) => {
    const [dishId, setDishId] = useState<number | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [errors, setErrors] = useState<string[]>([]);
    const [products, setProducts] = useState<{
        id: number,
        category_id: number,
        description: string,
        in_stock: boolean,
        name: string,
        preparation_time: number,
        price: number
    }[]>([]);

    useEffect(() => {
        // Fetch products when component mounts
        const fetchProducts = async () => {
            if (token) {
                const productsList = await getProducts(token);
                setProducts(productsList || []);
            }
        };

        fetchProducts();
    }, [token]);
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
            <select
                onChange={(e) => setDishId(parseInt(e.target.value))}
                className={styles.newInput}
                value={dishId}
                required
            >
                <option value={0} disabled>Seleccione un plato</option>
                {products.map((product) => (
                    <option key={product.id} value={product.id}>
                        {product.name}
                    </option>
                ))}
            </select>
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
