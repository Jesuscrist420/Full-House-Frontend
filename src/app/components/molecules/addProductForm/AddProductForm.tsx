import React, { useState } from 'react';
import styles from './AddProductForm.module.scss';
import FormLabel from '../../atoms/formLabel/FormLabel';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { createProduct } from '@/services/products/createProduct.service';
import { useSession } from 'next-auth/react';

type productFormProps = {
    setAddProductIsOpen?: (val: boolean) => void,
    categoriesList: any,
    isEdit?: boolean,
    productSelected?: any
}

const ProductForm = ({ categoriesList, setAddProductIsOpen, productSelected }: productFormProps) => {

    const [categoryId, setCategoryId] = useState(0);
    const [description, setDescription] = useState('');
    const [inStock, setInStock] = useState(true);
    const [name, setName] = useState('');
    const [nutritionInfo, setNutritionInfo] = useState('');
    const [preparationTime, setPreparationTime] = useState(0);
    const [price, setPrice] = useState(0);
    const [errorsName, setErrorsName] = useState([]);

    const { data: session, status, update } = useSession();
    const token = session?.token;

    let currency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    
    const handleAddProductSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await createProduct({ 
                category_id: categoryId,
                description, 
                in_stock: inStock, 
                name, 
                nutrition_info: nutritionInfo, 
                preparation_time: preparationTime, 
                price, 
                token 
            });
            if (res.ok) {
                setCategoryId(0);
                setDescription('');
                setInStock(false);
                setName('');
                setNutritionInfo('');
                setPreparationTime(0);
                setPrice(0);
                if (setAddProductIsOpen !== undefined) {
                    setAddProductIsOpen(false);
                }
            } else {
                if (res.errors) {
                    if (res.errors.name) {
                        setErrorsName(res.errors.name);
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (

        <form className={styles.form} onSubmit={handleAddProductSubmit}>

            <FormLabel text='Nombre del plato' required />
            <input
                onChange={(e) => { setName(e.target.value) }}
                value={name}
                className={styles.newInput}
                placeholder={productSelected?.name !== undefined ? productSelected?.name : 'Nombre del producto'}
                required
            />
            {errorsName?.map((errorName) => {
                return (
                    <p key={errorName} className={styles.error}>{errorName}</p>
                )
            })}

            <FormLabel text='Descripción' required />
            <textarea
                onChange={(e) => { setDescription(e.target.value) }}
                value={description}
                className={styles.newTextArea}
                placeholder={productSelected?.description !== undefined ? productSelected?.description : 'Describe tu plato, ingredientes, etc.'}
                required
            />

            <div className='mt-4'>
                <FormLabel text='En stock' required />
                <input
                    onChange={(e) => { setInStock(!inStock) }}
                    value={1}
                    checked={inStock}
                    className={styles.newCheckbox}
                    type='checkbox'
                />
            </div>

            <FormLabel text='Tiempo de preparación (Min)' required />
            <input
                onChange={(e) => { setPreparationTime(parseInt(e.target.value)) }}
                value={preparationTime}
                className={styles.newInput}
                type='number'
                placeholder={productSelected?.preparationTime !== undefined ? productSelected?.preparationTime : '0'}
                required
            />

            <FormLabel text='Precio' required />
            <input
                onChange={(e) => { setPrice(parseInt(e.target.value)) }}
                value={price}
                className={styles.newInput}
                type='number'
                placeholder={productSelected?.price !== undefined ? productSelected?.price : '0'}
                required
            />

            <FormLabel text='Categoría' required />
            <select value={categoryId} onChange={(e) => { setCategoryId(parseInt(e.target.value)) }} className={styles.selectCategory}>
                <option key={0}></option>
                {categoriesList?.map((category: { id: string, name: string }) =>
                    <option key={category.id} value={category.id}>{category.name}</option>
                )}
            </select>
            <SubmitFormButton text={'Crear Producto'} />
        </form>
    )
}

export default ProductForm;