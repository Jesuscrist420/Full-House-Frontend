import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { deleteCategory } from '@/services/categories/deleteCategory.service';
import styles from './DeleteProductForm.module.scss';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { deleteProduct } from '@/services/products/deleteProduct.service';

type deleteProductFormProps = {
    setDeleteProductIsOpen: (val: boolean) => void,
    productSelected: any,
}

const DeleteProductForm = ({ setDeleteProductIsOpen, productSelected }: deleteProductFormProps) => {

    const [name, setName] = useState('');

    const { data: session, status, update } = useSession();
    const token = session?.token;

    useEffect(() => {
        if (productSelected) {
            setName(productSelected.name || '');
        }
    }, [productSelected]);

    const handleDeleteProductSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await deleteProduct({ id: productSelected.id, token });
            if (res.ok) {
                setName('');
                setDeleteProductIsOpen(false);
                update();
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleDeleteProductSubmit}>
            <p>¿Estás seguro de que quieres eliminar el producto <strong>{name}</strong>?</p>
            <SubmitFormButton text='Eliminar Producto' />
        </form>
    )
}

export default DeleteProductForm;
