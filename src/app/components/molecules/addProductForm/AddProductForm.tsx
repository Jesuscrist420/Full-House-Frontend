import React, { useState } from 'react';
import styles from './AddProductForm.module.scss';
import Swal from 'sweetalert2';
import FormLabel from '../../atoms/formLabel/FormLabel';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { createProduct } from '@/services/products/createProduct.service';
import { useSession } from 'next-auth/react';

type productFormProps = {
    setProductSummaryIsOpen?: (val: boolean) => void,
    setProductEditIsOpen?: (val: boolean) => void,
    setAddProductIsOpen?: (val: boolean) => void,
    categoriesList: any,
    isEdit?: boolean,
    productSelected?: any
}

const ProductForm = ({ categoriesList, setAddProductIsOpen, setProductSummaryIsOpen, setProductEditIsOpen, isEdit = false, productSelected }: productFormProps) => {

    const [categoryId, setCategoryId] = useState(0);
    const [description, setDescription] = useState('');
    const [inStock, setInStock] = useState(false);
    const [name, setName] = useState('');
    const [nutritionInfo, setNutritionInfo] = useState('');
    const [preparationTime, setPreparationTime] = useState(0);
    const [price, setPrice] = useState(0);
    const [errorsName, setErrorsName] = useState([]);

    const { data: session, status, update } = useSession();
    const token = session?.token;

    const handleAddProductSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await createProduct({ 
                category_id: categoryId,
                description, 
                in_Stock: inStock, 
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

    const handleUpdateProductSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        // const res = await updateProduct(productSelected?.id ?? '', productName, productDescription, productStock, productPicture, productPrice, categoryName);
        let data;

        if (/* (res).ok */ true) {
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
            if (setProductSummaryIsOpen !== undefined) {
                setProductSummaryIsOpen(false);
            }
            if (setProductEditIsOpen !== undefined) {
                setProductEditIsOpen(false);
            }
        }
    };

    const handleGoBack = (): void => {
        if (setProductSummaryIsOpen !== undefined) {
            setProductSummaryIsOpen(true);
        }
        if (setProductEditIsOpen !== undefined) {
            setProductEditIsOpen(false);
        }
    }

    return (

        <form className={styles.form} onSubmit={isEdit ? (e) => { void handleUpdateProductSubmit(e) } : handleAddProductSubmit}>

            <FormLabel text='Nombre del plato' required />
            <input
                onChange={(e) => { setName(e.target.value) }}
                value={name}
                className={styles.newInput}
                placeholder={productSelected?.name !== undefined ? productSelected?.name : 'Nombre del producto'}
                required
            />

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
                    className={styles.newCheckbox}
                    type='checkbox'
                    required
                />
            </div>

            <FormLabel text='Tiempo de preparación (Hrs)' required />
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
            <SubmitFormButton text={isEdit ? 'Guardar Cambios' : 'Crear Producto'} />
            {isEdit && <button className={styles.goBackButton} onClick={handleGoBack}>Go back</button>}
        </form>
    )
}

export default ProductForm;