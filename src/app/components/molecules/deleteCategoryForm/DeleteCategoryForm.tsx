import SubmitFormButton from '../../atoms/submitFormButton/SubmitFormButton';
import { deleteCategory } from '@/services/categories/deleteCategory.service';
import styles from './DeleteCategoryForm.module.scss';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type deleteCategoryFormProps = {
    setDeleteCategoryIsOpen: (val: boolean) => void,
    categorySelected: any,
}

const DeleteCategoryForm = ({ setDeleteCategoryIsOpen, categorySelected }: deleteCategoryFormProps) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const { data: session, status, update } = useSession();

    const token = session?.token;

    useEffect(() => {
        if (categorySelected) {
            setName(categorySelected.name || '');
            setDescription(categorySelected.description || '');
        }
    }, [categorySelected]);

    const handleDeleteCategorySubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const res = await deleteCategory({ id: categorySelected.id, token });
            if (res.ok) {
                setName('');
                setDescription('');
                setDeleteCategoryIsOpen(false);
                update();
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleDeleteCategorySubmit}>
            <p>¿Estás seguro de que quieres eliminar la categoría <strong>{name}</strong>?</p>
            <SubmitFormButton text='Eliminar Categoría' />
        </form>
    )
}

export default DeleteCategoryForm;
