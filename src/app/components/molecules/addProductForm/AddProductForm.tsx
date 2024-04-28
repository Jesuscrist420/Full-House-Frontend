import React, { useState } from 'react';
import styles from './AddProductForm.module.scss';
import Swal from 'sweetalert2';
import FormLabel from '../../atoms/formLabel/FormLabel';
import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
// import { addProduct, updateProduct } from '@/services/product.service';

type productFormProps = {
    setProductSummaryIsOpen?: (val: boolean) => void,
    setProductEditIsOpen?: (val: boolean) => void,
    setAddProductIsOpen?: (val: boolean) => void,
    categoriesList: any,
    isEdit?: boolean,
    productSelected?: any
}

const ProductForm = ({ categoriesList, setAddProductIsOpen, setProductSummaryIsOpen, setProductEditIsOpen, isEdit = false, productSelected }: productFormProps) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productStock, setProductStock] = useState(0);
    const [categoryName, setCategoryName] = useState('');

    const handleAddProductSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        // const res = await addProduct(productName, productDescription, productStock, productPrice, categoryName);
        let data;

        if (/* res.status !== 500 */ false) {
            // data = await res.json()
            if (/* !res.ok */ false) {
                void Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error[0]
                })
            }
        } else {
            data = {
                error: 'Product Already Exists'
            }
            if (/* !res.ok */ false) {
                void Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            }
        }

        if (/*(res).ok*/ true) {
            void Toast.fire({
                icon: 'success',
                title: 'Product created successfully'
            })
            setProductName('');
            setProductDescription('');
            setProductPrice(0);
            setProductStock(0);
            setCategoryName('');
            if (setAddProductIsOpen !== undefined) {
                setAddProductIsOpen(false);
            }
        }
    };

    const handleUpdateProductSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        // const res = await updateProduct(productSelected?.id ?? '', productName, productDescription, productStock, productPicture, productPrice, categoryName);
        let data;

        if (/* res.status !== 500 */ false) {
            //data = await res.json()
            if (/* !res.ok */ false) {
                void Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error[0]
                })
            }
        } else {
            data = {
                error: 'Something went wrong'
            }
            if (/* !res.ok */ false) {
                void Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.error
                })
            }
        }

        if (/* (res).ok */ true) {
            void Toast.fire({
                icon: 'success',
                title: 'Product updated successfully'
            })
            setProductName('');
            setProductDescription('');
            setProductPrice(0);
            setProductStock(0);
            setCategoryName('');
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
            <FormLabel text='Nombre del plato' required/>
            <input
                onChange={(e) => { setProductName(e.target.value) }}
                value={productName}
                className={styles.newInput}
                placeholder={productSelected?.name !== undefined ? productSelected?.name : 'Name of your product'}
                required
            />
            <FormLabel text='Precio' required/>
            <input
                onChange={(e) => { setProductPrice(parseInt(e.target.value)) }}
                value={productPrice} 
                className={styles.newInput} 
                type='number' 
                placeholder={productSelected?.price !== undefined ? productSelected?.price : '0'}
                required
            />
            <FormLabel text='Cantidad' required/>
            <input
                onChange={(e) => { setProductStock(parseInt(e.target.value)) }} 
                value={productStock}
                className={styles.newInput}
                type='number' 
                placeholder={productSelected?.stock !== undefined ? productSelected?.stock : '0'}
                required
            />
            <FormLabel text='Categoría' required/>
            <select value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} className={styles.selectCategory}>
                <option key={0}></option>
                {categoriesList?.map((category: { id: string, name: string }) =>
                    <option key={category.id}>{category.name}</option>
                )}
            </select>
            <FormLabel text='Descripción' required/>
            <textarea
                onChange={(e) => { setProductDescription(e.target.value) }}
                value={productDescription}
                className={styles.newTextArea}
                placeholder={productSelected?.description !== undefined ? productSelected?.description : 'Describe tu plato, ingredientes, etc.'}
                required
            />
            <SubmitFormButton text={isEdit ? 'Guardar Cambios' : 'Crear Producto'} />
            {isEdit && <button className={styles.goBackButton} onClick={handleGoBack}>Go back</button>}
        </form>
    )
}

export default ProductForm;